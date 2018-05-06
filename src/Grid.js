import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles//theme-fresh.css';


const gridTarget = {
  drop(props,monitor) {
    props.gridInfo.dropCallback(monitor.getItem());
    return { name: 'ag grid' };
  },
};

function collect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Grid extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    gridInfo: PropTypes.object.isRequired
  };

  onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
  }

  render() {
    const { canDrop, isOver, connectDropTarget,gridInfo } = this.props;
    const isActive = canDrop && isOver;
    console.log(isActive);
    let opacity = 1;
    if(isOver){
      opacity = 0.2;
    }
    return connectDropTarget(
      <div style={{...gridInfo.style, opacity}} className={gridInfo.className}>
        <AgGridReact
            enableFilter={true}
            columnDefs={gridInfo.columnDefs}
            rowData={gridInfo.rowData}
            onGridReady={this.onGridReady}>
        </AgGridReact>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.RECORD, gridTarget, collect )(Grid);
