<template>
  <div id="app">
    <v-btn class="ma-2" color="primary" @click="overlay = !overlay">
      Delete Listing
      <v-icon dark right> mdi-delete </v-icon>
    </v-btn>

    <v-overlay :z-index="zIndex" :value="overlay">
      <v-card
        v-click-outside="onClickOutside"
        :max-width="500"
        :max-height="800"
        class="rounded-xl"
        outlined
        elevation="2"
        width="500"
      >
        <v-row>
          <v-col>
            <v-card-title>
              Are you sure you want to delete this listing?
            </v-card-title>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn class="ma-1" color="tertiary" plain>
              Yes, delete this listing
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="ma-1" color="tertiary" plain>
              No, keep this listing
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    zIndex: 3,
  }),
  methods: {
    onClickOutside() {
      this.overlay = false
    },
  },
}
</script>
