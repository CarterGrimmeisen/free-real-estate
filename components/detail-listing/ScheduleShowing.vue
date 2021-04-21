<template>
  <v-dialog v-model="scheduling" max-width="600">
    <v-card>
      <v-expand-transition v-if="scheduling">
        <v-alert v-if="schedulingError" type="error" dense>
          {{ schedulingError }}
        </v-alert>
      </v-expand-transition>
      <v-card-title>Schedule a Showing</v-card-title>
      <v-card-text>
        <v-stepper v-model="step" vertical non-linear class="elevation-0">
          <v-stepper-step
            edit-icon="$complete"
            editable
            :complete="!!date"
            step="1"
          >
            Choose the date for your showing
            <small>
              You will receive a confirmation email with the details
            </small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-date-picker
              v-model="date"
              landscape
              class="mb-12"
              elevation="1"
            />
            <v-btn class="mb-4" color="primary" @click="step++">Continue</v-btn>
            <v-btn text @click="scheduling = false">Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step
            edit-icon="$complete"
            editable
            :complete="!!time"
            step="2"
          >
            Select the time for your showing
            <small>The listing agent will approve your showing time</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-time-picker
              v-model="time"
              landscape
              class="mb-12"
              elevation="1"
            />
            <v-btn class="mb-4" color="primary" @click="step++">Continue</v-btn>
            <v-btn text @click="scheduling = false">Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step
            edit-icon="$complete"
            editable
            :complete="step > 3"
            step="3"
          >
            Confirm your appointment date and time
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card class="mx-auto mb-12" elevation="1" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Confirm your showing</div>
                  <v-list-item-title class="headline mb-1">
                    {{ home.street }}, <br />
                    {{ home.city }}, {{ home.state }} {{ home.zipcode }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">
                    On {{ fmtDate }} at {{ fmtTime }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn class="mb-4" color="primary" @click="scheduleShowing">
              Confirm
            </v-btn>
            <v-btn text @click="scheduling = false">Cancel</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { Home } from '@prisma/client'
import { parse, format } from 'date-fns'
import { useShowings } from '~/hooks/api'

export default defineComponent({
  props: {
    home: {
      type: Object as PropType<Home>,
      required: true,
    },
  },
  setup(props) {
    const { $auth } = useContext()
    const $route = useRoute()
    const $router = useRouter()
    const { createShowing } = useShowings()

    const step = ref(1)
    const date = ref<string | null>(null)
    const time = ref<string | null>(null)
    const schedulingError = ref('')
    const scheduling = computed({
      get: () => $route.value.query.scheduling === null && $auth.value.loggedin,
      set: (val) =>
        val ||
        $router.replace({ query: { scheduling: undefined } }).catch(() => {}),
    })

    const fmtDate = computed(
      () =>
        date.value &&
        format(
          parse(`${date.value}`, 'yyyy-MM-dd', new Date()),
          'EEEE MMMM do yyyy'
        )
    )

    const fmtTime = computed(
      () =>
        time.value &&
        format(parse(`${time.value}`, 'HH:mm', new Date()), 'h:mm aa')
    )

    const scheduleShowing = async () => {
      await createShowing(
        {},
        {
          homeMlsn: props.home.mlsn,
          date: new Date(`${date.value} ${time.value}`),
        }
      ).catch((e: Error) => (schedulingError.value = e.message))

      scheduling.value = false
    }

    return {
      step,
      date,
      time,
      fmtDate,
      fmtTime,
      scheduling,
      scheduleShowing,
      schedulingError,
    }
  },
})
</script>
