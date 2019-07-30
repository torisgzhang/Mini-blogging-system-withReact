import React from 'react';
import ReactDOM from 'react-dom';
import '@/common/styles/base.css';
import TodoList1 from './TodoList1';
import store from './newStore1';
import { Provider } from 'react-redux';

const main = (
  <Provider store={store}>
    <TodoList1 />
  </Provider>
)

ReactDOM.render(main, document.getElementById('root'));