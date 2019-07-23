import React, { Component } from 'react';
import { Button, Input } from 'antd';
import TodoItem from "./TodoItem"
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      lists: []
    }
    this.handleChangeVal = this.handleChangeVal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    const styleWrapper = {
      'width': '300px',
      'height': '300px',
      'margin': '0 auto',
    }
    return (
      <div className="wrapper" style={styleWrapper}>
        <div>
          <Input
            value={this.state.inputVal}
            onChange={this.handleChangeVal}
            placeholder="small size"
          />
          <Button onClick={this.handleClick} className="btn" type="">submit</Button>
        </div>
        <div>
        <ul>
          {this.getItemList()}
        </ul>
        </div>
      </div>
    )
  }
  componentDidMount() {
    //ajax请求数据
    axios.get('http://www.mugooo.com/userpcapi/PCIndexController/region/list')
      .then((res) => {
        alert('成功')
      })
      .catch((e) => {
        alert("失败" + e)
      });
  }

  getItemList() {
    return this.state.lists.map((item, index) => {
      return (
        <TodoItem
          key={index}
          item = {item}
          index = {index}
          deleteItem = {this.handleDelete}
        />
      )
    })
  }
  handleClick() {
    this.setState((preState) => ({
      lists: [...preState.lists, preState.inputVal],
      inputVal: ''
    }))
  }
  handleChangeVal(e) {
    const inputVal = e.target.value;
    this.setState(() => ({
      inputVal
    }))
  }
  handleDelete(index) {
    this.setState((preState) => {
      const lists = [...preState.lists];
      lists.splice(index, 1);
      return { lists }
    })
  }
}

export default App;