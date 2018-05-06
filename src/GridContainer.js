import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Grid from './Grid';
import DraggableRecord from './DraggableRecord';

import './grid-container.css';


const rowData = [
  {
    follow: 'Follow 6.3',
    model: '6.3',
    price: 10000
  },
  {
    follow: 'Follow 6.2',
    model: '6.2',
    price: 20000},
  {
    follow: 'Follow 6.1',
    model: '6.1',
    price: 30000
  }
];

const columnDefs = [
  {
    headerName: "Follow", field: "follow", filter: "text"},
  {headerName: "Model", field: "model"},
  {headerName: "Price", field: "price"}
];

const availableRows = [
  {
    follow: 'Honda',
    model: 'Accord',
    price: 5000
  },
  {
    follow: 'Mitsubishi',
    model: 'Eclipse',
    price: 16000
  }
]

export default class GridContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      columnDefs: columnDefs,
      rowData:rowData,
      availableRows: availableRows
    }
    this.addRow = this.addRow.bind(this);
  }

  addRow(value){
      //In a real application you probably want to make an http request with the new data or use a redux action... or something
      let {availableRows} = this.state;
      let newRow = value.values;
      let indexToRemove = availableRows.findIndex((element)=>{
        return element.make === newRow.make && element.model === newRow.model && element.price === newRow.price;
      })
      availableRows.splice(indexToRemove,1);
      this.setState({
        rowData: [...this.state.rowData, newRow],
        availableRows: availableRows
      });
  }

  render() {
    let {columnDefs, rowData,availableRows} = this.state;

    const gridInfo = {
      columnDefs,
      rowData,
      style: {
        height:'500px',
        width:'800px'
      },
      className: 'ag-fresh',
      dropCallback: this.addRow
    };
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="flex">
          <div>
          <Grid gridInfo={gridInfo} ></Grid>
          </div>
          <div>
            {availableRows.map((element, i)=>{
              return <DraggableRecord key={i} values={element}/>
            })
          }
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}