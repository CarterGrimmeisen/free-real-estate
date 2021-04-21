<!--AccountPreview.vue -->
<template>
  <v-container>
    <v-card v-if="$auth.user" class="mx-auto">
      <v-card-title>Name:</v-card-title>
      <v-card-text>
        <div class="black--text ml-4" size="14" align="left">
          {{ $auth.user.name }}
        </div>
      </v-card-text>
      <v-card-title>Email:</v-card-title>
      <v-card-text>
        <div class="black--text ml-4" size="14" align="left">
          {{ $auth.user.email }}
        </div>
      </v-card-text>
      <template v-if="$auth.user.agentProfile">
        <v-card-title>Phone:</v-card-title>
        <v-card-text class="black--text ml-4" size="14" align="left">
          {{ $auth.user.agentProfile.phone }}
        </v-card-text>
        <v-card-title>Agency Name:</v-card-title>
        <v-card-text class="black--text ml-4" size="14" align="left">
          {{ $auth.user.agentProfile.agency.name }}
        </v-card-text>
      </template>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn class="ma-2" color="primary" dark to="/user/edit">
          Edit Details
          <v-icon dark right> mdi-cog-outline </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
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
