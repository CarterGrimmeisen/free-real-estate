<template>
  <v-container fluid class="fill-height justify-center align-content-center">
    <div>
      <v-container justify-center fluid>
        <v-alert dense outlined type="error">
          Sorry, we ran into an error.
        </v-alert>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
