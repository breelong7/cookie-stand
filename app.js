/* eslint-disable no-console */
'use strict';

var formEl = document.getElementById('store-form');

var storeTableEl = document.getElementById('store-table');
var allStores = [];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


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
  this.hourlyCookieSalesArr = [];

  allStores.push(this);
  // console.log(this.hourlyCookieSalesArr);
}


new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);



//calculate number of cookies needed per hour and push to hourly cookies sales array
Store.prototype.calculateCookies = function(){
  for (var i = 0; i < hours.length; i++){

    //calculate random number of customers
    var randomNumberOfCustomers = random(this.minCustomer, this.maxCustomer);
    // console.log('print random number of customers', randomNumberOfCustomers);

    //Calulcate number of cookies needed
    var cookies = Math.floor(randomNumberOfCustomers) * Math.floor(this.cookieSalesAverage);
    this.hourlyCookieSalesArr.push(cookies);
  }
};

//create function to print each our to table
function printHours(){
  //create tr element
  var trEl = document.createElement('tr');
  var locationHours = document.createElement('td');
  locationHours.textContent = 'Location/Hours';
  trEl.appendChild(locationHours);
  //append tr element to table
  storeTableEl.appendChild(trEl);
  //loop through each hour and print to page
  for(var i = 0; i < hours.length; i++){
    //declare table data variable to create td element
    var tdEl = document.createElement('td');
    //add hours array at index as text content for table data element
    tdEl.textContent = hours[i];
    //append table data to table row
    trEl.appendChild(tdEl);
  }
  var total = document.createElement('td');
  total.textContent = 'Daily Location Total';
  trEl.appendChild(total);
}

printHours();



// function to calculate daily total cookies per store

Store.prototype.dailyTotal = function(){
  //invoke function that calculate total
  this.calculateCookies();

  //loop through hourly cookie sales array, get the sum of total number of cookies plus hourly cookie sales array

  for (var i = 0; i < this.hourlyCookieSalesArr.length; i++) {
    this.totalNumberOfCookies += this.hourlyCookieSalesArr[i];
  }
};

for (var j = 0; j < allStores.length; j++){
  allStores[j].dailyTotal();
}



Store.prototype.render = function(){


  //make a tr
  var trEl = document.createElement('tr');
  //append tr to table
  storeTableEl.appendChild(trEl);


  //create a td
  var tdEl = document.createElement('td');
  //fill with store name
  tdEl.textContent = this.storeName;
  //stick it to the DOM
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.hourlyCookieSalesArr[i];
    trEl.appendChild(tdEl);
    // console.log(this.hourlyCookieSalesArr[i] + ':' + hours[i]);
  }

  //create a td
  tdEl = document.createElement('td');
  //fill with number of cookies needed
  tdEl.textContent = this.totalNumberOfCookies;
  //stick it to the DOM
  trEl.appendChild(tdEl);

};


//function to print stores
function printAllStores() {
  for (var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }

}

printAllStores();

//create footer
function renderFooter() {
  // declare footer variable and create tfoot element
  var tfootEl = document.createElement('tfoot');
  //append tfoot to table
  storeTableEl.appendChild(tfootEl);
  //declare table row variable with tr element
  var trEl = document.createElement ('tr');
  //append table row to table foot
  tfootEl.appendChild(trEl);
  var tdEl = document.createElement('td');
  //add Totals as text content to table data element
  tdEl.textContent = 'Totals';
  //append table data to table row
  trEl.appendChild(tdEl);

  //nested for loop to loop through each hour
  for (var currentHour = 0; currentHour < hours.length; currentHour++){
    var totalPerHour = 0;
    //nested loop to loop through each store's total cookies per hour
    for (var store = 0; store < allStores.length; store++ ){
      totalPerHour += allStores[store].hourlyCookieSalesArr[currentHour];
    }

    //add total per hour as table data
    tdEl = document.createElement('td');
    storeTableEl.appendChild(trEl);
    trEl.appendChild(tdEl);
    tdEl.textContent = totalPerHour;

  }

  //declare grand total variable
  var grandTotal = 0;
  //loop through each hour in hours array
  for(var i = 0; i < hours.length; i++){
    //declare hour total variable to store total per location
    var hourTotal = 0;
    //loop through stores to get sum of hourly totals
    for (var k = 0; k < allStores.length; k++){
      hourTotal += allStores[k].hourlyCookieSalesArr[i];
      // console.log('hour total', hourTotal);
      // console.log('grand total', grandTotal);
    }
    //grand total equals sum of hourly totals
    grandTotal += hourTotal;
  }
  //create td element, fill with grand total var, stick to dom
  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);
}


// forms

//add event listener to submit
formEl.addEventListener('submit', handleFormSubmit);
// function to handle a form submission
function handleFormSubmit(e) {
  console.log(e);
  //prevent automatic page refresh
  e.preventDefault();
  
  //get input from store name box
  var storeName = e.target.storeName.value;
  //get input from min customer box
  var minCustomer = parseInt(e.target.minCustomer.value);
  //get input from max customer box
  var maxCustomer = parseInt(e.target.maxCustomer.value);
  //get input from cookie sales average box
  var cookieSalesAverage = parseInt(e.target.cookieSalesAverage.value);
  
  //create new Store instance
  new Store(storeName, minCustomer, maxCustomer, cookieSalesAverage);
  storeTableEl.innerHTML = '';
  console.log('clicked');

  allStores[allStores.length - 1].dailyTotal();

  printHours();
  printAllStores();
  renderFooter();
}


renderFooter();