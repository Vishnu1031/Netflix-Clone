const value = new Date()
export const initialState: any = {
  value: null,
  day: value.getDate(),
  month: value.getMonth(),
  setDate: () => {},
  year: value.getFullYear(),
  type: 'single'
}

function reducer(state: any, action: any) {
  const newState = { ...state, ...action.payload }
  if (action.payload.day) {
    newState.value = new Date(newState.year, newState.month, newState.day)
  }
  return newState
}

export default reducer
