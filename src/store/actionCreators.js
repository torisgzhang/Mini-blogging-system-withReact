import {
  CHANGE_INPUT_VALUE,
  SUBMIT_VALUE,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  INIT_DATA
} from './actionTypes';
import axios from 'axios';

export const getChangeInputValue = ((value) => ({
  type: CHANGE_INPUT_VALUE,
  value
}));

export const getSubmitValue = ((value, completed) => ({
  type: SUBMIT_VALUE,
  value,
  completed
}));

export const getRemoveItem = ((index) => ({
  type: REMOVE_ITEM,
  index
}));

export const getHandleToggleItem = ((style) => ({
  type: TOGGLE_ITEM,
  style
}));

export const initData = ((data) => ({
  type: INIT_DATA,
  data
}));

//使用React-thunk中间件之后可以return函数
export const getListData = (() => {
  return (dispatch) => {//这里传递dispatch相当于store.dispatch
    axios.get('http://192.168.0.101:3737/list').then((res) => {
      if(res.status === 200) {
        const data = res.data;
        dispatch(initData(data));
      }
    })
  }
})