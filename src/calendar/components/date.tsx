import React, { useCallback } from 'react'
import useDates from './use-dates'

function Days() {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return (
    <>
      {days.map((day: string) => (
        <div className='text-center text-base opacity-50' key={day}>
          {day}
        </div>
      ))}
    </>
  )
}

function Component({ dispatch, root, state }: any) {
  const dates = useDates(root, state)

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    if (!target?.getAttribute) return
    const day = target.getAttribute('data-day')
    if (!day) return
    dispatch({ payload: { day: +day } })
  }, [])

  return (
    <div className='grid grid-cols-7 gap-2' onClick={handleClick}>
      <Days />
      {dates.map(({ active, date: day, key, selected, inRange }) => (
        <button
          className={`h-[34px] w-[34px] rounded-full p-1 disabled:opacity-30 ${
            selected ? 'bg-beta text-white' : ''
          } ${inRange ? 'bg-beta bg-opacity-10' : ''}`}
          data-day={day}
          disabled={!active}
          key={key}
        >
          {day}
        </button>
      ))}
    </div>
  )
}

export default Component
