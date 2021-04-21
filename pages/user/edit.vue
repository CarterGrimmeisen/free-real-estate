<!--EditAccount.vue-->
<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title class="text--primary">Edit Account</v-card-title>

      <v-expand-transition>
        <v-alert v-if="error">{{ error }}</v-alert>
      </v-expand-transition>

      <v-card-title>Name:</v-card-title>
      <v-card-text>
        <v-text-field
          v-if="$auth.user"
          id="name"
          v-model="name"
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          :placeholder="$auth.user.name"
          background-color="tertiary"
          class="shrink mb-4"
          append-icon="mdi-pen"
        />
      </v-card-text>

      <v-card-title>Email:</v-card-title>
      <v-card-text>
        <v-text-field
          v-if="$auth.user"
          v-model="email"
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          :placeholder="$auth.user.email"
          background-color="tertiary"
          class="shrink mb-4"
          append-icon="mdi-pen"
        />
      </v-card-text>

      <v-card-title>New Password:</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="password"
          color="black"
          hide-details
          v.length="25"
          single-line
          outlined
          type="password"
          placeholder="new password"
          background-color="tertiary"
          class="shrink"
          append-icon="mdi-pen"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn class="ma-2" color="primary" dark to="/user" exact>
          Cancel
          <v-icon dark right>mdi-close</v-icon>
        </v-btn>
        <v-btn class="ma-2" color="primary" dark @click="update()">
          Save
          <v-icon dark right>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import { useUser } from '~/hooks/api'

export default defineComponent({
  name: 'EditAccount',
  setup() {
    const { $auth } = useContext()
    const { updateUser } = useUser()
    const $router = useRouter()

    const name = ref($auth.value.user!.name)
    const email = ref($auth.value.user!.email)
    const password = ref('')
    const error = ref('')

    const update = async () => {
      const updator: any = {}
      if (name.value !== '') updator.name = name.value
      if (email.value !== '') updator.email = email.value
      if (password.value !== '') updator.password = password.value

      const user = await updateUser(
        { id: $auth.value.user?.id },
        updator
      ).catch((e) => {
        error.value = e.message
        return null
      })

      if (user === null) return

      $auth.value.user!.name = name.value
      $auth.value.user!.email = email.value

      $router.replace('./')
    }

    return { $auth, update, name, email, password, error }
  },
})
</script>
