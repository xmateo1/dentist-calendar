<template>
  <div class="container">
    <client-only>
      <vue-cal
        ref="vuecal"
        :disable-views="['years', 'year', 'month', 'day']"
        :hide-title-bar="true"
        :time-from="config.firstHour * 60"
        :time-to="config.lastHour * 60"
        :time-step="config.minutePerSlot"
        :events="events"
        :start-week-on="startDay"
        :disable-dates="disabledDates"
        disable-dates-class="muted"
        locale="hr"
        @cell-click="cellAction"
        @event-focus="onEventFocus"
      />
    </client-only>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import moment from 'moment'
import 'vue-cal/dist/i18n/hr.js'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    VueCal
  },
  data: () => ({
    userClass: 'user',
    eventFocus: false
  }),
  computed: {
    events() {
      return this.$store.state.events
    },
    config() {
      return this.$store.state.config
    },
    startDay() {
      return this.$store.state.startDay
    },
    disabledDates() {
      return this.$store.getters.getDisabledDates(this.userClass)
    }
  },
  methods: {
    async cellAction(selectedDate) {
      if (this.eventFocus) return false
      console.log(this.eventFocus)
      const isDate = selectedDate instanceof Date
      if (!isDate) return false
      const minuteDifference =
        selectedDate.getMinutes() % this.config.minutePerSlot
      const closestSlot = moment(selectedDate)
        .add(-minuteDifference, 'minutes')
        .toDate()
      // search for existing events at the same time
      const concurringEvents = this.$store.getters.getEventsByDate(closestSlot)
      const isDisabled = this.$store.getters
        .getDisabledDates(this.userClass)
        .filter(
          (event) =>
            event.getFullYear() === closestSlot.getFullYear() &&
            event.getMonth() === closestSlot.getMonth() &&
            event.getDate() === closestSlot.getDate()
        ).length
      if (concurringEvents.length === 0) {
        if (!isDisabled) {
          const event = {
            start: closestSlot,
            end: moment(closestSlot)
              .add(this.config.minutePerSlot, 'minutes')
              .toDate(),
            title: this.config.userSlotTitle,
            class: this.userClass
          }
          await this.$store.dispatch('ADD_EVENT', { event })
        }
      }
    },
    async onEventFocus(event) {
      if (event.class === this.userClass) {
        this.eventFocus = true
        await this.$store.dispatch('REMOVE_EVENT', { event })
        const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m))
        await sleep(300)
        this.eventFocus = false
      }
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
.vuecal__menu {
  display: none;
}
.vuecal__cell--selected {
  background: none;
}
.closed .vuecal__event-time,
.booked .vuecal__event-time {
  display: none;
}
.closed {
  background: rgba(227, 227, 227, 0.4);
  font-weight: bold;
  cursor: not-allowed;
  border-radius: 0.5em;
  padding-top: 0.7em;
}
.break {
  background: rgb(255, 205, 110);
  border-radius: 0.5em;
  cursor: not-allowed;
}
.booked {
  background: rgb(249, 143, 138);
  color: white;
  border-radius: 0.5em;
  cursor: not-allowed;
  padding-top: 0.7em;
}
.muted {
  cursor: not-allowed;
}
.user {
  background: rgb(0, 128, 134);
  color: white;
  border-radius: 0.5em;
  cursor: pointer !important;
}
.vuecal__event {
  font-size: 0.9em;
}
.vuecal__cell:not(.muted) {
  cursor: pointer;
}
.muted .closed,
.muted .booked,
.muted .break {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
