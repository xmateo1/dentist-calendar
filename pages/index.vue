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
        locale="hr"
        @cell-click="cellAction"
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
  },
  methods: {
    async cellAction(selectedDate) {
      const userClass = 'user'
      const minuteDifference =
        selectedDate.getMinutes() % this.config.minutePerSlot
      const closestSlot = moment(selectedDate)
        .add(-minuteDifference, 'minutes')
        .toDate()
      // search for existing events at the same time
      const concurringEvents = this.$store.getters.getEventsByDate(closestSlot)
      if (concurringEvents.length === 0) {
        /* this.$refs.vuecal.createEvent(closestSlot, this.config.minutePerSlot, {
          title: 'moj termin',
          class: 'user'
        }) */
        const event = {
          start: closestSlot,
          end: moment(closestSlot)
            .add(this.config.minutePerSlot, 'minutes')
            .toDate(),
          title: this.config.userSlotTitle,
          class: userClass
        }
        await this.$store.dispatch('ADD_EVENT', { event })
      } else if (concurringEvents[0].class === userClass) {
        const event = concurringEvents[0]
        await this.$store.dispatch('REMOVE_EVENT', { event })
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
.user.vuecal__event {
  background: rgb(81, 18, 255);
  color: white;
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
