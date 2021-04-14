<template>
  <v-card outlined>
    <v-card-title class="primary--text">
      <template v-if="listing">
        {{ listing.street }} {{ listing.city }}, {{ listing.state }}
        {{ listing.zipcode }}
      </template>
      <template v-else> New Listing </template>
      <v-spacer />
      <v-btn class="ma-2" color="primary" dark @click="save">
        Save Changes
        <v-icon dark right> mdi-content-save </v-icon>
      </v-btn>

      <DeleteListing v-if="listing" @confirm="$emit('delete')" />
    </v-card-title>
    <v-divider />
    <v-card-text class="primary--text">
      <ImageUploader
        :listing="listingEdit"
        :images="images || listing.files || []"
        @addImage="addImage"
        @removeImage="removeImage"
        @removeLocalImage="removeLocalImage"
      />
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-card-title bold class="primary--text">
        Edit Property Details
      </v-card-title>

      <v-row class="px-3">
        <v-col>
          <v-text-field
            v-model="listingEdit.street"
            label="Street"
            hint="Street the property is on"
            filled
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="listingEdit.city"
            label="City"
            hint="City the property is in"
            filled
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="listingEdit.state"
            label="State"
            hint="State the property is in"
            filled
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="listingEdit.zipcode"
            label="Zipcode"
            hint="Zipcode for the area"
            filled
            type="number"
          />
        </v-col>
      </v-row>

      <v-row class="px-3">
        <v-col>
          <v-text-field
            v-model.number="listingEdit.price"
            label="Listing Price"
            hint="Listing price of the property"
            filled
            type="number"
            prefix="$"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="listingEdit.sqfootage"
            label="Square Feet"
            hint="Square footage of the property"
            filled
            type="number"
            suffix="sq. ft."
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="listingEdit.mlsn"
            :disabled="listing !== null"
            label="MLS #"
            hint="MLS # of the property"
            filled
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col>
          <v-card-title class="primary--text">
            Housing Association
          </v-card-title>
          <v-checkbox
            v-model="listingEdit.hoa"
            label="There is an HOA"
            class="ml-3"
          />
        </v-col>
        <v-col>
          <v-card-title class="primary--text">Subdivision</v-card-title>
          <v-text-field
            v-model="listingEdit.subdivision"
            filled
            hint="Enter the name of the subdivision, if the listing is part of one"
            class="ml-4"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col>
          <v-card-title class="primary--text">Current Schools</v-card-title>
        </v-col>
      </v-row>
      <v-row v-if="listingEdit.schools" no-gutters class="px-3" wrap>
        <v-col
          v-for="(school, schoolNumber) in listingEdit.schools"
          :key="schoolNumber"
          cols="12"
        >
          <v-btn
            text
            icon
            rounded
            color="primary"
            @click="removeSchool(schoolNumber)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-label v-if="listingEdit.schools">
            School #{{ schoolNumber }}
            <v-row>
              <v-col>
                <v-text-field
                  v-model="listingEdit.schools[schoolNumber].name"
                  label="School Name"
                  filled
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="listingEdit.schools[schoolNumber].grades"
                  label="School Grade Range"
                  filled
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="listingEdit.schools[schoolNumber].type"
                  label="School Type"
                  filled
                />
              </v-col>
            </v-row>
          </v-label>
          <!-- TODO: Correctly display school type and name and support editing -->
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="addSchool">
            <v-icon left>mdi-plus</v-icon>
            Add School
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-card-title class="primary--text">
        Brief Description of Property
      </v-card-title>
      <v-row no-gutters class="px-3">
        <v-col>
          <v-textarea
            v-model="listingEdit.description"
            auto-grow
            height="300"
            filled
            hint="A lengthy description of the property"
          />
        </v-col>
      </v-row>

      <v-card-title class="primary--text">
        Additional Room Information
      </v-card-title>
      <v-row class="px-3">
        <v-col cols="1">
          <v-text-field
            v-model.number="listingEdit.bedrooms"
            filled
            type="number"
            label="Bedrooms"
          />
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model.number="listingEdit.bathrooms"
            filled
            type="number"
            label="Bathrooms"
          />
        </v-col>
      </v-row>
      <v-row v-if="listingEdit.rooms" no-gutters wrap class="mx-3">
        <v-col
          v-for="(room, roomNumber) in listingEdit.rooms"
          :key="roomNumber"
          cols="12"
        >
          <v-btn
            text
            icon
            rounded
            color="primary"
            @click="removeRoom(roomNumber)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-label v-if="listingEdit.rooms">
            Description for Room #{{ roomNumber + 1 }}
            <v-textarea
              v-model="listingEdit.rooms[roomNumber]"
              auto-grow
              filled
              hint="Additional room information relevant to the property"
            />
          </v-label>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="addRoom">
            <v-icon left>mdi-plus</v-icon>
            Add Room
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-card-title class="primary--text">Security Information</v-card-title>
      <v-row no-gutters class="px-3">
        <v-col>
          <v-checkbox
            v-model.number="listingEdit.occupied"
            label="Currently Occupied"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="px-3">
        <v-col>
          <v-label>
            Home Alarm Information
            <v-textarea
              v-model="listingEdit.alarmInfo"
              auto-grow
              filled
              hint="Lock box code, security system disarm code, etc."
            />
          </v-label>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-card-title class="primary--text" bold>Agency Details</v-card-title>

      <v-row class="px-3">
        <v-col>
          <v-text-field
            label="Agency Name"
            disabled
            :value="agent.agency.name"
            hide-details="auto"
            filled
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Agency Street"
            :value="agent.agency.address"
            disabled
            hide-details="auto"
            filled
          />
        </v-col>

        <v-col>
          <v-text-field
            label="Agent Name"
            :value="agent.name"
            disabled
            filled
          />
        </v-col>

        <v-col>
          <v-text-field
            label="Agent Email"
            hint="The email of the agent to contact regarding the property"
            :value="agent.email"
            disabled
            filled
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { File } from '@prisma/client'
import { HomeWithImage } from '~/api/api'

