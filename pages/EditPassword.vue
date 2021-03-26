<!-- EditPassword.vue -->
<!--EditAccount.vue-->
<template>
   <v-card class="mx-auto my-12" max-width="1000" width="6000" height="500" title="Change Password">  
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Current Password:</v-card-title> 
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="True"
        value="enter current password"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    <v-card-title>New Password:</v-card-title>
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="True"
        value="new password"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
      <v-card-title>Confirm New:</v-card-title>
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="True"
        value="new password"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
  
    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Cancel
        <v-icon dark right> </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Save
        <v-icon dark right> mdi-info </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EditPassword',
  setup() {
    return { data: { working: true } }
  },
})
</script>