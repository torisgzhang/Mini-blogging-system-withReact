import React, { Component } from 'react';
import {Button, Input, List} from 'antd';
import store from './store/index';
import axios from 'axios';
import { getChangeInputValue, getSubmitValue, getRemoveItem, getHandleToggleItem, initData } from '@/store/actionCreators'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleList = this.handleToggleList.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  //组件里只有render（）的时候就是无状态组件  是一个函数
  render() {
    return (
      <div style={{margin: 10}}>
        <Input 
          style={{width: 300, marginRight: 10}}
          placeholder="todo info"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleClickBtn} type="primary">提交</Button>
        <div>
          <Button onClick={() => this.handleToggleList('all')} style={{margin: 10, marginLeft: 0}} type="">全部</Button>
          <Button onClick={() => this.handleToggleList('un-completed')} style={{margin: 10}} type="">未完成</Button>
          <Button onClick={() => this.handleToggleList('completed')} style={{margin: 10}} type="">已完成</Button>
        </div>
        <List
          style={{width: 300}}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => this.handleRemoveItem(index)}
            >
              {item.text}
            </List.Item>
          )}
        />
        
      </div>
    )
  }

  componentDidMount() {
    axios.get('http://192.168.0.101:3737/list').then((res) => {
      if(res.status === 200) {
        const data = res.data;
        store.dispatch(initData(data));
      }
    })
  }

  handleInputChange(e) {
    store.dispatch(getChangeInputValue(e.target.value));
  }
  handleClickBtn() {
    store.dispatch(getSubmitValue(this.state.inputValue, false));
  }
  handleStoreChange() {
    this.setState(store.getState());
  }
  handleRemoveItem(index) {
    store.dispatch(getRemoveItem(index));
  }
  handleToggleList(type) {
    store.dispatch(getHandleToggleItem(type));
  }
}

export default App;