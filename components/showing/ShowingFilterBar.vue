<!-- ShowingFilterBar.vue -->
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
          value="MLS: ######"
          background-color="tertiary"
          append-icon="mdi-magnify"
          class="shrink"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'ShowingFilterBar',
  components: {},
  setup() {},
})
</script>

<style>
#filterbar {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
