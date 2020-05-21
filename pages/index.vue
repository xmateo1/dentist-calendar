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
        locale="hr"
      />
    </client-only>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/hr.js'
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
  background: rgba(189, 189, 187, 0.27);
}
.break {
  background: rgb(255, 239, 0);
}
.booked {
  background: rgb(255, 18, 118);
  color: white;
}
.booked.vuecal__event {
  padding-top: 0.7em;
}
.closed.vuecal__event {
  padding-top: 0.7em;
}
.vuecal__event {
  font-size: 0.9em;
}
.vuecal__cell--selected {
  background: none;
}
.closed .vuecal__event-time,
.booked .vuecal__event-time {
  display: none;
}
</style>
