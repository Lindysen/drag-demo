import React from 'react';
import { BehaviorSubject } from 'rxjs';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import styled from 'styled-components';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import DragLayerBox from './DragLayerBox';
import Dustbin from './Dustbin';
import Box from './Box';
import './styles.css';

const Root = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const boxList$ = new BehaviorSubject();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxList: [
        {
          name: '1',
          id: 1,
          show: true,
          x: 0,
          y: 0,
        },
        {
          name: '2',
          id: 2,
          show: true,
          x: 0,
          y: 0,
        },
        {
          name: '3',
          id: 3,
          show: true,
          x: 0,
          y: 0,
        },
      ],
    };
    this.setBoxListStateShow = this.setBoxListStateShow.bind(this);
    this.setBoxListStatePosition = this.setBoxListStatePosition.bind(this);
  }
  componentDidMount() {
    this.subscription = boxList$.subscribe(newState => {
      this.setState(newState);
    });
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  setBoxListStateShow(payload) {
    const { id, show } = payload;
    const { boxList } = this.state;
    const targetIndex = _.findIndex(boxList, o => o.id === id);
    const result = _.map(boxList, (item, index) => {
      if (index === targetIndex) {
        return {
          ...item,
          show,
        };
      }
      return { ...item };
    });
    boxList$.next({
      boxList: result,
    });
  }
  setBoxListStatePosition(payload) {
    const { id, x, y } = payload;
    const { boxList } = this.state;
    const targetIndex = _.findIndex(boxList, o => o.id === id);
    const result = _.map(boxList, (item, index) => {
      if (index === targetIndex) {
        return {
          ...item,
          x,
          y,
        };
      }
      return { ...item };
    });
    boxList$.next({
      boxList: result,
    });
  }
  render() {
    const { boxList } = this.state;
    return (
      <DndProvider backend={HTML5Backend}>
        <Root>
          <DragLayerBox />
          <Dustbin
            setBoxListStatePosition={this.setBoxListStatePosition}
            boxList={boxList}
          />
          <div style={{ display: 'flex', marginTop: '8px' }}>
            {boxList.map(item => {
              if (item.show) {
                return (
                  <Box
                    name={item.name}
                    key={item.id}
                    id={item.id}
                    setBoxListStateShow={this.setBoxListStateShow}
                  />
                );
              }
            })}
          </div>
          <div />
        </Root>
      </DndProvider>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App name="Jane" />, mountNode);
