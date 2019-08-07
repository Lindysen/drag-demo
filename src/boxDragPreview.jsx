import React, { Component } from 'react';
import styled from 'styled-components';

const style={
  width: '50px',
  height: '50px',
  display: 'inline-block',
  border:'1px solid #ff5714',
  backgroundColor: 'yellow',
}
class BoxDragPreview extends Component {
  constructor(props){
    super(props);
    // this.timer='';
  }
  // componentDidMount(){
  //   this.timer = setInterval(()=> {
  //     this.showYellow = !this.showYellow;
  //   },100);
  // }
  // componentWillUnmount(){
  //    clearInterval(this.timer);
  // }
  render() {
    const { name,id } = this.props;
    return (
      <div style={style} >
          box
      </div>
    );
  }
}
export default BoxDragPreview;
