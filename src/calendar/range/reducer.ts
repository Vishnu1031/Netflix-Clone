const start = new Date()
const end = new Date()
end.setDate(end.getDate() + 7)

export const initialState: any = {
  start: {
    year: start.getFullYear(),
    month: start.getMonth(),
    day: start.getDate(),
    hour: start.getHours(),
    minute: start.getMinutes(),
    type: 'start',
    value: start
  },
  end: {
    year: end.getFullYear(),
    month: end.getMonth(),
    day: end.getDate(),
    hour: end.getHours(),
    minute: end.getMinutes(),
    type: 'end',
    value: end
  }
}

function reducer(state: any, action: any) {
  const newState = { ...state }
  if (action.type === 'START') {
    newState.start = { ...state.start, ...action.payload }
    if (action.payload.day) {
      newState.start.value = new Date(newState.start.year, newState.start.month, newState.start.day)
    }
  }
  if (action.type === 'END') {
    newState.end = { ...state.end, ...action.payload }
    if (action.payload.day) {
      newState.end.value = new Date(newState.end.year, newState.end.month, newState.end.day)
    }
  }

  return newState
}

export default reducer
