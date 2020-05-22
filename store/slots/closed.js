import moment from 'moment'
import config from '../app.config'
import days from '../days'

const events = []
const className = 'closed'

for (
  let i = 0 + config.startDayOffset;
  i < config.generatedDays + config.startDayOffset;
  i++
) {
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
      end: moment(s.start, config.timeFormat)
        .add(i, 'days')
        .toDate(),
      title: config.closedTitle,
      class: className
    })
    events.push({
      start: moment(s.end, config.timeFormat)
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: config.closedTitle,
      class: className
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
      class: className
    })
  }
}

export default {
  events
}
