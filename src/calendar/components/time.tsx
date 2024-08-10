import React from 'react'

type Props = {
  dispatch: any
  hour: number
  minute: number
}

const className =
  'w-full rounded border border-inputBorder bg-white px-3 py-2.5 text-black placeholder:tracking-wider placeholder:text-theta placeholder:opacity-50'

function Time({ dispatch, hour, minute }: Props) {
  return (
    <div className='mt-6 flex flex-row items-center justify-start gap-x-6'>
      <div className='flex w-1/2 flex-col items-start justify-start'>
        <label className='mb-2 text-sm tracking-wider text-theta'>Hours</label>
        <input
          className={`${className} ${hour < 0 || hour > 23 ? '!border-2 !border-red-500' : ''}`}
          max={23}
          min={0}
          onChange={(event: any) => {
            const value = event?.target?.value
            dispatch({ payload: { hour: value } })
          }}
          placeholder='Start Time'
          type='number'
          value={hour}
        />
      </div>
      <div className='flex w-1/2 flex-col items-start justify-start'>
        <label className='mb-2 text-sm tracking-wider text-theta'>Minutes</label>
        <input
          className={`${className} ${minute < 0 || minute > 59 ? '!border-red-500' : ''}`}
          max={59}
          min={0}
          onChange={(event: any) => {
            const value = event?.target?.value
            dispatch({ payload: { minute: value } })
          }}
          placeholder='End Time'
          type='number'
          value={minute}
        />
      </div>
    </div>
  )
}

export default Time
