import moment from 'moment'
import config from './app.config'
import slots from './slots'

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

export const getters = {
  getEventsByDate: (state) => (start) => {
    return state.events.filter(
      // events with same or earlier start and ending after start
      (event) => +event.start <= +start && +event.end > +start
    )
  }
}
