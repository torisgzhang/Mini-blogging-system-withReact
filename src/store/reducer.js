import {
  CHANGE_INPUT_VALUE,
  SUBMIT_VALUE,
  REMOVE_ITEM,
  TOGGLE_ITEM
} from './actionTypes';
import { combineReducers } from 'redux';

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
  return state;
}

const filterReducer = (state = {}, action) => {
  if(action.type === TOGGLE_ITEM) {
    
  }
  return state;
}

var rootReducer = combineReducers({
  toDoListReducer,
  filterReducer
});
export default toDoListReducer;