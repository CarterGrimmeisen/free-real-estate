<!-- Filter Bar -->
<template>
  <v-toolbar id="filterbar" color="white" flat>
    <v-row align="center">
      <v-col cols="3" align-self="center">
        <v-text-field
          color="primary"
          hide-details
          single-line
          rounded
          placeholder="zipcode"
          background-color="tertiary"
          append-icon="mdi-magnify"
          class="shrink"
        />
      </v-col>
      <v-spacer />

      <v-col cols="4" align-self="center">
        <div id="app">
          <v-range-slider
            label="Price"
            :tick-labels="prices"
            :value="priceRange"
            color="primary"
            ticks="always"
            tick-size="3"
            track-color="tertiary"
            step="50000"
            min="0"
            max="400000"
            @input="(val) => $emit('update:priceRange', val)"
          />
        </div>

        <!-- <h1>{{minimumPrice}}, {{maxValue}} </h1> -->
      </v-col>
      <v-col cols="4" align-self="center">
        <v-range-slider
          label="Sqft"
          :tick-labels="sqft"
          :value="sqftRange"
          color="primary"
          max="4000"
          min="0"
          step="1000"
          ticks="always"
          tick-size="4"
          track-color="tertiary"
          @input="(val) => $emit('update:sqftRange', val)"
        />
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  name: 'FilterBar',
  props: {
    priceRange: {
      type: Array as PropType<number[]>,
      required: true,
    },
    sqftRange: {
      type: Array as PropType<number[]>,
      required: true,
    },
    zipcode: {
      type: Number,
      default: null,
    },
  },
  setup() {
    return {
      prices: ['0', '', '100k', '', '200k', '', '300k', '', '∞'],
      sqft: ['0', '1000', '2000', '3000', '∞'],
    }
  },
})
</script>

<style>
#filterbar {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
