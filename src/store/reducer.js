const defaultState = {
  inputValue: "默认值",
  list: [{
    text: '11111',
    completed: true
  }, {
    text: '22222',
    completed: false
  }, {
    text: '33333',
    completed: true
  }]
}

export default (state = defaultState, action) => {
  if(action.type === "change_input_value") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === 'submit_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = [...state.list, {text: action.value, completed: action.completed}];
    return newState;
  }
  if(action.type === 'remove_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  if(action.type === 'toggle_item') {
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.style) {
      case 'all':
        return newState;
      case 'un-completed':
        newState.list = [...(newState.list.filter((item, index) => {
          return item.completed === false;
        }))];
        return newState;
      case 'completed':
        newState.list = [...(newState.list.filter((item, index) => {
          return item.completed === true;
        }))];
        return newState;
      default:
        break;
    }
  }
  return state;
}