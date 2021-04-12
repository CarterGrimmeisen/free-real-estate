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
        <v-divider />
        <v-list-item to="/api-test">API Test</v-list-item>
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
import {
  defineComponent,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks/api'

export default defineComponent({
  setup(_) {
    const $router = useRouter()

    const login = () => $router.push({ query: { auth: 'true' } })

    const { $auth } = useContext()
    const $route = useRoute()
    const { logout } = useAuth()

    const doLogout = async () => {
      const { success } = await logout().catch((_) => ({ success: false }))
      if (success) {
        if ($route.value.meta?.auth) {
          $router.push('/').then(() => {
            $auth.value.user = null
            $auth.value.loggedin = false
          })
        } else {
          $auth.value.user = null
          $auth.value.loggedin = false
        }
      }
    }

    return { login, $auth, doLogout }
  },
})
</script>
