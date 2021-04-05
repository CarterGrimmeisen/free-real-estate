<!--EditAccount.vue-->
<template>
  <v-card class="mx-auto my-12" max-width="1000" width="1000">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row>
      <v-card-title>Username:</v-card-title>
      <v-card-title>
        <v-text-field
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          placeholder="my username"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field></v-card-title
    ></v-row>

    <v-row>
      <v-card-title>Email:</v-card-title>
      <v-card-title
        ><v-text-field
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          placeholder="myemail@freerealestate"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field
      ></v-card-title>
    </v-row>

    <v-row>
      <v-card-title>Phone:</v-card-title>
      <v-card-title>
        <v-text-field
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          placeholder="(###)###-####"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field
      ></v-card-title>
    </v-row>

    <v-row><v-divider class="mx-4"></v-divider></v-row>

    <v-row justify="end">
      <v-card-actions>
        <v-btn class="ma-2" color="primary" dark to="/accountpreview">
          Cancel
          <v-icon dark right></v-icon>
        </v-btn>
        <v-btn class="ma-2" color="primary" dark to="/accountpreview">
          Save
          <v-icon dark right> </v-icon>
        </v-btn> </v-card-actions
    ></v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EditAccount',
  setup() {
    return { data: { working: true } }
  },
})
</script>
