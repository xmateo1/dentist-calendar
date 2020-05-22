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
      .add(1, 'days')
      .toDate() // tomorrow
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
