<template>
  <v-dialog
    :value="active"
    width="400"
    class="rounded-xl"
    @input="(val) => $emit('update:active', val)"
  >
    <v-card class="mx-auto rounded-xl" width="400" outlined>
      <v-form @submit="onSubmit">
        <v-card-title>
          {{ showing ? 'Register' : 'Login' }}
          <v-spacer />

          <v-btn
            small
            text
            color="primary align-self-end"
            @click="() => (showing = showing * -1 + 1)"
          >
            OR {{ showing ? 'LOGIN' : 'REGISTER' }}
          </v-btn>
        </v-card-title>

        <v-expand-transition v-if="showing">
          <v-alert v-if="registerError" type="error" dense>
            {{ registerError }}
          </v-alert>
        </v-expand-transition>

        <v-expand-transition v-else>
          <v-alert v-if="loginError" type="error" dense>
            {{ loginError }}
          </v-alert>
        </v-expand-transition>
        <v-card-text>
          <v-window v-model="showing" touchless>
            <v-window-item>
              <v-text-field
                v-model="email"
                filled
                label="Email Address"
                hide-details="auto"
                class="mb-4"
              />
              <v-text-field
                v-model="password"
                filled
                label="Password"
                hide-details="auto"
                type="password"
              />
            </v-window-item>
            <v-window-item>
              <v-text-field
                filled
                label="Name"
                hide-details="auto"
                class="mb-4"
              />
              <v-text-field
                filled
                label="Email Address"
                type="email"
                hide-details="auto"
                class="mb-4"
              />
              <v-text-field filled label="Password" hide-details="auto" />
              <v-row class="mt-1">
                <v-spacer />
                <v-switch
                  v-model="registerAgent"
                  label="Register as an Agent"
                />
              </v-row>
              <template v-if="registerAgent">
                <v-text-field
                  filled
                  label="Phone Number"
                  hide-details="auto"
                  class="mt-1 mb-4"
                />
                <v-text-field
                  filled
                  label="Agency Code"
                  hide-details="auto"
                  class="mb-4"
                  hint="If this is for an Agent Account please enter your company code"
                />
              </template>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions>
          <v-btn block color="primary" type="submit" rounded="xl">
            {{ showing ? 'Register' : 'Login' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useUser } from '~/hooks/api'
import { useAuth } from '~/hooks/api/auth'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    const { login, register } = useAuth()
    const { getUser } = useUser()

    const { $auth } = useContext()

    const showing = ref<0 | 1>(0)
    const email = ref('')
    const password = ref('')
    const name = ref('')

    const registerAgent = ref(false)
    const phoneNo = ref('')
    const agencyCode = ref('')

    const loginError = ref('')
    const registerError = ref('')

    function reset() {
      showing.value = 0
      email.value = ''
      password.value = ''
      name.value = ''

      loginError.value = ''
      registerError.value = ''
    }

    watch(props, (props) => {
      if (!props.active) reset()
    })

    const onSubmit = async () => {
      if (showing.value === 0) {
        const { success } = await login(
          {},
          {
            email: email.value,
            password: password.value,
          }
        ).catch((e) => {
          loginError.value = e.message
          return { success: false }
        })

        if (success) {
          $auth.value.loggedin = true
          $auth.value.user = await getUser()
          ctx.emit('update:active', false)
          reset()
        }
      } else {
        const { success } = await register(
          {},
          {
            name: name.value,
            email: email.value,
            password: password.value,
          }
        ).catch((e) => {
          registerError.value = e.message
          return { success: false }
        })

        if (success) {
          ctx.emit('update:active', false)
          reset()
        }
      }
    }

    return {
      showing,
      email,
      password,
      name,
      loginError,
      registerError,
      onSubmit,
      registerAgent,
      phoneNo,
      agencyCode,
    }
  },
})
</script>
