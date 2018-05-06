import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

const style = {
  border: '1px solid black',
  width: '400px'
}

const draggableRecordSource = {
  beginDrag(props) {
    return {
      values: { ...props.values }
    };
  },

  endDrag(props, monitor) {
    if(!monitor.didDrop()){
      console.log('did not drop');
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log('you dropped a new record')
    }
    console.log(item);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableRecord extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { values } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource(
        <div style={{...style, opacity }}>
        {
          Object.keys(values).map((keyName,i) =>{
            return <span key={i}>{keyName}: {values[keyName]} </span>
          })
        }
        </div>,
      )
    );
  }
}

export default DragSource(ItemTypes.RECORD, draggableRecordSource, collect)(DraggableRecord);
