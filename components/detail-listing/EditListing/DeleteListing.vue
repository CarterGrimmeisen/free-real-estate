<template>
  <div>
    <v-btn class="ma-2" color="primary" @click="overlay = !overlay">
      Delete Listing
      <v-icon dark right> mdi-delete </v-icon>
    </v-btn>

    <v-dialog
      :z-index="zIndex"
      :value="overlay"
      width="500"
      content-class="rounded-xl"
    >
      <v-card
        max-width="500"
        max-height="800"
        class="rounded-xl"
        outlined
        elevation="2"
        width="500"
      >
        <v-card-title>
          Are you sure you want to delete this listing?
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn class="ma-1" color="primary" @click="confirm">
            Yes, delete this listing
          </v-btn>
          <v-btn class="ma-1" color="primary" @click="overlay = false">
            No, keep this listing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const zIndex = ref(2)
    const overlay = ref(false)
    return {
      zIndex,
      overlay,
      confirm() {
        overlay.value = false
        emit('confirm')
      },
    }
  },
})
</script>
