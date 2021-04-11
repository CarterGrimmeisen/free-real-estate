<!-- GenerateDocuments.vue -->
<template>
  <!-- <Nuxt /> -->
  <div class="container">
    <div>
      <!-- <Logo /> -->

      <!-- start of second grid -->

      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="6" md="4">
            <v-card height="400" width="256" class="mx-auto">
              <v-navigation-drawer permanent>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      Generate Documents
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-btn class="ma-2" color="primary" dark width="230">
                  Closing Disclosure
                  <v-icon dark right> mdi-garbage </v-icon>
                </v-btn>
                <v-divider></v-divider>
                <v-btn class="ma-2" color="primary" dark width="230">
                  Purchase Agreement
                  <v-icon dark right> mdi-garbage </v-icon>
                </v-btn>
                <v-divider></v-divider>
                <v-btn class="ma-2" color="primary" dark width="230">
                  Repair Request
                  <v-icon dark right> mdi-garbage </v-icon>
                </v-btn>
                <v-divider></v-divider>
                <v-list dense nav>
                  <!-- <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card class="pa-2" width="1150" height="700" outlined title>
              <v-img></v-img>

              <v-card-title>Document Preview</v-card-title>
              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <div class="text-left" size="14">
                  <v-card-text>
                    This is where I want the document preview
                  </v-card-text>
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-btn class="ma-2" color="primary" dark>
                  Download
                  <v-icon dark right> </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GenerateDocuments',
  setup() {},
})
</script>
