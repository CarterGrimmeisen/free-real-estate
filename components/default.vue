<template>
  <NavigationBar />
  <!--<Nuxt /> -->
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  name: 'HelloWorld',
  components: { NavigationBar },
  data: () => ({
    seasons: ['0', '100k', '150k', '200k', '250k', '300k+'],
    sqrt: ['0+', '1000', '2000', '3000+'],
  }),
}
</script>
