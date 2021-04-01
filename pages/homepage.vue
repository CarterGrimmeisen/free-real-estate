<template>
  <v-container fluid class="fill-height justify-center align-content-center">
    <div>
      <h1 class="text-center primary--text">
        Need help in the housing market?
      </h1>
      <h2 class="text-center primary--text">
        We're (not) an error free service!
      </h2>
      <br />
      <br />
      <br />
    </div>

    <v-row justify="center">
      <v-col cols="12" lg="2" md="4" xs="1">
        <HomeCard
          text="Find your place with us!"
          button="Buy A Home"
          send="/listings"
        />
      </v-col>
      <v-col cols="12" lg="2" md="4" xs="1" offset-md="1">
        <HomeCard text="Let us help you sell!" button="Sell A Home" send="/" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import HomeCard from '@/components/homepage/HomeCard.vue'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: { HomeCard },
  setup() {},
})
</script>
