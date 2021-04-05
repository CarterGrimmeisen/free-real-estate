<!-- Detailed Listing -->
<template>
  <div>
    <div>
      <v-container justify-center>
        <v-card class="pa-2" outlined title>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card-title class="primary--text">
            Street, City, State, Zipcode
          </v-card-title>
          <v-divider class="mx-4"></v-divider>

          <ImageDisplay />

          <v-divider class="mx-4"></v-divider>

          <v-card-title bold>Property Details </v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-row>
            <v-col><v-card-title>Listing Price: $$$,$$$</v-card-title></v-col>
            <v-col><v-card-title>Square Feet: #,### </v-card-title></v-col>
            <v-col><v-card-title>MLS: ####### </v-card-title></v-col>
          </v-row>

          <v-card-title>HOA: ??? </v-card-title>
          <v-card-title>Subdivision: Maybe, Maybe not</v-card-title>
          <v-card-title>School Zones: </v-card-title>

          <v-row>
            <v-col>
              <v-card-title> Elementry: Some school </v-card-title>
            </v-col>
            <v-col>
              <v-card-title> Jr: Some schools </v-card-title>
            </v-col>
            <v-col>
              <v-card-title> High: some school </v-card-title>
            </v-col>
          </v-row>

          <v-card-text class="primary--text">
            <div class="text-center" size="14"></div>
            <v-card-title>Brief Description of Property </v-card-title>
            <v-textarea
              readonly
              disabled
              height="300"
              full-width
              auto-grow
              value="This is where there will be a big ol block of text and thats alright
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
              solo
            ></v-textarea>
            <v-card-title>Facts and Features </v-card-title>
            <v-textarea
              readonly
              disabled
              height="250"
              full-width="true"
              auto-grow
              value="This is where there will be a medium block of text and thats alright"
              solo
            ></v-textarea>
            <v-card-title>Additional Room Information </v-card-title>
            <v-textarea
              readonly
              disabled
              height="150"
              full-width="true"
              auto-grow
              value="This is where there will be a small block of text "
              solo
            ></v-textarea>
            <v-divider class="mx-4"></v-divider>
            <v-spacer></v-spacer
            ><v-card-title color="black" bold>Listing Details </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-title color="black" bold
              ><v-spacer></v-spacer>Listing Agency <v-spacer></v-spacer
            ></v-card-title>
            <v-spacer></v-spacer>
            <v-row>
              <v-spacer></v-spacer>Agency Name Here <v-spacer></v-spacer
            ></v-row>
            <v-row>
              <v-spacer></v-spacer>Agency Address Here <v-spacer></v-spacer
            ></v-row>
            <v-card-title color="black" bold
              ><v-spacer></v-spacer>Listing Agent <v-spacer></v-spacer
            ></v-card-title>
            <v-spacer></v-spacer>
            <v-row>
              <v-spacer></v-spacer>Agent Name Here <v-spacer></v-spacer
            ></v-row>
            <v-row>
              <v-spacer></v-spacer>AgentName@freerealestate.com
              <v-spacer></v-spacer
            ></v-row>
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'DetailedListing',
  setup() {},
  data: () => ({}),
})
</script>
