import moment from 'moment'
import config from '../app.config'
import days from '../days'

const events = []

for (let i = 1; i < 8; i++) {
  const dayOfWeek = moment()
    .add(i, 'days')
    .day()
  const isOdd = dayOfWeek % 2 !== 0
  const s = isOdd ? config.shift.odd : config.shift.even

  // get day name as string
  const day = days[dayOfWeek]

  // business day
  if (s.days.includes(day)) {
    events.push({
      start: moment('00:00', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment(s.start, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: config.closedTitle,
      class: 'closed'
    })
    events.push({
      start: moment(s.end, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: config.closedTitle,
      class: 'closed'
    })
    // non-business day
  } else {
    events.push({
      start: moment('00:00', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: config.closedTitle,
      class: 'closed'
    })
  }
}

export default {
  events
}
