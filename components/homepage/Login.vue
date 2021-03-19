<template>
  <div id="app">
    <v-btn
      class="tertiary--text"
      color="primary"
      lsrge
      @click="overlay = !overlay"
    >
      Login
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
        <v-col>
          <v-text-field
            label="Username"
            placeholder="Username"
            solo
          ></v-text-field>

          <v-text-field
            label="Password"
            placeholder="Password"
            solo
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn
            class="tertiary--text"
            color="primary"
            @click="overlay = false"
          >
            Login
          </v-btn>
        </v-col>

        <v-col>
          <v-btn class="ma-1" color="tertiary" plain>
            Don't have an account? Sign up!
          </v-btn>
        </v-col>

        <v-col>
          <v-btn class="ma-1" color="tertiary" plain>
            Register an agency!
          </v-btn>
        </v-col>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    zIndex: 0,
  }),
  methods: {
    onClickOutside() {
      this.overlay = false
    },
  },
}
</script>
