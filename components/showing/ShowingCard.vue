<template>
  <v-card
    class="mx-auto my-12"
    max-width="1200"
    width="1200"
    height="320"
    max-height="400"
  >
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="6" md="4">
          <v-card height="300" width="300" class="mx-auto">
            <v-navigation-drawer
              permanent
              max-width="500"
              width="500"
              height="300"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                width="300px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-card class="pa-2" width="1150" height="300" outlined title>
            <v-img></v-img>

            <v-row>
              <v-card-title>#### Street City State Zipcode</v-card-title>
              <v-spacer> </v-spacer>
              <v-card-title>MLS: #######</v-card-title></v-row
            >
            <v-row>
              <v-card-subtitle>Date/Time:</v-card-subtitle>
              <v-card-subtitle>##/##/####</v-card-subtitle>
              <v-card-subtitle>Start: ##:## ?m - End: ##:## ?m</v-card-subtitle>
            </v-row>
            <v-row>
              <v-card-subtitle>Listing Detail: </v-card-subtitle>
              <v-card-subtitle
                >Listing Agency, Agent name - (###)###-####</v-card-subtitle
              >
            </v-row>
            <v-row>
              <v-card-subtitle>Showing Detail: </v-card-subtitle>
              <v-card-subtitle
                >Showing Agency, Agent name - (###)###-####</v-card-subtitle
              >
            </v-row>

            <v-card-text>
              <div class="text-left" size="14">
                <!-- <v-card-text>
                      This is where I want the document preview
                    </v-card-text>
                    -->
              </div>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-spacer> </v-spacer>
                <v-btn class="ma-2" color="primary" dark to="/detailedshowing">
                  View Details
                  <v-icon dark right> </v-icon>
                </v-btn>
                <v-btn class="ma-2" color="primary" dark to="/feedbackform">
                  Feedback Form
                  <v-icon dark right> </v-icon>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ShowingCard',
  setup() {},
})
</script>
