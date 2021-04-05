<!-- FeedbackForm.vue -->
<template>
  <v-card class="mx-auto my-12" max-width="1000" width="1000" height="500">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Showing Feedback Form</v-card-title>
    <v-row>
      <v-card-subtitle
        >1. Is the customer interested in the property?
      </v-card-subtitle>
      <v-combobox
        v-model="select"
        :items="items"
        label=""
        outlined
        dense
      ></v-combobox>
      <v-spacer> </v-spacer
    ></v-row>
    <v-row>
      <v-card-subtitle
        >2. Please rate your overall experience at this showing:
      </v-card-subtitle>
      <v-combobox
        v-model="select2"
        :items="items2"
        label=""
        outlined
        dense
      ></v-combobox>
      <v-spacer> </v-spacer
    ></v-row>

    <v-row>
      <v-card-subtitle
        >3. Your (and your customer’s) opinion of the price:
      </v-card-subtitle>
      <v-combobox
        v-model="select3"
        :items="items3"
        label=""
        outlined
        dense
      ></v-combobox>
      <v-spacer> </v-spacer
    ></v-row>

    <v-card-subtitle>4. Additional Comments: </v-card-subtitle>
    <v-textarea
      height="120"
      full-width="true"
      auto-grow
      value="This is where there will be a small block of text "
      solo
    ></v-textarea>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn class="ma-2" color="primary" dark to="/ShowingPage">
        Cancel
        <v-icon dark right></v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/ShowingPage">
        Save
        <v-icon dark right> </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FeedbackForm',
  setup() {
    return {
      select: ['Please Select a Value'],
      items: ['Yes', 'No', 'Potentialy'],
      select2: ['Please Select a Value'],
      items2: [
        'Very Satisfied',
        'Satisfied',
        'Indifferent',
        'Unsatisfied',
        'Very Unsatisfied',
      ],
      select3: ['Please Select a Value'],
      items3: ['Way too High', 'Needs Negotiation', 'Priced Accordingly'],
      data: { working: true },
    }
  },
})
</script>
