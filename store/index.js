import moment from 'moment'
import config from './app.config'
import slots from './slots'

// =================================================
// State
// =================================================
export const state = () => {
  const s = {
    events: [].concat(
      slots.booked.events,
      slots.breaks.events,
      slots.closed.events
    ),
    config,
    startDay: moment()
      .add(config.startDayOffset, 'days')
      .toDate()
  }
  return s
}

// =================================================
// Getters
// =================================================
export const getters = {
  getEventsByDate: (state) => (start) => {
    return state.events.filter(
      // events with same or earlier start and ending after start
      (event) => +event.start <= +start && +event.end > +start
    )
  },
  getEventsByDay: (state) => (date, eventClass) => {
    return state.events.filter(
      // events with same or earlier start and ending after start
      (event) =>
        event.start.getFullYear() === date.getFullYear() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getDate() === date.getDate() &&
        event.class === eventClass
    )
  },
  getDisabledDates: (state) => (eventClass) => {
    const dayRule = []
    for (
      let i = 0 + state.config.startDayOffset;
      i < state.config.generatedDays + state.config.startDayOffset;
      i++
    ) {
      const date = moment()
        .add(i, 'days')
        .toDate()
      const eventsOnThisDay = state.events.filter(
        (event) =>
          event.start.getFullYear() === date.getFullYear() &&
          event.start.getMonth() === date.getMonth() &&
          event.start.getDate() === date.getDate() &&
          event.class === eventClass
      )
      if (eventsOnThisDay.length >= state.config.maxUserSlotsPerDay) {
        eventsOnThisDay.forEach((event) => dayRule.push(event.start))
      }
    }
    const weekRule = []
    for (let i = 0; i < Math.ceil(state.config.generatedDays / 7) + 1; i++) {
      const date = moment(state.startDay)
        .add(i, 'weeks')
        .toDate()
      const weekNumber = moment(date).isoWeek()
      const year = date.getFullYear()
      const eventsOnThisWeek = state.events.filter(
        (event) =>
          event.start.getFullYear() === year &&
          moment(event.start).isoWeek() === weekNumber &&
          event.class === eventClass
      )
      if (eventsOnThisWeek.length >= state.config.maxUserSlotsPerWeek) {
        for (let i = 0; i < 7; i++) {
          weekRule.push(
            moment(year, 'YYYY')
              .isoWeek(weekNumber)
              .startOf('isoWeek')
              .add(i, 'days')
              .toDate()
          )
        }
      }
    }
    return [].concat(dayRule, weekRule)
  }
}

// =================================================
// Mutations
// =================================================
export const mutations = {
  ADD_EVENT: (state, { event }) => {
    state.events.push(event)
  },
  REMOVE_EVENT: (state, { event }) => {
    for (let i = 0; i < state.events.length; i++) {
      if (
        +state.events[i].start === +event.start &&
        state.events[i].class === event.class
      ) {
        state.events.splice(i, 1)
        break
      }
    }
  }
}

// =================================================
// Actions
// =================================================
export const actions = {
  ADD_EVENT({ commit, state }, { event }) {
    commit('ADD_EVENT', { event })
  },
  REMOVE_EVENT({ commit, state }, { event }) {
    commit('REMOVE_EVENT', { event })
  }
}
