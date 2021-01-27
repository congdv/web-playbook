
function range(start, end, step = 1) {
  let arr = [];
  let sign = 1;
  if(step < 0) {
    sign = -1;
  }
  start = start * sign;
  end = end * sign;
  while(start <= end) {
    arr.push(start * sign)
    start += step*sign;
  }

  return arr;
}

function sum(arr) {
  let s = 0;
  for(let n of arr) {
    s+=n;
  }
  return s;
}

console.log(sum(range(1,10)))
console.log(sum(range(1,10,2)))
console.log(range(1,10,2))
console.log(range(5,2,-1))

function reverseArray(arr) {
  let newArr = [];
  for(let i = arr.length -1 ; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
}

function reverseArrayInPlace(arr){
  let left = 0;
  let right = arr.length - 1;
  while(left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}

console.log(reverseArray([1,2,3,4,5,6]))
console.log(reverseArrayInPlace([1,2,3,4,5,6]))

function arrayToList(arr) {
  let list = null;
  for(let i = arr.length - 1; i >= 0; i--) {
    list = {value: arr[i], rest: list};
  }
  return list;
}

console.log(arrayToList([1,2,3]))

function listToArray(list){
  let arr = [];
  while(list !== null) {
    arr.push(list.value);
    list = list.rest;
  }

  return arr;
}

console.log(listToArray(arrayToList([1,2,3])));

function deepEqual(obj1, obj2) {
  if(typeof obj1 === typeof obj2 && typeof obj1 === 'object') {
    if(Object.keys(obj1).length === Object.keys(obj2).length) {
      for(let key of Object.keys(obj1)) {
        if(!(key in obj2)) {
          return false;
        } else {
          if(obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
      return true;
    }
  }
  return fasle;
}

console.log(deepEqual({value: 1}, {value: 2}))
