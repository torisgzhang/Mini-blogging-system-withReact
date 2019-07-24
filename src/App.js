import React, { Component } from 'react';
import {Button, Input, List} from 'antd';
import store from './store/index';

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

  handleInputChange(e) {
    const action = {
      type: 'change_input_value',
      value: e.target.value
    };
    store.dispatch(action);
  }
  handleClickBtn() {
    const action = {
      type: 'submit_value',
      value: this.state.inputValue,
      completed: false
    }
    store.dispatch(action);
  }
  handleStoreChange() {
    this.setState(store.getState());
  }
  handleRemoveItem(index) {
    const action = {
      type: 'remove_item',
      index: index
    }
    store.dispatch(action);
  }
  handleToggleList(type) {
    let action = {
      type: 'toggle_item',
      style: type
    };
    store.dispatch(action);
  }
}

export default App;