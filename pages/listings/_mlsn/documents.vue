<!-- GenerateDocuments.vue -->
<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="12" lg="2">
        <v-card>
          <v-card-title class="text--primary">Select PDF Type</v-card-title>

          <v-divider />

          <v-list rounded>
            <v-list-item-group v-model="pdfType" mandatory color="primary">
              <v-list-item value="ClosingDisclosure">
                <v-list-item-icon>
                  <v-icon>mdi-close-circle-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Closing Disclosure </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item value="PurchaseAgreement">
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Purchase Agreement </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item value="RepairRequest">
                <v-list-item-icon>
                  <v-icon>mdi-hammer-wrench</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Repair Request </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-card-text>
            <v-btn color="primary" block @click="generateDocument">
              Download
              <v-icon right>mdi-download</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="10">
        <v-container fluid class="fill-height pt-0">
          <v-row class="fill-height" no-gutters wrap>
            <v-col cols="12">
              <v-alert type="info" dense class="mb-1">
                This is only a preview of the final document. Click download to
                view the final version
              </v-alert>
            </v-col>
            <iframe
              v-if="pdfType === 'ClosingDisclosure'"
              height="98%"
              width="100%"
              src="/ClosingDisclosure.pdf#toolbar=0&navpanes=0"
            />
            <iframe
              v-else-if="pdfType === 'PurchaseAgreement'"
              height="98%"
              width="100%"
              src="/PurchaseAgreement.pdf#toolbar=0&navpanes=0"
            />
            <iframe
              v-else-if="pdfType === 'RepairRequest'"
              height="98%"
              width="100%"
              src="/RepairRequest.pdf#toolbar=0&navpanes=0"
            />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
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
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import { saveAs } from 'file-saver'
import { DocType } from '~/api/api'
import { useFiles } from '~/hooks/api'
// import {useFiles} from '~/hooks/api'
// import {DocType} from '~/api/api'

export default defineComponent({
  //  name: 'GenerateDocuments',
  setup() {
    const $route = useRoute()
    const pdfType = ref<DocType>('ClosingDisclosure')
    const { genPDF } = useFiles()

    const generateDocument = async () => {
      const blob: Blob = await genPDF(
        {},
        { mlsn: $route.value.params.mlsn },
        { type: pdfType.value }
      )

      saveAs(blob, `${pdfType.value}.pdf`)
    }

    return {
      pdfType,
      generateDocument,
    }
  },
})
</script>
