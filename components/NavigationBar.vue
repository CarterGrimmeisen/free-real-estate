<!-- just the homebar -->
<template>
  <v-app-bar color="primary" dark app>
    <v-btn class="tertiary" icon to="/">
      <v-icon color="primary">mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title class="tertiary--text">
      404 Free Real Estate
    </v-toolbar-title>
    <v-spacer />
    <v-btn v-if="!$auth.loggedin" text class="tertiary--text" @click="login">
      Login
    </v-btn>
    <v-menu v-else-if="$auth.user" offset-y left max-width="250">
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" class="tertiary--text" v-on="on">
          My Account
        </v-btn>
      </template>
      <v-list class="text-right">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $auth.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item to="/user" exact>
          <v-list-item-content>
            <v-list-item-title> My Account </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/user/liked" exact>
          <v-list-item-content>
            <v-list-item-title> Favorites </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/user/showings" exact>
          <v-list-item-content>
            <v-list-item-title> Showings </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doLogout">
          <v-list-item-content>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon to="/listings" exact>
      <v-icon color="white">mdi-home-city</v-icon>
    </v-btn>
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
  setup() {
    const $router = useRouter()

    const login = () => $router.replace({ query: { auth: 'true' } })

    const { $auth } = useContext()
    const $route = useRoute()
    const { logout } = useAuth()

    const doLogout = async () => {
      const { success } = await logout().catch((_) => ({ success: false }))
      if (success) {
        if ($route.value.meta?.auth) {
          $router.replace('/').then(() => {
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
