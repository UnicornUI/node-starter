function getArrayData() {
  let dataArray = [];
  for (let i = 0; i < 100; i++) {
    dataArray.push("line" + i);
  }
  console.log(dataArray);
  return dataArray;
}

export { getArrayData };
