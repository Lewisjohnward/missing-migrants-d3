import React from "react";
import { scaleLinear, scaleTime, extent, timeFormat, max, line, curveNatural } from "d3";

const width = 960;
const height = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 30,
  left: 60
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const formatTime = timeFormat("%Y");

export const Graphic = ({ data }) => {
  //xScale
  const xValue = (d) => d.date;
  const xScale = scaleTime()
    .domain(extent(data, xValue)) //The  beginning - the end
    .range([0, innerWidth]) // The values of x value
  .nice()

  //yScale
  const yValue = d => d.count
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  //marks

  const tickOffset = 10
  console.log(xScale.ticks())

  const tickYears = (tickValue) => {
    const currentYear = new Date().getFullYear()
    const tickYear = tickValue.getFullYear()
    if (tickYear > currentYear) return null
    return (
      formatTime(tickValue)
    )
  }
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
 
        {/*X axis*/}
        {xScale.ticks().map((tickValue) => {
          console.log(tickValue.getFullYear())
          
          return (
          <g
            key={tickValue}
            className="tick"
            transform={`translate(${xScale(tickValue)}, 0)`}
          >
            <text
              style={{ textAnchor: "middle" }}
              dy=".71em"
              y={innerHeight + tickOffset}
              x={50}
            >
              {
                tickYears(tickValue)
              
              }
            </text>
            <line y2={innerHeight} />
          </g>
        )})}

        {/*Y axis*/}
        {yScale.ticks().map(tickValue => {
         return (
          <g transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text
              dy=".4em"
              x={-margin.left}
            
            >{tickValue}</text>
          </g>
        )}
        )}

        {/*MARKS*/}
        <g className="mark">
  <path
    fill="none"
    stroke="black"
    d={line()
      .curve(curveNatural)
      .x(d => xScale(xValue(d))) 
      .y(d=> yScale(yValue(d)))(data)
    	}
    />
    </g>

      </g>
    </svg>
  );
};
