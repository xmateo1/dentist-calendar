<template>
  <div class="container">
    <client-only>
      <vue-cal
        :disable-views="['years', 'year', 'month', 'day']"
        :hide-title-bar="true"
        :time-from="config.firstHour * 60"
        :time-to="config.lastHour * 60"
        :time-step="config.minutePerSlot"
        :events="events"
        :start-week-on="startDay"
      />
    </client-only>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
  components: {
    VueCal
  },
  computed: {
    events() {
      return this.$store.state.events
    },
    config() {
      return this.$store.state.config
    },
    startDay() {
      return this.$store.state.startDay
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  height: 100vh;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.vuecal__cell-content {
  cursor: pointer;
}
.vuecal__menu {
  display: none;
}
.closed {
  background: rgba(140, 140, 120, 0.15);
}
.break {
  background: rgba(240, 180, 50, 0.3);
}
.vuecal__cell--selected {
  background: none;
}
.closed .vuecal__event-time {
  display: none;
}
</style>
