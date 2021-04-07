<!-- DetailedShowing.vue -->
<template>
  <v-card class="mx-auto my-12" max-width="1200" width="1200" height="1350">
    <v-row
      ><v-spacer></v-spacer><v-card-title>Showing Details</v-card-title>
      <v-spacer></v-spacer
    ></v-row>
    <v-divider class="mx-4"></v-divider>
    <v-row>
      <v-spacer></v-spacer
      ><v-card-subtitle>Street Name, City, State, Zipcode</v-card-subtitle>
      <v-spacer></v-spacer><v-card-subtitle>MLS: #######</v-card-subtitle>
      <v-spacer></v-spacer
    ></v-row>
    <v-row>
      <v-spacer></v-spacer
      ><v-card-subtitle>Potential Buyer: name here</v-card-subtitle>
      <v-spacer></v-spacer> <v-card-subtitle>Date: ##/##/####</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-subtitle>Time: ##:## ?m - ##:## ?m</v-card-subtitle>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Agency and Agent Information</v-card-title>
    <v-row>
      <v-card-subtitle
        >Listing Agency: Agency Name Here - Agency Adress Here
      </v-card-subtitle>
      <v-spacer></v-spacer
    ></v-row>
    <v-row
      ><v-card-subtitle
        >Listing Agent: Agent Name Here - (###)###-#### ,
        AgentName@freerealestate.com</v-card-subtitle
      ><v-spacer></v-spacer
    ></v-row>
    <v-row>
      <v-card-subtitle
        >Showing Agency: Agency Name Here - Agency Adress Here
      </v-card-subtitle>
      <v-spacer></v-spacer
    ></v-row>
    <v-row
      ><v-card-subtitle
        >Showing Agent: Agent Name Here - (###)###-#### ,
        AgentName@freerealestate.com</v-card-subtitle
      ><v-spacer></v-spacer
    ></v-row>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Home Security Information</v-card-title>
    <v-row>
      <v-spacer></v-spacer
      ><v-card-subtitle>Is the Home Still Occupied: yes/no </v-card-subtitle>
      <v-spacer></v-spacer
      ><v-card-subtitle>Lockbox Code: ##### </v-card-subtitle>
      <v-spacer></v-spacer
    ></v-row>
    <v-textarea
      readonly
      disabled
      height="150"
      full-width="true"
      auto-grow
      value="This erea will have home alarm information and include the lockbox code "
      solo
    ></v-textarea>

    <v-divider class="mx-4"></v-divider>
    <v-card-title>Feedback For Showing</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-row>
      <v-card-subtitle
        >1. Is the customer interested in the property?
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-card-subtitle>
        ----- Showing Agent has not provided feedback yet.
      </v-card-subtitle>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-card-subtitle
        >2. Please rate your overall experience at this showing:
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-card-subtitle>
        ----- Showing Agent has not provided feedback yet.
      </v-card-subtitle>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-card-subtitle
        >3. Your (and your customer’s) opinion of the price:
      </v-card-subtitle>
    </v-row>
    <v-row>
      <v-card-subtitle>
        ----- Showing Agent has not provided feedback yet.
      </v-card-subtitle>
      <v-spacer></v-spacer>
    </v-row>

    <v-card-subtitle>4. Additional Comments: </v-card-subtitle>
    <v-textarea
      readonly
      disabled
      height="150"
      full-width="true"
      auto-grow
      value="Showing Agent has not provided feedback yet. "
      solo
    ></v-textarea>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn class="ma-2" color="primary" dark to="/ShowingPage">
        Exit
        <v-icon dark right></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DetailedShowing',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup() {},
})
</script>
