<template>
  <div>
    <v-card-title class="primary--text"> Listing Images </v-card-title>
    <v-row class="px-3">
      <v-col cols="12">
        <client-only>
          <v-file-pond
            ref="pond"
            allow-multiple="true"
            allow-replace="false"
            name="imageUpload"
            item-insert-location="after"
            image-preview-height="200"
            accepted-file-types="image/jpeg, image/png"
            @addfile="addImage"
            @addfiles="addImages"
            @removefile="removeImage"
            @init="initUpload"
          />
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from '@nuxtjs/composition-api'
import type { FilePondFile } from 'filepond'
import type { VueFilePondComponent } from 'vue-filepond'
import compress from 'browser-image-compression'
import { File } from '@prisma/client'
import { CompleteHome } from '~/api/api'

export default defineComponent({
  props: {
    listing: {
      type: Object as PropType<CompleteHome>,
      required: true,
    },
    images: {
      type: Array as PropType<File[]>,
      required: true,
    },
  },
  setup(props, { emit, refs }) {
    const updateImages = async (images: FilePondFile[]) => {
      emit(
        'updateImages',
        await Promise.all(
          images.map(async (each) => ({
            name: each.filenameWithoutExtension,
            mime: each.fileType,
            contents: compress.getDataUrlFromFile(
              await compress(each.file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 500,
                useWebWorker: true,
              })
            ),
            type: 'IMAGE',
          }))
        )
      )
    }

    const initUpload = () => {
      if (props.images) {
        props.images.forEach((each) =>
          (refs.pond as VueFilePondComponent).addFile(each.contents, {
            metadata: {
              id: each.id,
            },
          })
        )
      }
    }

    watch(props, () => {
      const pond = refs.pond as VueFilePondComponent
      if (props.images) {
        pond.getFiles().forEach((each, index) => {
          if (props.images?.[index]?.id)
            each.setMetadata('id', props.images[index].id)
        })
      }
    })

    const addImage = async (_: any, file: FilePondFile) => {
      if (!file.getMetadata('id'))
        emit('addImage', {
          name: file.filenameWithoutExtension,
          mime: file.fileType,
          contents: await compress.getDataUrlFromFile(
            await compress(file.file, {
              maxSizeMB: 2,
              useWebWorker: true,
            })
          ),
          type: 'IMAGE',
        })
    }

    const addImages = async (_: any, files: FilePondFile[]) => {
      for (const file of files) {
        await addImage(null, file)
      }
    }

    const removeImage = (_: any, file: FilePondFile) => {
      const metadata = file.getMetadata('id')
      if (metadata) emit('removeImage', metadata)
      else if (!metadata) {
        emit('removeLocalImage', file.id)
      }
    }

    return {
      initUpload,
      updateImages,
      addImage,
      addImages,
      removeImage,
    }
  },
})
</script>

<style>
.filepond--item {
  max-width: calc(100% / 2 - 0.5em);
}
@media (min-width: 500px) {
  .filepond--item {
    max-width: calc(100% / 3 - 0.5em);
  }
}
@media (min-width: 700px) {
  .filepond--item {
    max-width: calc(100% / 4 - 0.5em);
  }
}
@media (min-width: 900px) {
  .filepond--item {
    max-width: calc(100% / 5 - 0.5em);
  }
}
</style>
