<template>
  <v-card
    class="cardBorder"
    rounded="xl"
    max-width="100%"
    max-height="550"
    min-width="320"
    min-height="375"
    color="white"
    outlined
  >
    <v-img height="275px" :src="image" />

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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomeCard',
  props: {
    text: {
      type: String,
      default: '',
    },
    button: {
      type: String,
      default: '',
    },
    send: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped>
.cardBorder {
  border-color: var(--v-primary-base) !important;
  border-width: 3px !important;
  border-style: solid !important;
}
</style>
