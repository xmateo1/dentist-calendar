export default {
  firstHour: 8,
  lastHour: 19,
  minutePerSlot: 30,
  timeFormat: 'HH:mm',
  shift: {
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
  },
  closedTitle: 'closed',
  breakTitle: 'break',
  bookedTitle: 'booked',
  generatedDays: 7,
  generatedBookedSlots: 15
}
