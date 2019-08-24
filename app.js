'use strict';

var storeListEl = document.getElementById('store-list');

//Store 1 object
var pike = {
  name: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  saleAverage: 6.3,
};
// function randomNumber() {
//   return pike.maxCust()
// }

//Store 2 object
var seaTac = {
  name: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  saleAverage: 1.2,
};

var seattleCenter = {
  name: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  saleAverage: 3.7,
};

var capitolHill = {
  name: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  saleAverage: 2.3,
};

var alki = {
  name: 'Alki',
  minCust: 2,
  maxCust: 16,
  saleAverage: 4.6,
};



var stores = [pike, seaTac, seattleCenter, capitolHill, alki];
var hourlyTotal = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function random(min, max){
  return Math.random() * (max - min) + min;
}


function render(){
  for(var i = 0; i < stores.length; i++){
    // Create <li>
    var liEl = document.createElement('li');
    // Adding store name as content to <li>
    liEl.textContent = stores[i].name;
    // Add <li> to end of <ul>
    storeListEl.appendChild(liEl);

    var total = 0;
    // Creating a <ul> that will hold the number of cookies
    var ul = document.createElement('ul');
    for(var j = 0; j < hourlyTotal.length; j++){
      //Calculate random number of customers
      var numCustomers = random(stores[i].minCust, stores[i].maxCust);
      //Calbulcate number of cookies
      var numCookies = numCustomers * stores[i].saleAverage;
      var numCookiesWhole = Math.round(numCookies);
      total = total + numCookiesWhole;
      //Create <li>
      var li = document.createElement('li');
      //Add number of cookies as content to <li>
      li.textContent = `${hourlyTotal[j]}: ${numCookiesWhole} cookies`;
      //add <li> to end of <ul>
      ul.appendChild(li);
      // Calulate the sum of each our of cookies

    }

    li = document.createElement('li');
    li.textContent = `Total: ${total} cookies`;
    ul.appendChild(li);
    storeListEl.appendChild(ul);


  }


}





render();