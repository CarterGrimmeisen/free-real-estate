<!-- GenerateDocuments.vue -->
<template>
  <!-- <Nuxt /> -->
  <div class="container">
    <div>
      <!-- <Logo /> -->

      <!-- start of second grid -->

      <v-container class="grey lighten-5" fluid>
        <v-row>
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
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                  width="230"
                  @click.native="selectPDF = 'closing'"
                >
                  Closing Disclosure
                  <v-icon dark right> mdi-garbage </v-icon>
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                  width="230"
                  @click.native="selectPDF = 'purchase'"
                >
                  Purchase Agreement
                  <v-icon dark right> mdi-garbage </v-icon>
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                  width="230"
                  @click.native="selectPDF = 'repair'"
                >
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
          <v-col>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-card class="pa-2" width="1150" outlined title>
                  <v-card-title>Document Preview</v-card-title>
                  <v-divider class="mx-4"></v-divider>

                  <v-row>
                    <v-col>
                      <v-card-text>
                        <h1 v-if="selectPDF == 'closing'">
                          Closing Disclosure
                        </h1>
                        <h1 v-else-if="selectPDF == 'purchase'">
                          Purchase Agreement
                        </h1>
                        <h1 v-else-if="selectPDF == 'repair'">
                          Request Repair
                        </h1>
                        <h1 v-else>No Form Selected</h1>
                      </v-card-text>
                    </v-col>
                    <v-col>
                      <v-card-actions>
                        <v-btn
                          v-if="selectPDF != 'none'"
                          class="ma-2"
                          color="primary"
                          dark
                        >
                          Download
                          <v-icon dark right> </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <iframe
                  v-if="selectPDF == 'closing'"
                  height="800"
                  width="100%"
                  src="/ClosingDisclosure.pdf#toolbar=0&navpanes=0"
                />
                <iframe
                  v-else-if="selectPDF == 'purchase'"
                  height="800"
                  width="100%"
                  src="/PurchaseAgreement.pdf#toolbar=0&navpanes=0"
                />
                <iframe
                  v-else-if="selectPDF == 'repair'"
                  height="800"
                  width="100%"
                  src="/RepairRequest.pdf#toolbar=0&navpanes=0"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import {useFiles} from '~/hooks/api'
// import {DocType} from '~/api/api'

export default defineComponent({
  //  name: 'GenerateDocuments',
  setup() {
    // const selectPDF:DocType | null = null;
    // const {createFile} = useFiles();

    // const generateDocument = async () => {
    //   if (selectPDF !== null) {await createFile({}, {type: 'DOCUMENT'}, {docType: selectPDF});}
    // }

    const selectPDF = 'none'
    return {
      selectPDF,
    }
  },
})
</script>
