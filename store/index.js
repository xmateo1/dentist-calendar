import moment from 'moment'

const businessSlots = []
// const availableSlots = []

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

const shift = {
  even: {
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    start: '8:00',
    end: '14:00',
    break: {
      start: '11:00',
      end: '11:30'
    }
  },
  odd: {
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    start: '13:00',
    end: '19:00',
    break: {
      start: '16:00',
      end: '16:30'
    }
  }
}

for (let i = 1; i < 8; i++) {
  const dayOfWeek = moment()
    .add(i, 'days')
    .day()
  const isOdd = dayOfWeek % 2 !== 0
  const s = isOdd ? shift.odd : shift.even

  // get day name as string
  const day = days[dayOfWeek]

  // business day
  if (s.days.includes(day)) {
    businessSlots.push({
      start: moment('00:00', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment(s.start, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'closed',
      class: 'closed'
    })
    businessSlots.push({
      start: moment(s.end, 'HH:mm')
        .add(i, 'days')
        .toDate(),
      end: moment('23:59', 'HH:mm')
        .add(i, 'days')
        .toDate(),
      title: 'closed',
      class: 'closed'
    })
    businessSlots.push({
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
    businessSlots.push({
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

export const state = () => {
  const s = {
    events: businessSlots,
    config: {
      firstHour: 8,
      lastHour: 19,
      minutePerSlot: 30
    },
    startDay: moment()
      .add(1, 'days')
      .toDate() // tomorrow
  }
  return s
}
