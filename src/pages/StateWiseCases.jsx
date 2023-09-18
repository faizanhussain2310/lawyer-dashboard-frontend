import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const StateWiseCases = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [selectState, setSelectState] = useState("India");

  const stateCahngeHandler = (event) => {
    setSelectState(event.target.value);
  };

  const uniqueStates = new Set();
  customersData.forEach((i) => uniqueStates.add(i.Location));
  let uniqueStatesArray = [];
  uniqueStates.forEach((states) => uniqueStatesArray.push(states));
  console.log("ARRAY ", uniqueStatesArray);
  console.log("STATE ", selectState);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="State Wise Cases" />
      <select id="category" name="category" onChange={stateCahngeHandler}>
        {uniqueStatesArray.map((states) => (
          <option value={states}>{states}</option>
        ))}
      </select>
      <GridComponent
        dataSource={customersData.filter((data) => {
          return data.Location === selectState.toString();
        })}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        // allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default StateWiseCases;
