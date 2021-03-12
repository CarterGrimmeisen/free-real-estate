<template>
  <div id="app">
    <v-app id="LoginCard">
      <v-layout no-gutter align-self-center>
        <v-btn
          class="tertiary--text"
          color="secondary"
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
              <v-btn class="white--text" color="teal" @click="overlay = false">
                Login
              </v-btn>
            </v-col>

            <v-col>
              <v-btn class="ma-1" color="grey" plain>
                Don't have an account? Sign up!
              </v-btn>
            </v-col>

            <v-col>
              <v-btn class="ma-1" color="grey" plain>
                Register an agency!
              </v-btn>
            </v-col>
          </v-card>
        </v-overlay>
      </v-layout>
    </v-app>
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
