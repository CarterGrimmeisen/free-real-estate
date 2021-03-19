<!-- Filter Bar -->
<template>
  <v-toolbar id="filterbar" color="white" flat>
    <v-row align="center">
      <v-col cols="2" align-self="center">
        <v-text-field
          color="primary"
          hide-details
          v.length="25"
          single-line
          rounded
          value="zipcode"
          background-color="tertiary"
          append-icon="mdi-magnify"
          class="shrink"
        ></v-text-field>
      </v-col>
      <v-spacer> </v-spacer>
      <v-col cols="4" align-self="center">
        <v-range-slider
          label="Price"
          :tick-labels="prices"
          :value="[0, 1]"
          min="0"
          max="5"
          color="primary"
          ticks="always"
          tick-size="4"
          track-color="tertiary"
        >
        </v-range-slider>
      </v-col>
      <v-col cols="3" align-self="center">
        <v-range-slider
          label="Sqft"
          :tick-labels="sqrt"
          :value="[0, 1]"
          color="primary"
          max="3000"
          min="0"
          step="1000"
          ticks="always"
          tick-size="4"
          track-color="tertiary"
        ></v-range-slider>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'FilterBar',
  components: {},
  setup() {},
  data: () => ({
    prices: ['0', '100k', '150k', '200k', '250k', '300k+'],
    sqrt: ['0+', '1000', '2000', '3000+'],
    alignments: ['start', 'center', 'end'],
  }),
})
</script>

<style>
#filterbar {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
