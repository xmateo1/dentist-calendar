import moment from 'moment'
import config from './app.config'

// js standard for days
const days = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat'
}

const slots = []

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
    slots.push({
      start: moment('00:00', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment(s.start, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'closed',
      class: 'closed'
    })
    slots.push({
      start: moment(s.end, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'closed',
      class: 'closed'
    })
    slots.push({
      start: moment(s.break.start, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment(s.break.end, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'break',
      class: 'break'
    })
    // non-business day
  } else {
    slots.push({
      start: moment('00:00', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'closed',
      class: 'closed'
    })
  }
}

export default {
  slots
}
