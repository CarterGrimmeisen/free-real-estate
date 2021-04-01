import { withKnobs, boolean } from '@storybook/addon-knobs'

import Auth from './Auth.vue'

export default {
  title: 'Auth',
  component: Auth,
  decorators: [withKnobs, '<v-app><story/></v-app>'],
}

export const Default = () => ({
  name: 'Default',
  components: { Auth },
  props: {
    active: {
      type: Boolean,
      default: boolean('active', true),
    },
  },
  template: `<Auth :active="active" />`,
})
