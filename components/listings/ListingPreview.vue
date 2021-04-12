<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      :src="
        image
          ? `data:image/png;base64,${image}`
          : 'https://dummyimage.com/300x200/999999/ffffff.png&text=Listing+Has+No+Images'
      "
    ></v-img>

    <v-card-title
      >{{ home.street }}<br />
      {{ home.city }}, {{ home.state }} {{ home.zipcode }}</v-card-title
    >

    <v-card-text>
      <v-row class="mx-0"> </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">{{ home.agent.name }}</div>
        <div class="black--text ml-4" size="14">
          {{ home.agent.agency.name }}
        </div>
      </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">${{ fmt(home.price) }}</div>
        <div class="black--text ml-4" size="14">
          Sqft: {{ fmt(home.sqfootage) }}
        </div>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn v-if="$auth.loggedin" class="ma-2" color="primary" dark>
        Favorite
        <v-icon dark right> mdi-star </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark :to="mlsn">
        More Details
        <v-icon dark right> mdi-information </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { HomeWithImage } from '~/api/api'

export default defineComponent({
  name: 'ListingPreview',
  props: {
    home: {
      type: Object as PropType<HomeWithImage>,
      required: true,
    },
  },
  setup(props) {
    const { $auth } = useContext()
    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)
    const image = props.home.files[0]?.contents
    const mlsn = '/listings/' + props.home.mlsn

    return {
      $auth,
      fmt,
      image,
      mlsn,
    }
  },
})
</script>
