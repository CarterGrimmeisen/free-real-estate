<template>
  <div class="container">
    <v-main>
      <v-layout>
        <v-col>
          <HomeCard
            text="Find your place with us!"
            button="Buy A Home"
            send="/"
          />
        </v-col>
        <v-col>
          <HomeCard
            text="Let us help you sell!"
            button="Sell A Home"
            send="/"
          />
        </v-col>
        <Login />
      </v-layout>
    </v-main>
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
