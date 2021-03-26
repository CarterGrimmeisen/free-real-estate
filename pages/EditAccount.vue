<!--EditAccount.vue-->
<template>
   <v-card class="mx-auto my-12" max-width="1000" width="1000" height="500">  
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Username:</v-card-title> 
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="true"
        value="my username"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    <v-card-title>Email:</v-card-title>
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="true"
        value="myemail@freerealestate"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    <v-card-title>Phone:</v-card-title>
    <v-text-field
        color="white"
        hide-details
        v.length="25"
        single-line
        rounded="true"
        value="(###)###-####"
        background-color="secondary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    
    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Cancel
        <v-icon dark right></v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Save
        <v-icon dark right> </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EditAccount',
  setup() {
    return { data: { working: true } }
  },
})
</script>
