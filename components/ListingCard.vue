<template>
  <div id="app">
    <v-app id="listingCard">
      <v-card
        class="rounded-xl"
        max-width="400"
        outlined
        elevation="2"
        height="375"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>

        <v-card-subtitle class="pb-0">
          Realtor Agency - Realtor
        </v-card-subtitle>

        <v-card-title class="pb-0"> $##,### </v-card-title>

        <v-card-text class="text--primary">
          <div># bed, # bath, #, ### sqft</div>

          <div>#### Name Rd, City, State, Zip</div>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<style>
.rounded-card {
  border-radius: 24px;
}
</style>
