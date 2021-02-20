<template>
 <Homebar />
 <!--<Nuxt /> -->
</template>

<script>
import Homebar from '~/components/Homebar.vue';
export default {
  components: { Homebar },
  name: "HelloWorld",
  data: () => ({
    seasons: ["0", "100k", "150k", "200k", "250k", "300k+"],
    sqrt: ["0+", "1000", "2000", "3000+"]
  }),
};
</script>
