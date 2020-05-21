# dentist-calendar

> a calendar for booking dentist appointments

The task in short:

* available daily slots of 30 minutes
  * for even dates in a weekday it spans from 8 to 14 h
    * slot from 11 to 11:30 is reserved for a break
  * for odd dates in a weekday it spans from 13 to 19h
    * slot from 16 to 16:30 is reserved for a break
  * only saturday on even dates is available from 8 to 14 h
    * slot from 11 to 11:30 is reserved for a break
* the view shows current week (next 7 days)
* the day in calendar starts from tomorrow's date
* status of a slot is marked with a color:
  * available
  * booked
  * break
  * closed
* 15 randomly generated slots are assigned as booked slots
* user can select 2 slots in a week and one in a day

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
