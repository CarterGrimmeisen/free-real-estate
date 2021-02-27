<template>
  <div id="app">
    <v-app id="listingCard">
      <v-card
        class="rounded-xl"
        max-width="400"
        outlined
        elevation="2"
        height="550"
      >
        <v-img
          class="white--text align-end"
          height="275px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>

        <v-card-actions class="justify-center">
          <v-card-title> {{ text }} </v-card-title>
        </v-card-actions>

        <v-card-actions class="justify-center">
          <v-btn
            class="white--text"
            color="teal"
            :to="send"
            @click="overlay = false"
          >
            {{ button }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  props: ['text', 'button', 'send'],
}
</script>

<style>
.rounded-card {
  border-radius: 24px;
}
</style>
