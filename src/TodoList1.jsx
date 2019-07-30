import React from 'react';
import { connect } from 'react-redux';

const TodoList1 = (props) => {
  const { inputVal, changeInputVal, handleClick, handleDelItem, list } = props;
  return (
    <div>
      <div>
        <input
          value={inputVal}
          onChange={changeInputVal}
          type="text" />
        <button onClick={handleClick}>提交</button>
      </div>
      <div>
        <ul>
          {
            list.map((item, index) => {
              return <li key={index} onClick={() => {handleDelItem(index)}}>{item}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}


const mapStateTpProps = (state) => {
  return {
    inputVal: state.inputVal,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputVal(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action);
    },
    handleClick() {
      const action = {
        type: 'add_item'
      }
      dispatch(action);
    },
    handleDelItem(index) {
      const action = {
        type: 'delete_item',
        index: index
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateTpProps, mapDispatchToProps)(TodoList1);