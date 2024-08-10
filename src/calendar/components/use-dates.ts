import { useMemo } from 'react'
import { useCalendarContext, useRangeContext } from './context'

function getFirstDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month)
  date.setDate(1)
  return date.getDay()
}

function getLastDateOfMonth(year: number, month: number): number {
  let date: Date | number = new Date(year, month)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  return date.getDate()
}

function useDates(state: any, { day, month, year, type, value }: any) {
  const dates = useMemo(() => {
    // Array to store visible dates for month
    const grid = []

    // Calculate all the previous month dates
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    for (let i = 0; i < firstDayOfMonth; i += 1) {
      grid.push({
        key: `previous-${i}`,
        date: '',
        active: false,
        selected: false
      })
    }

    let startDate: Date | number = 0
    if (state?.start?.value) {
      startDate = new Date(state?.start?.value)
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate = startDate.getTime()
    }
    let endDate: Date | number = 0
    if (state?.end?.value) {
      endDate = new Date(state?.end?.value)
      endDate.setHours(0)
      endDate.setMinutes(0)
      endDate.setSeconds(0)
      endDate = endDate.getTime()
    }

    // Calculate all the current month dates
    const lastDateOfMonth = getLastDateOfMonth(year, month)
    for (let date = 1; date <= lastDateOfMonth; date += 1) {
      const currentDate = new Date(year, month, date).getTime()

      //  Check if date should be disabled for date range
      const active = (() => {
        switch (type) {
          case 'start':
            return currentDate <= endDate
          case 'end':
            return currentDate >= startDate
          default:
            return true
        }
      })()

      // Check if current date is selected(in range for date range)
      const selected = (() => {
        if (type === 'single') return currentDate === value?.getTime()
        return startDate === currentDate || currentDate === endDate
      })()

      // Check if the date lies between selected range
      const inRange = type !== 'single' && startDate < currentDate && currentDate < endDate

      grid.push({
        key: date,
        date,
        active,
        selected,
        inRange
      })
    }

    return grid
  }, [month, year, state, value, day])

  return dates
}

export default useDates
