import moment from 'moment'
import config from '../app.config'
import days from '../days'

const events = []
const className = 'break'

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
      start: moment(s.break.start, config.timeFormat)
        .add(i, 'days')
        .toDate(),
      end: moment(s.break.end, config.timeFormat)
        .add(i, 'days')
        .toDate(),
      title: config.breakTitle,
      class: className
    })
  }
}

export default {
  events
}
