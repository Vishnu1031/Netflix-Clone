import React, { useCallback, useMemo, useState } from 'react'
import Days from '../components/date'
import { initialState } from './reducer'
import Footer from '../components/footer'
import Header from '../components/header'
import Dropdown from 'components/dropdown'
import Time from '../components/time'

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

function Content({ dispatch, root, state }: any) {
  return (
    <div className='flex min-w-[288px] flex-col'>
      <Header dispatch={dispatch} state={state} />
      <Days dispatch={dispatch} root={root} state={state} />
      <Time dispatch={dispatch} hour={state.hour} minute={state.minute} />
    </div>
  )
}

type Props = {
  canClear?: boolean
  close?: () => void
  isLoading?: boolean
  onChange: (start: number, end: number) => Promise<string>
  overrideClassname?: string
  value: [Date | number | string, Date | number | string]
}

function Range(props: Props) {
  const [state, setState] = useState<any>(() => {
    const { value = [] } = props
    const start = initialState.start
    if (value[0]) {
      start.value = new Date(value[0])
      start.year = start.value.getFullYear()
      start.month = start.value.getMonth()
      start.day = start.value.getDate()
      start.hour = start.value.getHours()
      start.minute = start.value.getMinutes()
    }

    const end = initialState.end
    if (value[1]) {
      end.value = new Date(value[1])
      end.year = end.value.getFullYear()
      end.month = end.value.getMonth()
      end.day = end.value.getDate()
      end.hour = end.value.getHours()
      end.minute = end.value.getMinutes()
    }

    return { start, end }
  })

  const dispatch = useCallback(
    (action: any) => {
      setState((state: any) => {
        const newState = { ...state }
        if (action.type === 'START') {
          newState.start = { ...state.start, ...action.payload }
          if (action.payload.day) {
            newState.start.value = new Date(
              newState.start.year,
              newState.start.month,
              newState.start.day
            )
          }
        }
        if (action.type === 'END') {
          newState.end = { ...state.end, ...action.payload }
          if (action.payload.day) {
            newState.end.value = new Date(newState.end.year, newState.end.month, newState.end.day)
          }
        }

        return newState
      })
    },
    [state]
  )

  const changeStart = useCallback(
    ({ payload }: any) => {
      dispatch({ type: 'START', payload })
    },
    [dispatch, state]
  )
  const changeEnd = useCallback(
    ({ payload }: any) => {
      dispatch({ type: 'END', payload })
    },
    [dispatch, state]
  )

  async function applyChange() {
    if (
      state.start.hour >= 0 &&
      state.start.hour <= 23 &&
      state.end.hour >= 0 &&
      state.end.hour <= 23 &&
      state.start.minute >= 0 &&
      state.start.minute <= 59 &&
      state.end.minute >= 0 &&
      state.end.minute <= 59
    ) {
      try {
        await props.onChange(state?.start?.value?.getTime(), state?.end?.value?.getTime())
        if (props.close && typeof props.close === 'function') props.close()
      } catch (_) {}
    }
  }

  return (
    <>
      <div
        className='relative'
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation()
          event?.nativeEvent?.stopImmediatePropagation()
        }}
      >
        <div className='flex flex-row gap-x-20'>
          <Content dispatch={changeStart} root={state} state={state.start} />
          <Content dispatch={changeEnd} root={state} state={state.end} />
        </div>
        <Footer
          applyChange={applyChange}
          canClear={props.canClear}
          isLoading={Boolean(props.isLoading)}
        />
        <div className='absolute left-1/2 top-1/2 h-4/5 -translate-y-1/2 border-l border-l-gray-300' />
      </div>
    </>
  )
}

function Calendar(props: Props) {
  const { overrideClassname = '', value = ['', ''] } = props

  const date = useMemo(() => {
    let start = new Date(value[0]).toLocaleDateString('en', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Kolkata',
      year: '2-digit'
    })
    let end = new Date(value[1]).toLocaleDateString('en', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Kolkata',
      year: '2-digit'
    })

    return `${start} - ${end}`
  }, [value[0], value[1]])

  return (
    <Dropdown content={{ Component: Range, props }}>
      <button className={overrideClassname || className} type='button'>
        {date}
      </button>
    </Dropdown>
  )
}

export default Calendar