export default defineComponent({
  props: {
    listing: {
      type: Object as PropType<HomeWithImage>,
      default: null,
    },
    images: {
      type: Array as PropType<File[]>,
      default: null,
    },
  },

  setup(props, { emit }) {
    const { $auth } = useContext()

    const agent = ref(
      props.listing ? props.listing.agent : $auth.value.user!.agentProfile!
    )

    const listingEdit = ref<Partial<HomeWithImage>>({
      hoa: false,
      occupied: false,
      rooms: [],
      schools: [],
      files: [],
      subdivision: '',
      bedrooms: 0,
      bathrooms: 0,
      alarmInfo: '',
    })

    // const imagesEdit = ref<File[]>([])
    const addedImages = ref<File[]>([])
    const removedImages = ref<string[]>([])

    watch(
      props,
      () => {
        if (props.listing)
          listingEdit.value = JSON.parse(
            JSON.stringify(props.listing)
          ) as HomeWithImage

        if (!listingEdit.value.agent) listingEdit.value.agent = agent.value
      },
      { immediate: true }
    )

    const addRoom = () => {
      if (!listingEdit.value.rooms) listingEdit.value.rooms = []
      listingEdit.value.rooms.push('')
    }

    const removeRoom = (index: number) => {
      listingEdit.value.rooms!.splice(index, 1)
    }

    const addSchool = () => {
      if (!listingEdit.value.schools) listingEdit.value.schools = []
      listingEdit.value.schools.push({
        name: '',
        grades: '',
        type: '',
      })
    }

    const removeSchool = (index: number) => {
      listingEdit.value.schools!.splice(index, 1)
    }

    // const updateImages = (images: File[]) => {
    //   listingEdit.value.files = images
    // }

    const addImage = (file: File) => {
      addedImages.value.push(file)
    }

    const removeImage = (id: string) => {
      removedImages.value.push(id)
    }

    const removeLocalImage = (id: string) => {
      addedImages.value.splice(
        addedImages.value.findIndex((each) => each.id === id)
      )
    }

    const save = () => {
      emit('save', [listingEdit.value, addedImages.value, removedImages.value])
      addedImages.value = []
      removedImages.value = []
    }

    return {
      listingEdit,
      addedImages,
      removedImages,
      agent,
      addRoom,
      removeRoom,
      addSchool,
      removeSchool,
      addImage,
      removeImage,
      removeLocalImage,
      save,
    }
  },
})
</script>
