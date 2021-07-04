import React from "react";
import { Graphic } from "./Graphic";
import { useData } from "./hooks/useData";
import {modifyData} from "./hooks/modifyData"

export const App = () => {
  const data = useData();

  if (!data) {
    return <div>Retrieving data...</div>;
  }
  console.log(data)
  const modifiedData = modifyData(data)
  console.log(modifiedData[2000])
  return (
    <div>
      <Graphic 
        data={modifiedData} 
        />
    </div>
  );
};
