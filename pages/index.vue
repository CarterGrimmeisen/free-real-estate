<template>
  <div class="container">
    <div>
      <h1 class="title">free-real-estate</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          <v-btn raised> Documentation </v-btn>
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          <v-btn raised> GitHub </v-btn>
        </a>
        <v-btn raised @click="$toast('hello world')"> Do Something </v-btn>
      </div>
      <div>
        <pre>
          {{ data }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return { data: { working: true } }
  },
})
</script>
