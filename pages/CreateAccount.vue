<!-- CreateAccount.vue -->
<template>
   <v-card class="mx-auto my-12" max-width="1000" width="1000" height="500">  
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row> <v-spacer> </v-spacer>  <v-card-title>Create a New Account</v-card-title><v-spacer> </v-spacer>  </v-row>
    <v-row> <v-card-title>Username:</v-card-title><v-text-field
        color="white"
        hide-details
        v.length="40"
        single-line
        rounded="true"
        value=""
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field> </v-row>
      <v-row> <v-card-title>Password:</v-card-title><v-text-field
        color="white"
        hide-details
        v.length="40"
        single-line
        rounded="true"
        value=""
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field> </v-row>
      <v-row> <v-card-title>Email:</v-card-title><v-text-field
        color="white"
        hide-details
        v.length="40"
        single-line
        rounded="true"
        value=""
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field> </v-row>
      <v-row> <v-card-title>Phone Number:</v-card-title><v-text-field
        color="white"
        hide-details
        v.length="40"
        single-line
        rounded="true"
        value=""
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field> </v-row>
      <v-row> <v-card-title>If this is for an Agent Account please enter your company code:</v-card-title><v-text-field
        color="white"
        hide-details
        v.length="10"
        single-line
        rounded="true"
        value=""
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field></v-row>
    
    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-row> <v-spacer> </v-spacer>
      <v-btn class="ma-2" color="primary" dark to="/homepage" >
        Cancel
        <v-icon dark right></v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/listing">
        Sign up
        <v-icon dark right> </v-icon>
      </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CreateAccount',
  setup() {
    return { data: { working: true } }
  },
})
</script>
