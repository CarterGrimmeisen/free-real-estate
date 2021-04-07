<template>
  <v-dialog
    :value="active"
    width="400"
    @input="(val) => $emit('update:active', val)"
  >
    <v-card class="mx-auto rounded-xl" max-width="400" outlined>
      <v-window v-model="showing" touchless>
        <v-window-item>
          <v-form @submit.prevent="onSubmit">
            <v-list-item three-line>
              <v-list-item-content>
                <v-row class="headline mb-1">
                  <v-col> Login </v-col>
                  <v-spacer />
                  <v-col align-self="start">
                    <v-btn small text color="primary" @click="showing = 1">
                      OR REGISTER
                    </v-btn>
                  </v-col>
                </v-row>
                <v-expand-transition>
                  <v-alert v-if="loginError" type="error" dense>
                    {{ loginError }}
                  </v-alert>
                </v-expand-transition>
                <v-list-item-content>
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
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn block color="primary" type="submit"> Login </v-btn>
            </v-card-actions>
          </v-form>
        </v-window-item>
        <v-window-item>
          <v-form>
            <v-list-item three-line @submit="onSubmit">
              <v-list-item-content>
                <v-container>
                  <v-row class="headline mb-1">
                    <v-col> Register </v-col>
                    <v-spacer />
                    <v-col align-self="start">
                      <v-btn small text color="primary" @click="showing = 0">
                        OR LOGIN
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-expand-transition>
                    <v-alert v-if="registerError" type="error" dense>
                      {{ registerError }}
                    </v-alert>
                  </v-expand-transition>
                  <v-row>
                    <v-text-field
                      filled
                      label="Name"
                      hide-details="auto"
                      class="mb-4"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      filled
                      label="Email Address"
                      type="email"
                      hide-details="auto"
                      class="mb-4"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field filled label="Password" hide-details="auto" />
                  </v-row>
                  <v-row justify="end">
                    <v-switch
                      v-model="registerAgent"
                      label="Register as an Agent"
                    ></v-switch>
                  </v-row>
                  <template v-if="registerAgent">
                    <v-row>
                      <v-text-field
                        filled
                        label="Phone Number"
                        hide-details="auto"
                        class="mb-4"
                      />
                    </v-row>
                    <v-row>
                      <v-text-field
                        filled
                        label="Agency Code"
                        hide-details="auto"
                        class="mb-4"
                        hint="If this is for an Agent Account please enter your company
        code"
                      />
                    </v-row>
                  </template>
                </v-container>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn block color="primary" type="submit"> Register </v-btn>
            </v-card-actions>
          </v-form>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useUser } from '~/hooks/api'
import { useAuth } from '~/hooks/api/auth'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  setup(_props, ctx) {
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
