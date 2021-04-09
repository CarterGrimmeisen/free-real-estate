<template>
  <v-container>
    <v-card>
      <v-card-title>User</v-card-title>
      <v-card-text v-if="!$auth.loggedin">Not Logged In</v-card-text>
      <v-card-text v-else-if="$auth.user">
        <p>
          {{ $auth.user }}
        </p>
        <v-alert :type="$auth.user.type === 'AGENT' ? 'success' : 'warning'">
          IS AN {{ $auth.user.type }}
        </v-alert>
      </v-card-text>
    </v-card>
    <br />
    <v-card>
      <v-card-title>Use Data Homes</v-card-title>
      <v-card-text v-if="!dataHomesReady"> Loading... </v-card-text>
      <v-card-text v-else-if="dataHomes !== null">
        <div v-for="home in dataHomes" :key="home.mlsn">
          {{ home.street }} - {{ home.price }}
        </div>
      </v-card-text>
    </v-card>
    <br />
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
    <br />
    <v-card>
      <v-card-title>Updated Home</v-card-title>
      <v-card-actions>
        <v-btn @click="updateSpecifiedHome">Update Home</v-btn>
      </v-card-actions>
      <v-card-text v-if="updatedHome === null">
        Home has not been updated
      </v-card-text>
      <v-card-text v-else>
        {{ updatedHome.street }} - {{ updatedHome.price }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<router>
{
  meta: {
    auth: 'AGENT'
  }
}
</router>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useHomes, useRequest, useData } from '@/hooks/api'
import { Home } from '@prisma/client'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes, updateHome } = useHomes()

    const updatedHome = ref<Home | null>(null)

    // $auth.user is a ref, use .value
    // eslint-disable-next-line no-console
    console.log($auth.value.user?.name)

    /* Requests data on component mount */
    const [dataHomes, dataHomesReady] = useData(getHomes)
    /* Requests data when returned function is executed */
    const [homes, homesReady, fetchHomes] = useRequest(getHomes)

    const fetchPopularHomes = () => fetchHomes({}, { agent: 'Vick Vinegar' })

    /* Use raw request when creating/updating/deleting data */
    const updateSpecifiedHome = async () => {
      updatedHome.value = await updateHome(
        { mlsn: '7777777' },
        { price: 420_690 }
      )
    }

    return {
      $auth,
      homes,
      homesReady,
      fetchPopularHomes,
      dataHomes,
      dataHomesReady,
      updatedHome,
      updateSpecifiedHome,
    }
  },
})
</script>
