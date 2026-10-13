/**
 * Little Luxuries Cleaning Co. Schedule Logic
 *
 * Alternating weeks:
 * - Week A (even ISO weeks): Sunday, Monday, Tuesday, Wednesday
 * - Week B (odd ISO weeks):  Thursday only
 *
 * Hours: 8:00 AM – 3:00 PM
 */

import {
  addDays,
  format,
  isBefore,
  isSameDay,
  getISOWeek,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns'

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00',
]

export function isWorkingDay(date) {
  const week = getISOWeek(date)
  const day = date.getDay() // 0=Sun ... 6=Sat

  if (week % 2 === 0) {
    return day >= 0 && day <= 3
  } else {
    return day === 4
  }
}

export function getAvailableSlots(date, bookedSlots = []) {
  if (!isWorkingDay(date)) return []

  const now = new Date()
  const slots = []

  for (const time of TIME_SLOTS) {
    const [h, m] = time.split(':').map(Number)
    const slotDate = setMilliseconds(setSeconds(setMinutes(setHours(new Date(date), h), m), 0), 0)

    if (isSameDay(date, now) && isBefore(slotDate, now)) continue

    const iso = slotDate.toISOString()
    if (bookedSlots.includes(iso) || bookedSlots.includes(format(slotDate, "yyyy-MM-dd'T'HH:mm"))) {
      continue
    }

    slots.push({
      time,
      label: format(slotDate, 'h:mm a'),
      iso,
      dateObj: slotDate,
    })
  }

  return slots
}

export function getUpcomingWorkingDays(count = 28) {
  const days = []
  let current = new Date()
  current.setHours(0, 0, 0, 0)

  for (let i = 0; i < 60 && days.length < count; i++) {
    const d = addDays(current, i)
    if (isWorkingDay(d)) {
      days.push(d)
    }
  }
  return days
}

const STORAGE_KEY = 'llc_bookings'

export function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  const all = loadBookings()
  all.push({ ...booking, id: Date.now().toString(), status: 'confirmed' })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  return all
}

export function updateBooking(id, updates) {
  const all = loadBookings().map((b) => (b.id === id ? { ...b, ...updates } : b))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  return all
}

export function cancelBooking(id) {
  return updateBooking(id, { status: 'cancelled' })
}

export function getBookedIsos() {
  return loadBookings()
    .filter((b) => b.status === 'confirmed')
    .map((b) => b.slotIso)
}
