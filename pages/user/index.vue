<!--AccountPreview.vue -->
<template>
  <v-card
    v-if="$auth.user"
    class="mx-auto my-12"
    max-width="1000"
    width="1000"
    height="400"
  >
    <v-card-title>Name:</v-card-title>
    <div class="black--text ml-4" size="14" align="left">
      {{ $auth.user.name }}
    </div>
    <v-card-title>Email:</v-card-title>
    <div class="black--text ml-4" size="14" align="left">
      {{ $auth.user.email }}
    </div>
    <div v-if="$auth.user.agentProfile">
      <v-card-title>Phone:</v-card-title>
      <div class="black--text ml-4" size="14" align="left">
        {{ $auth.user.agentProfile.phone }}
      </div>
      <v-card-title>Agency Name:</v-card-title>
      <div class="black--text ml-4" size="14" align="left">
        {{ $auth.user.agentProfile.agency.name }}
      </div>
    </div>

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
      <v-btn class="ma-2" color="primary" dark to="/user/edit">
        Edit Details
        <v-icon dark right> mdi-cog-outline </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccountPreview',
  setup() {
    const { $auth } = useContext()

    return {
      $auth,
    }
  },
})
</script>
