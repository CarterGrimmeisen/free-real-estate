<!-- Detailed Listing -->
<template>
  <div>
    <div>
      <v-container justify-center>
        <v-row>
          <v-col>
            <DeleteListing />
          </v-col>
        </v-row>
        <v-card class="pa-2" outlined title>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-btn class="ma-2" color="primary" dark>
            Save Changes
            <v-icon dark right to="/listings/example"> mdi-star</v-icon>
          </v-btn>
          <v-card-title class="primary--text"> Property Address </v-card-title>
          <v-card-title class="primary--text">
            <v-text-field
              label="Street"
              hint="Street the property is on"
              outlined
            >
            </v-text-field>
            <v-spacer />
            <v-text-field
              label="City"
              hint="City the property is in"
              outlined
            ></v-text-field>
            <v-spacer />
            <v-text-field
              label="State"
              hint="State the property is in"
              outlined
            ></v-text-field>
            <v-spacer />
            <v-text-field
              label="Zipcode"
              hint="Zipcode for the area"
              outlined
            ></v-text-field>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>

          <ImageEditor />

          <v-divider class="mx-4"></v-divider>

          <v-card-title bold class="primary--text"
            >Edit Property Details
          </v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-row justify="space-around" no-gutters>
            <v-col
              ><v-card-title>
                <v-text-field
                  label="Listing Price"
                  hint="Listing price of the property"
                  outlined
                >
                </v-text-field></v-card-title
            ></v-col>
            <v-col
              ><v-card-title
                ><v-text-field
                  label="Square Feet"
                  hint="Square footage of the property"
                  outlined
                >
                </v-text-field></v-card-title
            ></v-col>
            <v-col
              ><v-card-title
                ><v-text-field
                  label="MLS #"
                  hint="MLS # of the property"
                  outlined
                >
                </v-text-field></v-card-title
            ></v-col>
          </v-row>

          <v-row no-gutters>
            <v-card-title class="primary--text"
              >Housing Association</v-card-title
            >
            <v-radio-group row>
              <v-radio label="There is an HOA" value="true"></v-radio>
              <v-radio label="There is NOT an HOA" value="false"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row no-gutters>
            <v-card-title class="primary--text">Subdivision</v-card-title>
            <v-radio-group row>
              <v-radio
                label="Property is in a subdivision"
                value="true"
              ></v-radio>
              <v-radio
                label="Property is NOT in a subdivision"
                value="false"
              ></v-radio>
            </v-radio-group>
          </v-row>

          <v-row>
            <v-col>
              <v-card-title class="primary--text">Current Schools</v-card-title>
            </v-col>
            <v-col> <AddSchool /></v-col>
          </v-row>
          <v-row no-gutters justify="space-around">
            <v-col>
              <v-card-title>
                <v-textarea
                  name="schools"
                  outlined
                  auto-grow
                  value="Schools"
                  hint="Schools zoned for the property"
                ></v-textarea>
              </v-card-title>
            </v-col>
          </v-row>

          <v-card-title class="primary--text"
            >Brief Description of Property
          </v-card-title>
          <v-row no-gutters>
            <v-col>
              <v-card-title>
                <v-textarea
                  auto-grow
                  value="This is where there will be a big ol block of text and thats alright
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
          ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
                  outlined
                  hint="A lengthy description of the property"
                ></v-textarea>
              </v-card-title>
            </v-col>
          </v-row>

          <v-card-title class="primary--text">Facts and Features </v-card-title>
          <v-row no-gutters>
            <v-col>
              <v-card-title>
                <v-textarea
                  auto-grow
                  value="This is where there will be a medium block of text and thats alright"
                  outlined
                  hint="Additional facts and features relevant to the property"
                ></v-textarea>
              </v-card-title>
            </v-col>
          </v-row>

          <v-card-title class="primary--text"
            >Additional Room Information
          </v-card-title>
          <v-row no-gutters>
            <v-col>
              <v-card-title>
                <v-textarea
                  auto-grow
                  value="This is where there will be a small block of text "
                  outlined
                  hint="Additional room information relevant to the property"
                ></v-textarea>
              </v-card-title>
            </v-col>
          </v-row>
          <v-divider class="mx-4"></v-divider>
          <v-spacer></v-spacer
          ><v-card-title class="primary--text" bold
            >Agency Details
          </v-card-title>
          <v-divider class="mx-4"></v-divider>

          <v-row>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agency Name"
                  hint="Agency Name"
                  value="database entry"
                  outlined
                >
                </v-text-field
              ></v-card-title>
            </v-col>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agency Street"
                  hint="Street the agency is on"
                  value="database entry"
                  outlined
                >
                </v-text-field
              ></v-card-title>
            </v-col>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agency City"
                  hint="City the agency is in"
                  value="database entry"
                  outlined
                ></v-text-field
              ></v-card-title>
            </v-col>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agency State"
                  hint="State the agency is in"
                  value="database entry"
                  outlined
                ></v-text-field
              ></v-card-title>
            </v-col>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agency Zipcode"
                  hint="Zipcode for the agency"
                  value="database entry"
                  outlined
                ></v-text-field
              ></v-card-title>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agent Name"
                  hint="Name of agent in charge of property"
                  value="database entry"
                  outlined
                ></v-text-field
              ></v-card-title>
            </v-col>

            <v-col>
              <v-card-title>
                <v-text-field
                  label="Agent Email"
                  hint="The email of the agent to contact regarding the property"
                  value="database entry"
                  outlined
                ></v-text-field
              ></v-card-title>
            </v-col>
          </v-row>

          <v-divider /> <v-spacer />
          <v-card-title>Home Alarm Information </v-card-title>
          <v-divider />
          <v-row align="center" justify="center">
            <v-col>
              <v-card-title>
                <v-checkbox label="Occupied" outlined dense></v-checkbox>
              </v-card-title>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col>
              <v-card-title>
                <v-text-field
                  label="Lockbox Code"
                  hint="Enter lockbox code"
                  value="#######"
                  outlined
                ></v-text-field></v-card-title
            ></v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'DetailedListing',
  setup() {
    const { $auth } = useContext()

    return { $auth }
  },
  data: () => ({}),
})
</script>
