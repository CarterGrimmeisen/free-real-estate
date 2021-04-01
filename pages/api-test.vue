<template>
  <v-container>
    <v-card>
      <v-card-title>User</v-card-title>
      <v-card-text v-if="!$auth.loggedin">Not Logged In</v-card-text>
      <v-card-text v-else-if="$auth.user"> {{ $auth.user }} </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Homes</v-card-title>
      <v-card-actions>
        <v-btn @click="fetchPopularHomes">Fetch Homes</v-btn>
      </v-card-actions>
      <v-card-text v-if="!homesReady"> Loading... </v-card-text>
      <v-card-text v-else-if="homes !== null">
        <div v-for="home in homes" :key="home.mlsn">
          {{ home.street }} - {{ home.price }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useHomes, useRequest } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes } = useHomes()

    const [homes, homesReady, fetchHomes] = useRequest(getHomes)

    const fetchPopularHomes = () => fetchHomes({}, { popular: true })

    return { $auth, homes, homesReady, fetchPopularHomes }
  },
})
</script>
