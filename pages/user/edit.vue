<!--EditAccount.vue-->
<template>
  <v-card class="mx-auto my-12" max-width="1000" width="1000">
    <v-card-title>Edit Account</v-card-title>
    <p>{{ success }}</p>
    <v-card-text>
      <v-card-title>Name:</v-card-title>
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

      <v-card-title>Email:</v-card-title>
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

      <v-card-title>New Password:</v-card-title>

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
      ></v-text-field>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn class="ma-2" color="primary" dark to="/user">
        Cancel
        <v-icon dark right>mdi-close</v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark @click="update()">
        Save
        <v-icon dark right>mdi-content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { useUser } from '~/hooks/api'

export default defineComponent({
  name: 'EditAccount',
  setup() {
    const { $auth } = useContext()
    const { updateUser } = useUser()

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const success = ref('')

    const update = async () => {
      const updator: any = {}
      if (name.value !== '') updator.name = name.value
      if (email.value !== '') updator.email = email.value
      if (password.value !== '') updator.password = password.value

      const user = await updateUser(
        { id: $auth.value.user?.id },
        updator
      ).catch((e) => {
        success.value = e.message
      })

      if (user !== null) success.value = 'Success!'

      return user
    }

    return { $auth, update, name, email, password, success }
  },
})
</script>
