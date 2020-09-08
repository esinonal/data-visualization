// example of how to export functions
// this particular util only doubles a value so it shouldn't be too useful
export function myExampleUtil (x) {
  return x * 2
}
/*
export function convertStringToNumber(str) {
  return Number(str.split(',').join(''));
} */
function convertStringToNumber (str) {
  return Number(str)
}

export function groupBy (data, accessorKey) {
  const result = {}

  for (let i = 0; i < data.length; i++) {
    // for (let [keyDataI, valueDataI] of Object.entries(data[i])){

    // if (keyDataI == accessorKey){ //We want to add this to our res.

    // var seen = 0;
    // if ([valueDataI] in result){
    //  seen = 1;
    // }
    const valueDataI = data[i][accessorKey]
    // Case 1: This value has been seen before. Then, add it onto that items list.
    if (result[valueDataI]) { 
      // for (let [keyResult, valueResult] of Object.entries(result)){
      // if (keyResult == valueDataI){

      result[valueDataI].push(data[i])
      // }
      // }
    }

    // Case 2: If value never seen before, create new .add to result list with this item.
    if (!result[valueDataI]) {
      result[valueDataI] = [data[i]]
    }
  }
  return result
}

export function buildStats (data, accessorKey) {
  let tMin = Infinity
  let tMax = -999999999
  let tSum = 0
  let tCount = 0
  // console.log("here");
  for (let i = 0; i < data.length; i++) { 
    // Then thru keys
    const value = data[i][accessorKey];
    
    const num = convertStringToNumber(value)

    if (num < tMin) {
      tMin = num
    }
    if (num > tMax) {
      tMax = num
    }
    tCount++
    tSum += num
}

  // YOUR CODE HERE
  return {
    min: tMin,
    max: tMax,
    sum: tSum,
    count: tCount,
    mean: tSum / tCount
  }
}
