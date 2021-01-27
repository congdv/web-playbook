/**
const wait = time => new Promise((resolve) => setTimeout(resolve, time));

wait(3000).then(() => console.log('Hello World'));
console.log('Go first')

*/

//ES5

var isMomHappy = true;

var willGetNewPhone = new Promise(function(resolve, reject){
  if(isMomHappy) {
    var phone = {
      brand: 'Samsung',
      color: 'black'
    }
    resolve(phone);//Fulfilled
  } else {
    var reason = new Error('Mom is not happy');
    reject(reason);
  } 
})




var showOff = function(phone) {
  return new Promise((resolve, reject) => {
    const message = `Hey friend I have new phone ${phone.brand} ${phone.color} phone`;
    resolve(message);
  })
}

var askMom = function() {
  willGetNewPhone
  .then(showOff)
  .then(function (fulfilled) {
    console.log(fulfilled)
  })
  .catch(function(error) {
    console.log(error.message);
  })
}

askMom();