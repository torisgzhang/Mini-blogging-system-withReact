const defaultState = {
  inputVal: '',
  list: []
}

export default (state = defaultState, action) => {
  if(action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputVal = action.value;
    return newState;
  }
  if(action.type === 'add_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = [...state.list, newState.inputVal];
    newState.inputVal = '';
    return newState;
  }
  if(action.type === 'delete_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  return state;
}