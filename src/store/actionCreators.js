import {
  CHANGE_INPUT_VALUE,
  SUBMIT_VALUE,
  REMOVE_ITEM,
  TOGGLE_ITEM
} from './actionTypes';

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