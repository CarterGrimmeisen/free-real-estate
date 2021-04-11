<!-- ShowingForm.vue -->
<template>
  <v-card class="mx-auto my-12" max-width="1000">
    <v-spacer></v-spacer>
    <v-card-title> Schedule a Showing</v-card-title>

    <v-row justify="space-around">
      <v-date-picker v-model="picker" color="primary"></v-date-picker>
      <v-time-picker v-model="e4" color="primary"></v-time-picker>
      <v-container class="px-0" fluid>
        <v-row>
          <v-spacer> </v-spacer> Duration:
          <v-checkbox v-model="checkbox15" :label="`15 minutes `"></v-checkbox>
          <v-spacer> </v-spacer>
          <v-checkbox v-model="checkbox30" :label="`30 minutes`"></v-checkbox>
          <v-spacer> </v-spacer>
          <v-checkbox v-model="checkbox45" :label="`45 minutes`"></v-checkbox>
          <v-spacer> </v-spacer>
        </v-row>
      </v-container>
    </v-row>
    <v-row no-gutters>
      <v-card-title>MLS:</v-card-title>
      <v-card-title>
        <v-text-field
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          placeholder="#######"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field>
      </v-card-title>
    </v-row>
    <v-row no-gutters>
      <v-card-title>Name(s) of Interested:</v-card-title>
      <v-card-title>
        <v-text-field
          color="black"
          hide-details
          v.length="100"
          single-line
          outlined
          placeholder="Names"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field
      ></v-card-title>
    </v-row>
    <v-row no-gutters>
      <v-card-title> Showing Agent Email: </v-card-title>
      <v-card-title>
        <v-text-field
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          placeholder="myemail@freerealestate"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        ></v-text-field> </v-card-title
    ></v-row>
    <v-row no-gutters>
      <v-card-title> Showing Agent Phone: </v-card-title>
      <v-card-title
        ><v-text-field
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

    <v-divider></v-divider>

    <v-row no-gutters>
      <v-card-actions>
        <v-btn class="ma-2" color="primary" dark to="/listing">
          Cancel
          <v-icon dark right></v-icon>
        </v-btn>
        <v-btn class="ma-2" color="primary" dark to="/showingpage">
          Save
          <v-icon dark right> </v-icon>
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ShowingForm',
  setup() {
    return {
      checkbox15: ref(false),
      checkbox30: ref(false),
      checkbox45: ref(false),
      e4: ref(null),
      picker: ref(new Date().toISOString().substr(0, 10)),
    }
  },
})
</script>
