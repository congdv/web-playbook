
function min(a, b) {
  return a < b ? a : b;
}

console.log(min(2, 3));

function isEven(a) {
  if(a === 0) {
    return true;
  } else if(a === 1) {
    return false;
  } else if(a < 0) {
    return isEven(a + 2);
  }
  return isEven(a-2);
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));

function count(str, char) {
  let count = 0;
  for(let i = 0; i < str.length; i++) {
    count += str[i] === char ? 1 : 0;
  }
  return count;
}

function countChar(str, char) {
  return count(str,char);
}

console.log(count('BABABABA'));
console.log(countChar('BABABABA', 'A'));
console.log(countChar('BABABABA', 'B'));
