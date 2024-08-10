import { createContext, useContext } from 'react'

export const initialValue: any = {
  state: {},
  dispatch: () => {}
}

// Calendar Context
export const CalendarContext = createContext(initialValue)
export function useCalendarContext() {
  const context = useContext(CalendarContext)
  return context
}
export default CalendarContext.Provider

// Date Range Context(Start / End)
export const RangeContext = createContext(initialValue)
export function useRangeContext() {
  const context = useContext(RangeContext)
  return context
}
export const RangeProvider = RangeContext.Provider
