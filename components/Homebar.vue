<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
      <v-toolbar-title>404 Free Real Estate</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on"> Agent Utilities </v-btn>
        </template>
        <v-list>
          <v-list-item>Manage Listings</v-list-item>
          <v-list-item>Schedule Showing</v-list-item>
          <v-list-item>Generate Documents</v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on"> My Account </v-btn>
        </template>
        <v-list>
          <v-list-item>My Info</v-list-item>
          <v-list-item>Mail</v-list-item>
          <v-list-item>Favorites</v-list-item>
          <v-list-item>Logout</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-app-bar color="yellow" dark class="red--text">
      <v-text-field
        color="primary"
        hide-details
        v.length="25"
        single-line
        rounded="true"
        value="zipcode"
        background-color="primary"
        append-icon="mdi-magnify"
        class="shrink"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-title> Price: </v-toolbar-title>
      <v-range-slider
        :tick-labels="seasons"
        :value="[0, 1]"
        min="0"
        max="5"
        color="primary"
        ticks="always"
        tick-size="4"
        thumb-label="false"
      >
      </v-range-slider>

      <v-toolbar-title> Sqft: </v-toolbar-title>
      <v-range-slider
        :tick-labels="sqrt"
        :value="[0, 1]"
        color="primary"
        max="3000"
        min="0"
        step="1000"
        ticks="always"
      ></v-range-slider>
    </v-app-bar>
    <!-- <Nuxt /> -->
    <div class="container">
      <div>
        <!-- <Logo /> -->

        <!-- start of second grid -->

        <template>
          <v-container class="grey lighten-5">
            <v-row no-gutters>
              <template v-for="n in 9">
                <v-col :key="n" cols="4">
                  <ListingPreview />
                </v-col>
              </template>
            </v-row>
          </v-container>
        </template>
      </div>
    </div>
  </v-app>
</template>

<!-- end of second grid -->

<!-- <ListingPreview /> -->

<script>
import ListingPreview from './ListingPreview.vue'

export default {
  name: 'HelloWorld',
  components: { ListingPreview },
  data: () => ({
    seasons: ['0', '100k', '150k', '200k', '250k', '300k+'],
    sqrt: ['0+', '1000', '2000', '3000+'],
    alignments: ['start', 'center', 'end'],
  }),
}
</script>
