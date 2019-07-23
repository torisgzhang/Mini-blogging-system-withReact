import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.item !== this.props.item) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    console.log("子组件渲染");
    const styleLi = {
      'height': '50px',
      'lineHeight': '50px',
    }
    const {item} = this.props;
    return (
      <div>
        <li onClick={this.handleDelete} style={styleLi}>
          { item }
        </li>
      </div>
    )
  }

  //setState更改数据是异步的 
  handleDelete() {
    const {deleteItem, index} = this.props;
    deleteItem(index);
  }
}
//设置父组件传参的类型
TodoItem.propTypes = {
  item: PropTypes.string.isRequired, //isRequired 必须传
  deleteItem: PropTypes.func,
  index: PropTypes.number
}
//只要state和props发生改变组件的render会重新执行
//设置父组件传参的默认值
TodoItem.defaultProps = {
  test: '默认值'
}
export default TodoItem;