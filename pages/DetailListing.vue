<template>

    <v-card class="pa-2" width="1500" height="2200" outlined title>
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>Street, City, State, Zipcode</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-layout max-height="4000" height="4000" ma-0 pa-0 outlined>
        <v-row no-gutters>
          <v-col no-gutters cols="6" md="4" height="650" max-height="650">
            <v-card class="pa-2" height="475">
              <v-img
                height="400"
                width="500"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-btn class="ma-2" color="primary" dark>
                Schedule Showing
                <v-icon dark right> mdi-calendar</v-icon>
              </v-btn>
            </v-card>
            
          </v-col>
          <v-col no-gutters cols="12" sm="6" md="8">
            <v-card class="pa-2" outlined tile height="475">
              <v-spacer></v-spacer>
              <v-row>
                <v-spacer></v-spacer>
        
                <v-spacer></v-spacer>
                <v-carousel hide-delimiters>
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    :src="item.src"
                    height="340"
                    max-height="480"
                    width="900"
                  ></v-carousel-item>
                </v-carousel>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>

      <v-card-text>
        <div class="text-left" size="14">
          <v-row>
            <v-card-title color="black">Listing Price: </v-card-title>
            <v-card-title>$$$,$$$ </v-card-title> <v-spacer></v-spacer>
            <v-card-title color="black">Square Feet: </v-card-title>
            <v-card-title>#,### </v-card-title> <v-spacer></v-spacer
            ><v-card-title color="black">MLS: </v-card-title>
            <v-card-title>####### </v-card-title> <v-spacer></v-spacer
          ></v-row>
          <v-divider class="mx-4"></v-divider>
          <v-spacer></v-spacer
          ><v-card-title color="black" bold>Property Details </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-row
            ><v-card-title color="black">HOA: </v-card-title>
            <v-card-title color="black">??? </v-card-title> <v-spacer></v-spacer
            ><v-card-title color="black">Subdivision: </v-card-title>
            <v-card-title color="black">Maybe, Maybe not </v-card-title>
            <v-spacer></v-spacer
            ><v-card-title color="black">School Zones: </v-card-title>
            <v-card-title color="black"
              >Elementry: Some school, Jr: Some schools, High: some
              school</v-card-title
            >
          </v-row>
        </div>
        <v-card-title color="black"
          >Brief Description of Property
        </v-card-title>
        <v-textarea
          readonly
          disabled
          height="300"
          full-width="true"
          auto-grow
          value="This is where there will be a big ol block of text and thats alright
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
          solo
        ></v-textarea>
        <v-card-title color="black">Facts and Features </v-card-title>
        <v-textarea
          readonly
          disabled
          height="250"
          full-width="true"
          auto-grow
          value="This is where there will be a medium block of text and thats alright"
          solo
        ></v-textarea>
        <v-card-title color="black">Additional Room Information </v-card-title>
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
          <v-card-title color="black">Home Alarm Information </v-card-title>
        <v-textarea
          readonly
          disabled
          height="50"
          full-width="true"
          auto-grow
          value="This is where there will be a small block of text "
          solo
        ></v-textarea>
        <v-divider class="mx-4"></v-divider>
          <v-spacer></v-spacer>
          
          <v-card-title color="black" bold>Listing Details </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title color="black" bold><v-spacer></v-spacer>Listing Agency <v-spacer></v-spacer></v-card-title>
          <v-spacer></v-spacer>
          <v-row> <v-spacer></v-spacer>Agency Name Here <v-spacer></v-spacer></v-row>
          <v-row> <v-spacer></v-spacer>Agency Address Here <v-spacer></v-spacer></v-row>
          <v-card-title color="black" bold><v-spacer></v-spacer>Listing Agent <v-spacer></v-spacer></v-card-title>
          <v-spacer></v-spacer>
          <v-row> <v-spacer></v-spacer>Agent Name Here <v-spacer></v-spacer></v-row>
          <v-row> <v-spacer></v-spacer>AgentName@freerealestate.com <v-spacer></v-spacer></v-row>
          <v-row> <v-spacer></v-spacer>(###)###-#### <v-spacer></v-spacer></v-row>
      </v-card-text>
<v-btn class="ma-2" color="primary" dark to="/managelistings">
                Exit
              </v-btn> 
      <v-card-actions> </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DetailedListing',
  data: () => ({
    seasons: ['0', '100k', '150k', '200k', '250k', '300k+'],
    sqrt: ['0+', '1000', '2000', '3000+'],
    alignments: ['start', 'center', 'end'],
    items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
  }),

  setup() {},
})
</script>