<!--EditAccount.vue-->
<template>
  <v-card class="mx-auto my-12" max-width="1000" width="1000">
    <v-card-title>Edit Account</v-card-title>
    <v-card-text>
      <v-card-title>Name:</v-card-title>
      <v-text-field
        color="black"
        hide-details
        v.length="25"
        single-line
        outlined
        placeholder="Name"
        background-color="tertiary"
        class="shrink mb-4"
        append-icon="mdi-pen"
      />

      <v-card-title>Email:</v-card-title>
      <v-text-field
        color="black"
        hide-details
        v.length="25"
        single-line
        outlined
        placeholder="myemail@freerealestate"
        background-color="tertiary"
        class="shrink mb-4"
        append-icon="mdi-pen"
      />

      <!-- <template v-if="$auth.user && $auth.user.type === 'AGENT'"> -->
      <v-card-title>Phone Number:</v-card-title>
      <v-text-field
        color="black"
        hide-details
        v.length="25"
        single-line
        outlined
        placeholder="(###)###-####"
        background-color="tertiary"
        class="shrink mb-4"
        append-icon="mdi-pen"
      />
      <!-- </template> -->

      <v-card-title>New Password:</v-card-title>

      <v-text-field
        color="black"
        hide-details
        v.length="25"
        single-line
        outlined
        type="password"
        placeholder="new password"
        background-color="tertiary"
        class="shrink"
        append-icon="mdi-pen"
      ></v-text-field>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Cancel
        <v-icon dark right>mdi-close</v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/accountpreview">
        Save
        <v-icon dark right>mdi-content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EditAccount',
  setup() {
    const { $auth } = useContext()
    return { $auth }
  },
})
</script>
