'use strict';

// Global Variables
let allLocations = [];


// ========== Form Stuff ================= //
let addLocationForm = document.getElementById('addLocation');

addLocationForm.addEventListener('submit', addALocation);

function addALocation(event){
  event.preventDefault();
  // get params from inputs
  let param1 = event.target.cityName.value;
  let param2 = event.target.min.value;
  let param3 = event.target.max.value;
  let param4 = event.target.avgCookies.value;
  let param5 = 6;
  let param6 = 20;

  // get those things and pass them into constructor
  let newCity = new StoreLocation(param1, param2, param3, param4, param5, param6);

  let footerElement = document.getElementById('footer');
  footerElement.parentNode.removeChild(footerElement); // referenced where I got this in the README

  // render that city in the table
  newCity.renderTableData(); // BUT it needs to go ABOVE TOTALS row
  renderTableFooter(allLocations); 
}


// Constructor function
function StoreLocation (location, min, max, avgCookies, openHour, closeHour) {
  this.location = location;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgCookiesPerCustomer = avgCookies;
  this.openHour = openHour; 
  this.closeHour = closeHour; 

  this.hoursList = []; 
  this.cookiesPerHourArray = [];

  this.calculateCookiesForOpenHours();

  // add the new instance to the array
  allLocations.push(this);
};

StoreLocation.prototype.generateCustomersPerHour = function () {
  let min = this.minCustomers;
  let max = this.maxCustomers;
  let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; // see README for resources
  return random;
};

StoreLocation.prototype.refactorHours = function () {
  for (let i = this.openHour; i < this.closeHour; i++) {
    if (i < 12) {
      this.hoursList.push(i + ':00am');
    } else if (i === 12) {
      this.hoursList.push(i + ':00pm');
    } else if (i > 12) {
      this.hoursList.push((i - 12) + ':00pm');
    }
  }
  return this.hoursList;
};

StoreLocation.prototype.calculateCookiesForOpenHours = function () {
  this.refactorHours();

  for (let i = this.openHour; i < this.closeHour; i++) {
    let cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
    this.cookiesPerHourArray.push(cookiesEachHour);
  };
  return this.cookiesPerHourArray;
};

StoreLocation.prototype.dailyLocationTotal = function() {
  let sumOfCookies = 0;
  for (let i = 0; i < this.cookiesPerHourArray.length; i++) { 
    sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
  }
  return sumOfCookies;
};

StoreLocation.prototype.renderTableData = function () {
  let table = document.getElementById('cookieData');
  let row = document.createElement('tr');

  // city name cell
  let cityNameCell = document.createElement('th');
  cityNameCell.textContent = this.location;
  row.appendChild(cityNameCell);

  // cookie data x 14
  for (let i = 0; i < this.hoursList.length; i++) {
    let tableDataCell = document.createElement('td');
    tableDataCell.textContent = this.cookiesPerHourArray[i];
    row.appendChild(tableDataCell);
  }

  let tableDataCell = document.createElement('td');
  tableDataCell.textContent = this.dailyLocationTotal();
  row.appendChild(tableDataCell);

  table.appendChild(row);
};

function renderTableHeaders () {
  let table = document.getElementById('cookieData');
  let row = document.createElement('tr');
  let tableHeadCell = document.createElement('th');
  row.appendChild(tableHeadCell);

  // hour of the day headers
  for (let i = 0; i < allLocations[0].hoursList.length; i++) {
    tableHeadCell = document.createElement('th');
    tableHeadCell.textContent = allLocations[0].hoursList[i];
    row.appendChild(tableHeadCell);
  }
  // total header
  tableHeadCell = document.createElement('th');
  tableHeadCell.textContent = 'Daily Location Total';
  row.appendChild(tableHeadCell);

  table.appendChild(row);
}

function renderTableFooter (allLocations) {
  let table = document.getElementById('cookieData');
  let row = document.createElement('tr');
  let tableFootCell = document.createElement('th');
  let hoursOfDay = 14;
  tableFootCell.textContent = 'Totals';
  row.appendChild(tableFootCell);

  let cookieTotalArray = [];
  // to look at 14 hours of the day for 14 totals cells
  for (let i = 0; i < hoursOfDay; i++) {
    let cookieTotal = 0;
    // add up each index from all locations
    for (let j = 0; j < allLocations.length; j++) {
      cookieTotal = cookieTotal + allLocations[j].cookiesPerHourArray[i];
    }
    cookieTotalArray.push(cookieTotal);
    tableFootCell = document.createElement('td');
    tableFootCell.textContent = cookieTotalArray[i];
    row.appendChild(tableFootCell);
  }

  let superTotal = 0;
  for (let i = 0; i < allLocations.length; i++) {
    superTotal = superTotal + allLocations[i].dailyLocationTotal();
  }
  tableFootCell = document.createElement('td');
  tableFootCell.textContent = superTotal;
  row.appendChild(tableFootCell);
  row.id = 'footer';
  table.appendChild(row);
}

// initial assignment store instances'
new StoreLocation('Seattle', 23, 65, 6.3, 6, 20);
new StoreLocation('Tokyo', 3, 24, 1.2, 6, 20);
new StoreLocation('Dubai', 11, 32, 3.7, 6, 20);
new StoreLocation('Paris', 20, 38, 2.3, 6, 20);
new StoreLocation('Lima', 2, 16, 4.6, 6, 20);

// table headers function is called only once to keep just 1 row of times data
renderTableHeaders();

// loop through allLocations array to render table DATA for each new instance
for(let i = 0; i < allLocations.length; i++) {
  allLocations[i].renderTableData();
}

// footer ran 1 from global function adding hourly totals
renderTableFooter(allLocations);
