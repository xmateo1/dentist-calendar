import moment from 'moment'
import config from '../app.config'
import days from '../days'

const events = []
const className = 'booked'

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

for (let i = 1; i < config.generatedDays + 1; i++) {
  const dayOfWeek = moment()
    .add(i, 'days')
    .day()
  const isOdd = dayOfWeek % 2 !== 0
  const s = isOdd ? config.shift.odd : config.shift.even

  // get day name as string
  const day = days[dayOfWeek]

  // business day
  if (s.days.includes(day)) {
    const totalHours =
      parseInt(moment(s.end, config.timeFormat).format('H')) -
      parseInt(moment(s.start, config.timeFormat).format('H'))
    const totalSlots = (totalHours * 60) / config.minutePerSlot

    for (let j = 0; j < totalSlots; j++) {
      const conflictsWithBreak =
        moment(s.start, config.timeFormat)
          .add(j * config.minutePerSlot, 'minutes')
          .format(config.timeFormat) === s.break.start
      if (!conflictsWithBreak) {
        events.push({
          start: moment(s.start, config.timeFormat)
            .add(i, 'days')
            .add(j * config.minutePerSlot, 'minutes')
            .toDate(),
          end: moment(s.start, config.timeFormat)
            .add(i, 'days')
            .add(j * config.minutePerSlot, 'minutes')
            .add(config.minutePerSlot, 'minutes')
            .toDate(),
          title: config.bookedTitle,
          class: className
        })
      }
    }
  }
}

shuffle(events)
events.splice(0, events.length - config.generatedBookedSlots)

export default {
  events
}
