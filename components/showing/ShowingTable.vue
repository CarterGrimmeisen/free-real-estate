<template>
  <v-data-table :headers="headers" :items="showings" hide-default-footer>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.confirmed="{ item }">
      <template
        v-if="
          $auth.user &&
          $auth.user.agentProfile &&
          item.agent.id === $auth.user.agentProfile.id
        "
      >
        <template v-if="item.confirmed === null">
          <v-btn
            color="success"
            small
            block
            class="mx-0 my-1"
            @click="confirm(item.id, true)"
          >
            Confirm
          </v-btn>
          <v-btn
            color="primary"
            small
            block
            class="mx-0 my-1"
            @click="confirm(item.id, false)"
            >Cancel</v-btn
          >
        </template>
        <template v-else>
          {{ item.confirmed ? 'Confirmed' : 'Cancelled' }}
        </template>
      </template>
      <template v-else>
        {{ item.confirmed === null ? 'Unconfirmed' : item.confirmed }}
      </template>
    </template>

    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.address="{ item }">
      {{ item.home.street }} {{ item.home.city }}, {{ item.home.state }},
      {{ item.home.zipcode }}
    </template>

    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.date="{ item }">
      {{ fmtDate(item.date) }}
    </template>

    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.time="{ item }">
      {{ fmtTime(item.date) }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import { parseISO, format } from 'date-fns'
import { CompleteShowing } from '~/api/api'
import { useShowings } from '~/hooks/api'

export default defineComponent({
  name: 'ShowingTable',
  props: {
    showings: {
      type: Array as PropType<CompleteShowing[]>,
      required: true,
    },
    showAddress: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { $auth } = useContext()
    const { confirmShowing } = useShowings()

    const headers = [
      { text: 'Confirmed', value: 'confirmed', width: '20%' },
      { text: 'Date', value: 'date' },
      { text: 'Time', value: 'time' },
      ...(props.showAddress ? [{ text: 'Address', value: 'address' }] : []),
      { text: 'Participant', value: 'user.name' },
    ]

    const confirm = async (id: string, confirmed: boolean) => {
      const showing = await confirmShowing({ id }, { confirmed })
      const index = props.showings.findIndex((each) => each.id === id)!
      emit('update:showings', [
        ...props.showings.slice(0, index),
        showing,
        ...props.showings.slice(index + 1),
      ])
    }

    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)
    const fmtDate = (dateStr: string) =>
      format(parseISO(dateStr), 'EEEE LLLL do yyyy')

    const fmtTime = (dateStr: string) => format(parseISO(dateStr), 'h:MM aa')

    return {
      $auth,
      headers,
      fmt,
      fmtTime,
      fmtDate,
      confirm,
    }
  },
})
</script>
