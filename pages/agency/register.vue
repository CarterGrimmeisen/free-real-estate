<!--RegisterAgency.vue -->
<template>
  <v-card class="mx-auto my-12" max-width="1200" width="1100">
    <v-row>
      <v-spacer> </v-spacer> <v-card-title>Create a New Account</v-card-title
      ><v-spacer> </v-spacer>
    </v-row>
    <v-row>
      <v-card-title>Agency Name:</v-card-title
      ><v-text-field
        color="black"
        hide-details
        v.length="40"
        single-line
        outlined
        placeholder="Name"
        background-color="tertiary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-card-title>Address:</v-card-title
      ><v-text-field
        color="black"
        hide-details
        v.length="40"
        single-line
        outlined
        placeholder="Address"
        background-color="tertiary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-card-title>Email:</v-card-title
      ><v-text-field
        color="black"
        hide-details
        v.length="40"
        single-line
        outlined
        placeholder="myemail@freerealestate"
        background-color="tertiary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-card-title>Phone Number:</v-card-title
      ><v-text-field
        color="black"
        hide-details
        v.length="40"
        single-line
        outlined
        placeholder="(###) ###-###"
        background-color="tertiary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col> <v-divider></v-divider> </v-col>
    </v-row>
    <v-card-title>
      An Agency code will be sent to the email provided. Agents can register
      under your agency with the code.
    </v-card-title>

    <v-row>
      <v-spacer> </v-spacer>
      <v-btn class="ma-2" color="primary" dark to="/homepage">
        Cancel
        <v-icon dark right></v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/homepage">
        Register
        <v-icon dark right> </v-icon>
      </v-btn>
      <v-spacer> </v-spacer>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RegisterAgency',
  setup() {},
})
</script>
