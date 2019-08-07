import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import styled from 'styled-components';
import  BoxDragPreview from './boxDragPreview';
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}
function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType:monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class DragLayerBox extends Component {
  constructor(props){
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
  }
  renderItem(itemType,item){
    return <BoxDragPreview name={item.name} id={item.id}/>
  }
  getItemStyle() {
    const { currentOffset} = this.props;
    if(!currentOffset) {
       return null;
    }
    const {x,y}=currentOffset;

    const transform = `translate(${x}px,${y}px)`;
    return {
      transform: transform,
    }
  }
  render() {
    const { item, isDragging, itemType ,currentOffset} = this.props;
    const style = this.getItemStyle();
    if (!isDragging) {
      return null;
    }
    return (
      <div style={layerStyles}>
          <div style={style}>{this.renderItem(itemType, item)}</div>
      </div>
    );
  }
}
export default DragLayer(collect)(DragLayerBox);
