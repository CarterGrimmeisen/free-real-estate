<template>
  <div class="home">
    <h1 class="pt-5 text-center tertiary--text">
      Need help in the housing market?
    </h1>
    <h2 class="pb-5 text-center tertiary--text">
      We're (not) an error free service!
    </h2>

    <v-container justify-center>
      <v-row justify="space-around">
        <v-col cols="12" md="3" xs="1">
          <HomeCard
            text="Find your place with us!"
            button="Buy A Home"
            send="/"
          />
        </v-col>
        <v-col cols="12" md="3" xs="1">
          <HomeCard
            text="Let us help you sell!"
            button="Sell A Home"
            send="/"
          />
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-flex class="py-15">
          <Login />
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {}
</script>
