<!-- Detailed Listing -->
<template>
  <div v-if="home">
    <v-container justify-center>
      <v-card v-if="home" class="pa-2" outlined title>
        <v-card-title class="primary--text">
          {{ home.street }}, {{ home.city }}, {{ home.state }}
          {{ home.zipcode }}
        </v-card-title>
        <v-divider class="mx-4"></v-divider>

        <ImageDisplay :mlsn="mlsn" />

        <v-row v-if="$auth.loggedin" no-gutters>
          <v-btn
            v-if="$auth.loggedin && homeLiked !== null"
            class="ma-2"
            color="primary"
            dark
            @click="doLikeHome"
          >
            {{ homeLiked.liked ? 'Unf' : 'F' }}avorite
            <v-icon dark right>
              {{ homeLiked.liked ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2 tertiary--text"
            color="primary"
            dark
            :to="{ query: { scheduling: null } }"
          >
            Schedule a Showing
            <v-icon dark right class="tertiary--text"> mdi-plus-circle </v-icon>
          </v-btn>
          <v-btn
            class="ma-2 tertiary--text"
            color="primary"
            dark
            :to="`/listings/${mlsn}/showings`"
          >
            View Showings
            <v-icon dark right class="tertiary--text"> mdi-calendar </v-icon>
          </v-btn>
          <v-btn
            v-if="$auth.user && $auth.user.type === 'AGENT'"
            class="ma-2 tertiary--text"
            color="primary"
            dark
            :to="`/listings/${mlsn}/edit`"
          >
            Edit Listing
          </v-btn>
        </v-row>

        <v-divider class="mx-4" />

        <v-card-title bold> Property Details </v-card-title>

        <v-divider class="mx-4" />

        <v-row>
          <v-col>
            <v-card-title> Listing Price: ${{ fmt(home.price) }} </v-card-title>
          </v-col>
          <v-col>
            <v-card-title>
              Square Feet: {{ fmt(home.sqfootage) }}
            </v-card-title>
          </v-col>
          <v-col>
            <v-card-title> MLS: {{ home.mlsn }} </v-card-title>
          </v-col>
        </v-row>

        <!--<v-card-title>HOA: ??? </v-card-title>
          <v-card-title>Subdivision: Maybe, Maybe not</v-card-title>--->
        <v-card-title>School Zones: </v-card-title>

        <v-row>
          <v-col v-for="(school, i) in home.schools" :key="i">
            <v-card-title>
              {{ school.name }} (Grades: {{ school.grades }})
            </v-card-title>
          </v-col>
          <!--<v-col>
              <v-card-title> Elementry: Some school </v-card-title>
            </v-col>
            <v-col>
              <v-card-title> Jr: Some schools </v-card-title>
            </v-col>
            <v-col>
              <v-card-title> High: some school </v-card-title>
            </v-col>--->
        </v-row>

        <v-card-text class="primary--text">
          <div class="text-center" size="14"></div>
          <v-card-title>Brief Description of Property</v-card-title>
          <v-textarea
            readonly
            disabled
            height="300"
            auto-grow
            solo
            :value="home.description"
          />
          <!--<v-card-title>Facts and Features </v-card-title>
            <v-textarea
              readonly
              disabled
              height="250"
              auto-grow
              value="This is where there will be a medium block of text and thats alright"
              solo
            ></v-textarea>--->
          <v-card-title> Additional Room Information </v-card-title>
          <v-textarea
            readonly
            disabled
            height="150"
            auto-grow
            :value="`${home.bedrooms} bed, ${home.bathrooms} bath `"
            solo
          />
          <v-divider class="mx-4" />
          <v-spacer />
          <v-card-title color="black" bold> Listing Details </v-card-title>
          <v-divider class="mx-4" />
          <v-card-title color="black" bold>
            <v-spacer />
            Listing Agency
            <v-spacer />
          </v-card-title>
          <v-spacer />
          <template v-if="home.agent">
            <v-row>
              <v-spacer />
              {{ home.agent.agency.name }}
              <v-spacer />
            </v-row>
            <v-row>
              <v-spacer />
              {{ home.agent.agency.address }}
              <v-spacer />
            </v-row>
            <v-card-title color="black" bold>
              <v-spacer />
              Listing Agent
              <v-spacer />
            </v-card-title>
            <v-spacer />
            <v-row>
              <v-spacer />
              {{ home.agent.name }}
              <v-spacer />
            </v-row>
            <v-row> <v-spacer />{{ home.agent.email }} <v-spacer /></v-row>
          </template>
        </v-card-text>
        <!--<v-row
            ><v-spacer></v-spacer>
            <v-card-subtitle>Currently Occupied:</v-card-subtitle
            ><v-checkbox label="" outlined dense></v-checkbox
            ><v-spacer></v-spacer>
            <v-card-subtitle>Lockbox code: </v-card-subtitle>
            <v-text-field
              color="white"
              hide-details
              v.length="25"
              single-line
              rounded="false"
              background-color="secondary"
              class="shrink"
              append-icon="mdi-pen"
              ></v-text-field
            ><v-spacer></v-spacer>
          </v-row>--->
        <v-card-text v-if="$auth.loggedin" class="primary--text">
          <v-divider /> <v-spacer />
          <v-card-title>Home Alarm Information </v-card-title>
          <v-divider />
          <v-row align="center" justify="center">
            <v-col>
              <v-checkbox label="Occupied" outlined dense disabled />
            </v-col>
            <v-col>
              <v-card-subtitle>
                Lockbox info: {{ home.alarmInfo }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <ScheduleShowing :home="home" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import { useData, useHomes } from '@/hooks/api'

export default defineComponent({
  name: 'DetailedListing',
  setup(_, { emit }) {
    const $route = useRoute()
    const { $auth } = useContext()
    const { getHome, getLiked, likeHome } = useHomes()

    const mlsn = $route.value.params.mlsn
    const home = useData(getHome, { mlsn })

    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)

    const homeLiked = ref<{ liked: boolean } | null>({ liked: false })
    watch(
      $auth,
      async () => {
        if (!home.value) return
        return (homeLiked.value = $auth.value.loggedin
          ? await getLiked({ mlsn: home.value.mlsn })
          : { liked: false })
      },
      { immediate: true }
    )

    const doLikeHome = async () => {
      homeLiked.value = await likeHome({ mlsn: home.value!.mlsn }, null)
      emit('toggledLike')
    }

    return {
      $auth,
      mlsn,
      home,
      fmt,
      homeLiked,
      doLikeHome,
    }
  },
})
</script>
