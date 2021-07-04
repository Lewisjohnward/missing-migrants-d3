

export const modifyData = data => {

  //Sort data with position 0 the furthest back in time
  const sortedData = data.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  })

  
  let count = 0
  sortedData.map(item => {
    
    count += item.total
    item.count = count
  })
  //Iterate over data calculating the cumulative deaths


  return sortedData;
};
