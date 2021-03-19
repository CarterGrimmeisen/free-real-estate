<!-- just the homebar -->
<template>
  <v-app-bar color="primary" dark app>
    <v-btn class="tertiary" icon to="/homepage"
      ><v-icon color="primary">mdi-home</v-icon></v-btn
    >
    <v-toolbar-title class="tertiary--text"
      >404 Free Real Estate</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" class="tertiary--text" v-on="on">
          Agent Utilities
        </v-btn>
      </template>
      <v-list>
        <v-list-item>Manage Listings</v-list-item>
        <v-list-item>Schedule Showing</v-list-item>
        <v-list-item>Generate Documents</v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" class="tertiary--text" v-on="on">
          My Account
        </v-btn>
      </template>
      <v-list>
        <v-list-item>My Account</v-list-item>

        <v-list-item>Favorites</v-list-item>
        <v-list-item>Logout</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'NavigationBar',
  components: {},
  setup() {},
  data: () => ({
    seasons: ['0', '100k', '150k', '200k', '250k', '300k+'],
    sqrt: ['0+', '1000', '2000', '3000+'],
    alignments: ['start', 'center', 'end'],
  }),
})
</script>
