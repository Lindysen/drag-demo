import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import ItemTypes from './itemType';

const ItemRoot = styled.div`
  background-color: #ff5714;
  color: #fff;
  width: 50px;
  height: 50px;
`;
const sourceSpec = {
  beginDrag(props, monitor, component) {
    // 返回一个普通对象描述正在被拖拽的数据
    const item = { id: props.id,name:props.name };
    return item;
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      const dragItem = monitor.getItem(); //表示当前拖动项的普通对象
      const dropResult = monitor.getDropResult(); // 返回表示最后记录的放置结果的普通对象
      const { id } = dropResult;
      component.changeBoxState(id);
    }
  },
  // canDrap(props, monitor) {
  //   // 指定这个拖拽动作是否是允许的
  //   return true;
  // },
  isDragging(props, monitor) {
    // 默认情况下仅启动拖拽操作的拖动源才会被认为是dragging
    return monitor.getItem().id === props.id;
  },
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview:connect.dragPreview(),
    offset:monitor.getClientOffset()
  };
}

class Box extends Component {
  constructor(props){
    super(props);
    this.changeBoxState = this.changeBoxState.bind(this);
  }
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      })
    }
  }
  changeBoxState(id){
    this.props.setBoxListStateShow({
      id,
      show:false,
    })
  };
  render() {
    const { connectDragSource, isDragging, id,offset } = this.props;

    return connectDragSource(
      <div style={{ marginLeft: '8px' }}>
        <ItemRoot>
          box{id}
        </ItemRoot>
      </div>,
    );
  }
}
export default DragSource(ItemTypes.BOX, sourceSpec, collect)(Box);
