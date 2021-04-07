<template>
  <v-container justify-center fluid>
    <v-row justify="space-around" fluid>
      <v-col cols="5" align-self="center"
        ><v-img
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <v-btn class="ma-2" color="primary" dark>
          Schedule Showing
          <v-icon dark right> mdi-calendar</v-icon>
        </v-btn>
        <v-btn class="ma-2 tertiary--text" color="primary" dark>
          Edit Images
        </v-btn>
      </v-col>

      <v-col cols="5" align-center justify-center>
        <v-card>
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HouseImages',
  components: {},
  setup() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
})
</script>
