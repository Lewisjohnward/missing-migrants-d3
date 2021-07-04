import React, { useState, useEffect } from "react";
import { csv } from "d3";

const dataUrl =
  "https://gist.githubusercontent.com/Lewisjohnward/e8495d7bbc4f74800b84119eede9d21d/raw/674807efaa89f877485dd5509bf5d8a2af6e2db1/MissingMigrants-Global-2021-07-03T14-06-45.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      const row = d => {
          d.date = new Date(d["Reported Date"])
          d.total = handleTotal(d["Total Dead and Missing"])
        return d
      }
    csv(dataUrl, row).then(setData);
  }, []);



  return data
};

const handleTotal = (totalString) => {
  const regex = /[,]+/g
  const cleanString = totalString.replace(regex, "")
  return (
    +cleanString
  )
}