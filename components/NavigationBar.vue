<!-- just the homebar -->
<template>
  <v-app-bar color="primary" dark app>
    <v-btn class="tertiary" icon to="/"
      ><v-icon color="primary">mdi-home</v-icon></v-btn
    >
    <v-toolbar-title class="tertiary--text"
      >404 Free Real Estate</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" class="tertiary--text" v-on="on">
          Agent Utilities
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/managelistings">Manage Listings </v-list-item>
        <v-list-item to="/ShowingPage">Schedule Showing</v-list-item>
        <v-list-item to="/generatedocuments">Generate Documents</v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="!$auth.loggedin" text class="tertiary--text" @click="login">
      Login
    </v-btn>
    <v-menu v-else-if="$auth.user">
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" class="tertiary--text" v-on="on">
          My Account
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/accountpreview"> My Account</v-list-item>

        <v-list-item>Favorites</v-list-item>
        <v-list-item @click="doLogout">Logout</v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon to="/listings"
      ><v-icon color="white">mdi-home-city</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks/api'

export default defineComponent({
  setup(_, ctx) {
    const login = () => ctx.emit('login')

    const { $auth } = useContext()
    const { logout } = useAuth()

    const doLogout = async () => {
      const { success } = await logout().catch((_) => ({ success: false }))
      if (success) {
        $auth.value.user = null
        $auth.value.loggedin = false
      }
    }

    return { login, $auth, doLogout }
  },
})
</script>
