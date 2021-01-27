let object1 = {value: 10};
let object2 = object1;

let object3 = {value: 10};

console.log(object1 == object2);
console.log(object1 === object2);
console.log(object1 === object3);

object1.value = 15;
console.log(object2.value);
console.log(object2.value);

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove([3,2,3,211,11,13], 2));
