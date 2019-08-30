/* eslint-disable no-console */
'use strict';

var storeListEl = document.getElementById('store-list');
var allStores = [];
var hourlyTotal = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function random(min, max){
  return Math.random() * (max - min) + min;
}

//constructor for stores
function Store(storeName, minCustomer, maxCustomer, cookieSalesAverage){
  this.storeName = storeName;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.cookieSalesAverage = cookieSalesAverage;
  this.totalNumberOfCookies = 0;
  this.hourlyCookieSales = [];

  allStores.push(this);
}


new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


Store.prototype.calculateCookies = function(){
  for (var i = 0; i < hourlyTotal.length; i++){

    //calculate random number of customers
    var randomNumberOfCustomers = random(this.minCustomer, this.maxCustomer);
    // console.log('print random number of customers', randomNumberOfCustomers);

    //Calulcate number of cookies needed
    var cookies = Math.floor(randomNumberOfCustomers) * Math.floor(this.cookieSalesAverage);
    this.hourlyCookieSales.push(cookies);
  }
};


function printHours(){
  var thEl = document.createElement('th');

  storeListEl.appendChild(thEl);

  for(var i = 0; i < hourlyTotal.length; i++){
    thEl.appendChild(document.createElement('th')).
      appendChild(document.createTextNode(hourlyTotal[i]));
  }
}

printHours();




Store.prototype.dailyTotal = function(){
  this.calculateCookies();


  for (var i = 0; i < this.hourlyCookieSales.length; i++) {
    this.totalNumberOfCookies += this.hourlyCookieSales[i];
  }
};

for (var j = 0; j < allStores.length; j++){
  allStores[j].dailyTotal();
}


Store.prototype.hourRender = function(){
  for (var i = 0; i < hourlyTotal.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement ('td');
    tdEl.textContent = hourlyTotal[i];
    trEl.appendChild(tdEl);
  }
};

Store.prototype.hourRender();


Store.prototype.render = function(){


  //make a tr
  var trEl = document.createElement('tr');
  storeListEl.appendChild(trEl);


  //create a td
  var tdEl = document.createElement('td');
  //fill with store name
  tdEl.textContent = this.storeName;
  //stick it to the DOM
  trEl.appendChild(tdEl);

  for (var i = 0; i < hourlyTotal.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.hourlyCookieSales[i];
    trEl.appendChild(tdEl);
  }

  //create a td
  tdEl = document.createElement('td');
  //fill with number of cookies needed
  tdEl.textContent = this.totalNumberOfCookies;
  //stick it to the DOM
  trEl.appendChild(tdEl);

};



function printAllStores() {
  for (var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }

}

printAllStores();

function printAllHours() {
  for (var i = 0; i < hourlyTotal.length; i++) {
    hourlyTotal[i].render();
  }
}

printAllHours();


// function renderHeader(){
//   //make a tr and stick it to the DOM
//   var trEl = document.createElement('tr');
//   storeListEl.appendChild(trEl);

//   //put the store name in the DOM
//   var tdEl = document.createElement('td');
//   tdEl.textContent = ;
//   trEl.appendChild(tdEl);
// }

// renderHeader();
// for (var i = 0; i < allStores.length; i++){
//   allStores[i].render();
// }








// // //calculate random number of customers by using random function
//   var numCustomers = random(this.minCustomer, this.maxCustomer);
//   //Calulcate number of cookies needed
//   var numCookies = numCustomers * this.cookieSalesAverage;
//   var numCookiesWhole = Math.round(numCookies);
//   total = this.numberOfCookiesNeeded + numCookiesWhole;



// //Store 1 object
// var pike = {
//   name: '1st and Pike',
//   minCust: 23,
//   maxCust: 65,
//   saleAverage: 6.3,
// };
// // function randomNumber() {
// //   return pike.maxCust()
// // }

// //Store 2 object
// var seaTac = {
//   name: 'SeaTac Airport',
//   minCust: 3,
//   maxCust: 24,
//   saleAverage: 1.2,
// };

// var seattleCenter = {
//   name: 'Seattle Center',
//   minCust: 11,
//   maxCust: 38,
//   saleAverage: 3.7,
// };

// var capitolHill = {
//   name: 'Capitol Hill',
//   minCust: 20,
//   maxCust: 38,
//   saleAverage: 2.3,
// };

// var alki = {
//   name: 'Alki',
//   minCust: 2,
//   maxCust: 16,
//   saleAverage: 4.6,
// };



// var stores = [pike, seaTac, seattleCenter, capitolHill, alki];





// function render(){
//   for(var i = 0; i < stores.length; i++){
//     // Create <li>
//     var liEl = document.createElement('li');
//     // Adding store name as content to <li>
//     liEl.textContent = stores[i].name;
//     // Add <li> to end of <ul>
//     storeListEl.appendChild(liEl);

//     var total = 0;
//     // Creating a <ul> that will hold the number of cookies
//     var ul = document.createElement('ul');
//     for(var j = 0; j < hourlyTotal.length; j++){
//       //Calculate random number of customers
//       var numCustomers = random(stores[i].minCust, stores[i].maxCust);
//       //Calulcate number of cookies
//       var numCookies = numCustomers * stores[i].saleAverage;
//       var numCookiesWhole = Math.round(numCookies);
//       total = total + numCookiesWhole;
//       //Create <li>
//       var li = document.createElement('li');
//       //Add number of cookies as content to <li>
//       li.textContent = `${hourlyTotal[j]}: ${numCookiesWhole} cookies`;
//       //add <li> to end of <ul>
//       ul.appendChild(li);
//       // Calulate the sum of each our of cookies

//     }

//     li = document.createElement('li');
//     li.textContent = `Total: ${total} cookies`;
//     ul.appendChild(li);
//     storeListEl.appendChild(ul);


//   }


// }





// render();