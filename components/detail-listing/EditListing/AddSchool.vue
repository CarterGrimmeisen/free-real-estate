<template>
  <div id="app">
    <v-btn class="ma-2" color="primary" @click="overlay = !overlay">
      Add School
    </v-btn>

    <v-overlay :z-index="zIndex" :value="overlay">
      <v-card
        :max-width="500"
        :max-height="800"
        class="rounded-xl"
        outlined
        elevation="2"
        width="500"
      >
        <v-card-title> Select the school type and enter the name </v-card-title>

        <v-radio-group row>
          <v-radio label="Elementary School" value="ELEMENTARY"></v-radio>
          <v-radio label="Middle School" value="MIDDLE"></v-radio>
          <v-radio label="High School" value="HIGH"></v-radio>
        </v-radio-group>

        <v-card-title>
          <v-text-field
            label="School name"
            hint="The name of the school"
            outlined
          >
          </v-text-field
        ></v-card-title>

        <v-btn class="ma-2" color="primary" @click="overlay = !overlay">
          Add School
        </v-btn>
      </v-card>
    </v-overlay>
  </div>
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
