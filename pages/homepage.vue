<template>
  <v-container fluid class="fill-height justify-center align-content-center">
    <div>
      <v-container justify-center fluid>
        <h1 class="pt-5 text-center primary--text">
          Need help in the housing market?
        </h1>
        <h2 class="pb-5 text-center primary--text">
          We're (not) an error free service!
        </h2>

        <v-row justify="space-around">
          <v-col cols="12" md="3" xs="1">
            <HomeCard
              text="Find your place with us!"
              button="Buy A Home"
              send="/listings"
            />
          </v-col>
          <v-col cols="12" md="3" xs="1">
            <HomeCard
              text="Let us help you sell!"
              button="Sell A Home"
              send="/AgentDetailedListing"
            />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="1">
            <Login />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts">
import HomeCard from '@/components/homepage/HomeCard.vue'
import Login from '@/components/homepage/Login.vue'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: { HomeCard, Login },
  setup() {},
})
</script>
