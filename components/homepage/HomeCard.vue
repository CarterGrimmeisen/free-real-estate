<template>
  <v-card
    class="cardBorder"
    rounded="xl"
    max-width="400"
    max-height="550"
    color="white"
    outlined
  >
    <v-img
      max-height="275px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>

    <v-card-actions class="justify-center">
      <v-card-title class="primary--text"> {{ text }} </v-card-title>
    </v-card-actions>

    <v-card-actions class="justify-center">
      <v-btn
        class="tertiary--text"
        color="primary"
        :to="send"
        @click="overlay = false"
      >
        {{ button }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['text', 'button', 'send'],
}
</script>

<style scoped>
.cardBorder {
  border-color: var(--v-primary-base) !important;
  border-width: 3px !important;
  border-style: solid !important;
}
</style>
