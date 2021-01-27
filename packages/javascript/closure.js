
let a = 1;
function addTo(num, calculate){
  if(num === 0) {
    return calculate;
  } else {
    return () => {
      return a + 3;
    }
  }
}

function calculate() {
  console.log(a)
  return a + 333;
}

const result = addTo(1,calculate);
console.log(result());

const result1 = addTo(0,calculate);
console.log(result1());