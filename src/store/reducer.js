import {
  CHANGE_INPUT_VALUE,
  SUBMIT_VALUE,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  INIT_DATA
} from './actionTypes';

const defaultState = {
  inputValue: "",
  list: []
}

const toDoListReducer = (state = defaultState, action) => {
  if(action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === SUBMIT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = [...state.list, {text: action.value, completed: action.completed}];
    return newState;
  }
  if(action.type === REMOVE_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  if(action.type === TOGGLE_ITEM) {
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
  if(action.type === INIT_DATA) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = [...action.data];
    return newState;
  }
  return state;
}

export default toDoListReducer;