import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import Days from '../components/date'
import Context, { RangeProvider, initialValue, useCalendarContext } from '../components/context'
import reducer, { initialState } from './reducer'
import Footer from '../components/footer'
import Header from '../components/header'
import Dropdown from 'components/dropdown'

const className = [
  'bg-white',
  'min-w-[200px]',
  'rounded',
  'border',
  'border-inputBorder',
  'px-3',
  'py-[10px]',
  'text-sm',
  'leading-[18px]',
  'tracking-wider',
  'text-black',
  'placeholder:tracking-wider',
  'placeholder:text-theta',
  'placeholder:opacity-50',
  'relative',
  'text-left'
].join(' ')

function Content() {
  const applyChange = useCallback(() => {}, [])

  return (
    <div
      className='absolute left-0 top-[48px] bg-white p-3'
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        event?.nativeEvent?.stopImmediatePropagation()
      }}
    >
      <div className='flex flex-row'>
        <div className='min-w-[288px]'>
          <Header />
          <Days />
          <Footer isLoading={false} applyChange={applyChange} />
        </div>
        {/* <Time /> */}
      </div>
    </div>
  )
}

type Props = {
  placeholder: string
}

function Component({ placeholder }: Props) {
  const { state } = useCalendarContext()

  const date = useMemo(() => {
    if (!state?.value) return ''
    const _date = new Date(state.value)
    return _date.toLocaleDateString('en', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      timeZone: 'Asia/Kolkata',
      year: 'numeric'
    })
  }, [state.value])

  return (
    <Dropdown content={{ Component: Content, props: {} }}>
      <button className={className} type='button'>
        {date || <div className='text-theta opacity-50'>{placeholder}</div>}
      </button>
    </Dropdown>
  )
}

function Calendar(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <RangeProvider value={initialValue}>
      <Context value={{ state, dispatch }}>
        <Component {...props} />
      </Context>
    </RangeProvider>
  )
}

export default Calendar
