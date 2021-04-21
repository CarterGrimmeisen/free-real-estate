<!-- ShowingPage.vue -->
<template>
  <v-container v-if="showings">
    <v-data-table
      :headers="headers"
      :items="showings"
      class="elevation-1"
      hide-default-footer
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.confirmed="{ item }">
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

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.date="{ item }">
        {{ fmtDate(item.date) }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.time="{ item }">
        {{ fmtTime(item.date) }}
      </template>
    </v-data-table>
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
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useData, useShowings } from '@/hooks/api'
import { parseISO, format } from 'date-fns'

export default defineComponent({
  setup() {
    const { getHomeShowings, confirmShowing } = useShowings()
    const $route = useRoute()
    const mlsn = $route.value.params.mlsn
    const showings = useData(getHomeShowings, { mlsn })

    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)
    const fmtDate = (dateStr: string) =>
      format(parseISO(dateStr), 'EEEE LLLL do yyyy')

    const fmtTime = (dateStr: string) => format(parseISO(dateStr), 'h:MM aa')

    const confirm = async (id: string, confirmed: boolean) => {
      const showing = await confirmShowing({ id }, { confirmed })
      const index = showings.value?.findIndex((each) => each.id === id)!
      showings.value!.splice(index, 1, showing)
    }

    const headers = [
      { text: 'Confirmed', value: 'confirmed', width: '12%' },
      { text: 'Date', value: 'date' },
      { text: 'Time', value: 'time' },
      { text: 'Participant', value: 'user.name' },
    ]

    return {
      headers,
      showings,
      fmt,
      fmtDate,
      fmtTime,
      confirm,
    }
  },
})
</script>
