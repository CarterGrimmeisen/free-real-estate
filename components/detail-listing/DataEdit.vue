<!-- Data edit -->
<template>
  <v-card class="mx-auto my-12" max-width="1000" width="1000" height="500">
    <v-card-title>Username:</v-card-title>
    <v-text-field
      color="white"
      hide-details
      v.length="25"
      single-line
      rounded="true"
      value="my username"
      background-color="yellow"
      class="shrink"
      append-icon="mdi-pen"
    ></v-text-field>
    <v-card-title>Email:</v-card-title>
    <v-text-field
      color="white"
      hide-details
      v.length="25"
      single-line
      rounded="true"
      value="myemail@freerealestate"
      background-color="yellow"
      class="shrink"
      append-icon="mdi-pen"
    ></v-text-field>
    <v-card-title>Phone:</v-card-title>
    <v-text-field
      color="white"
      hide-details
      v.length="25"
      single-line
      rounded="true"
      value="(###)###-####"
      background-color="yellow"
      class="shrink"
      append-icon="mdi-pen"
    ></v-text-field>

    <!--
    <v-card-text>
      <v-row class="mx-0"> </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">$###,###</div>
        <div class="black--text ml-4" size="14">Sqft: #,###</div>
        <div class="black--text ml-4" size="14">MLS:#######</div>
      </v-row>
    </v-card-text>
-->
    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn class="ma-2" color="red" dark>
        Cancel
        <v-icon dark right> mdi-star </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="green" dark>
        Save
        <v-icon dark right> mdi-info </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'DataEdit',
  setup() {},
})
</script>
