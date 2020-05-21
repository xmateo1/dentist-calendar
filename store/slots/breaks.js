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
      start: moment(s.break.start, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment(s.break.end, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: config.breakTitle,
      class: 'break'
    })
  }
}

export default {
  events
}
