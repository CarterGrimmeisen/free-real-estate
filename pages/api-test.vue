<template>
  <v-container>
    <v-card>
      <v-card-title>User</v-card-title>
      <v-card-text v-if="!$auth.loggedin">Not Logged In</v-card-text>
      <v-card-text v-else-if="$auth.user"> {{ $auth.user }} </v-card-text>
      <template v-if="$auth.user">
        <v-card-text v-if="$auth.user.type === 'AGENT'">
          IS AN AGENT
        </v-card-text>
        <v-card-text v-else> IS SOMETHING ELSE (USER OR ADMIN) </v-card-text>
      </template>
      <v-card-text></v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Use Data Homes</v-card-title>
      <v-card-text v-if="!dataHomesReady"> Loading... </v-card-text>
      <v-card-text v-else-if="dataHomes !== null">
        <div v-for="home in dataHomes" :key="home.mlsn">
          {{ home.street }} - {{ home.price }}
        </div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Use Request Homes</v-card-title>
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
import { useHomes, useRequest, useData } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes } = useHomes()

    // $auth.user is a ref, use .value
    console.log($auth.value.user?.name)

    /* Requests data on component mount */
    const [dataHomes, dataHomesReady] = useData(getHomes)
    /* Requests data when returned function is executed */
    const [homes, homesReady, fetchHomes] = useRequest(getHomes)

    const fetchPopularHomes = () => fetchHomes({}, { priceMin: 200_000 })

    return {
      $auth,
      homes,
      homesReady,
      fetchPopularHomes,
      dataHomes,
      dataHomesReady,
    }
  },
})
</script>
