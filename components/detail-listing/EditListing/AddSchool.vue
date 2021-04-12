<template>
  <v-dialog
    :z-index="zIndex"
    :value="overlay"
    width="500"
    content-class="rounded-xl"
  >
    <template #activator="{ on }">
      <v-btn class="ma-2" color="primary" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        Add School
      </v-btn>
    </template>

    <v-card class="rounded-xl" outlined elevation="2" width="500">
      <v-card-title> Select the school type and enter the name </v-card-title>

      <v-card-title>
        <v-text-field
          label="School name"
          hint="The name of the school"
          outlined
        >
        </v-text-field>
      </v-card-title>

      <v-btn class="ma-2" color="primary" @click="overlay = !overlay">
        Add School
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      zIndex: 2,
      overlay: ref(false),
    }
  },
})
</script>
