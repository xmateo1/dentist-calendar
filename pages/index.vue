<template>
  <div class="container">
    <client-only>
      <vue-cal :start-week-on="new Date(2020, 22, 5, 12, 0, 0, 0)" />
    </client-only>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
  components: {
    VueCal
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
