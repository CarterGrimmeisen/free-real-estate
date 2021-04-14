<template>
  <v-container justify-center fluid>
    <v-row v-if="files" justify="space-around" fluid>
      <v-col cols="5" align-self="center"
        ><v-img
          v-if="files[0]"
          :src="`data:image/png;base64,${files[0].contents}`"
        ></v-img>
        <!--<v-btn class="ma-2 tertiary--text" color="primary" dark>
          Favorite This Listing
          <v-icon dark right class="tertiary--text"> mdi-heart </v-icon>
        </v-btn>
        <v-btn
          class="ma-2 tertiary--text"
          color="primary"
          dark
          :to="`${mlsn}/showings`"
        >
          Schedule Showing
        </v-btn>
        <v-btn
          class="ma-2 tertiary--text"
          color="primary"
          dark
          :to="`${mlsn}/documents`"
        >
          Generate Documents
        </v-btn>--->
      </v-col>

      <v-col cols="5" align-center justify-center>
        <v-card v-if="files.slice(1).length > 0">
          <v-carousel>
            <v-carousel-item
              v-for="file in files.slice(1)"
              :key="file.id"
              :src="`data:image/png;base64,${file.contents}`"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
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
