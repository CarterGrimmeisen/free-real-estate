<template>
  <v-container fluid>
    <v-row v-if="files && files.length" wrap>
      <v-col cols="12" md="6" lg="4">
        <v-img
          v-if="files[0]"
          :src="files[0].contents"
          height="500px"
          :aspect-ratio="4 / 3"
        />
      </v-col>

      <v-col v-if="files.slice(1).length" cols="12" md="6" lg="8">
        <v-carousel>
          <v-carousel-item
            v-for="file in files.slice(1)"
            :key="file.id"
            style="max-height: 500px"
            :src="file.contents"
          />
        </v-carousel>
      </v-col>
      <v-col v-else cols="12" md="6" lg="8">
        <v-sheet color="grey" height="500" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">No Additional Images</div>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-sheet color="grey" dark height="500" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">No Images</div>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useHomes, useData } from '@/hooks/api'

export default defineComponent({
  name: 'HouseImages',
  components: {},
  props: {
    mlsn: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { getHomeFiles } = useHomes()
    const files = useData(getHomeFiles, { mlsn: props.mlsn }, { type: 'IMAGE' })

    return {
      files,
    }
  },
})
</script>
