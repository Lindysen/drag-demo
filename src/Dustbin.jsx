import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { Popover,Button} from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import ItemTypes from './itemType';
import DragBox from './dragBox';

const Root = styled.div`
  background-color: #f2f2f2;
  width: 600px;
  height: 600px;
  position:relative;
  color: #999;
  display:flex;
  align-items:center;
  justify-content:center;
  span{
    font-size:1em;
  }
  p{
    margin-bottom: 0px;
  }
  .tag{
    position:absolute;
    background-color: #ff5714;
    color: #fff;
    width: 50px;
    height: 50px;
  }
`;
const targetSpec = {
  // if canDrop()定义了且返回false 则这个方法不会被调用
  drop(props, monitor, component) {
    // 如果返回普通对象则作为 拖拽源的endDrag方法里的 monitor.getDropResult()的结果
    if (monitor.didDrop()) {
      // true --- some drop target has handled the drop event
      return;
    }
    const item = monitor.getItem();
    const payload= monitor.getClientOffset();
    component.saveBoxPosition(item.id,payload)
    return { id: item.id,payload };
  },
  hover(props, monitor, component) {
    // console.log('挺住啊');
  }, // 当一个item 悬停在组件上时调用
  canDrop(props, monitor) {
    const dragItem = monitor.getItem(); // 当前拖动项
    // if (dragItem.id === 1) {
    //   return true; // 只有id为 1 才可以放置
    // } else {
    //   return false;
    // }
    return true;
  }, // 指定拖放目标是否能接受他们
};
function collect(connect, monitor) {
  return {
    DropTargetConnector: connect.dropTarget(),
    isOver: monitor.isOver(), // true--- there is a  drag operation in progress and the poiner is  currently hovering over the owner
  };
}

 class Dustbin extends Component {
   constructor(props){
     super(props);
     this.saveBoxPosition = this.saveBoxPosition.bind(this);
     this.renderDeletedBox = this.renderDeletedBox.bind(this);
   }
  saveBoxPosition(id,payload){
    const {x,y}= payload;
    this.props.setBoxListStatePosition({
      id,
     x:x-25,
     y:y-25,
    });
  }
  renderDeletedBox(deletedBox) {
    const content = _.map(deletedBox,(item) => {
      return <DragBox key={item.id} id={item.id}  name={item.name} className="tag" style={{top: item.y,left: item.x}}></DragBox>;
    })
    return content;
  }
  render() {
    const { DropTargetConnector, isOver ,boxList} = this.props;
    let styleObj = {};
    if (isOver) {
      styleObj = { backgroundColor: 'green', opacity: '0.5' };
    }
    const deletedBox = _.filter(boxList,(item) => {
      return !item.show;
    })
    return DropTargetConnector(
      <div>
        <Root style={styleObj}>
        {
          deletedBox.length > 0 ? this.renderDeletedBox(deletedBox) :<span>现在我是空的</span>
        }
        </Root>
      </div>,
    );
  }
}
export default DropTarget(ItemTypes.BOX, targetSpec, collect)(Dustbin);