import React, { useCallback } from 'react'

function Header({ dispatch, state: { month, year } }: any) {
  const handleClick = useCallback(
    (change: -1 | 0 | 1) => {
      if (change === 0) {
        const date = new Date()
        dispatch({ payload: { month: date.getMonth(), year: date.getFullYear() } })
        return
      }
      let payload = {}
      if (change === 1 && month === 11) payload = { month: 0, year: year + 1 }
      else if (change === -1 && month === 0) payload = { month: 11, year: year - 1 }
      else payload = { month: month + change }
      dispatch({ payload })
    },
    [month, year]
  )

  const date = new Date(year, month)

  return (
    <div className='mb-5 flex flex-row items-center justify-between'>
      {/* View previous month calendar */}
      <button key='previous' onClick={() => handleClick(-1)} type='button'>
        <div className='h-2.5 w-2.5 -rotate-45 border-l-2 border-t-2 border-l-black border-t-black' />
      </button>

      {/* View current month calendar */}
      <div className='text-base font-bold'>
        {date.toLocaleDateString('en', { month: 'short', year: 'numeric' })}
      </div>

      {/* View next month calendar */}
      <button onClick={() => handleClick(1)} key='next' type='button'>
        <div className='h-2.5 w-2.5 rotate-45 border-r-2 border-t-2 border-r-black border-t-black' />
      </button>
    </div>
  )
}

export default Header
