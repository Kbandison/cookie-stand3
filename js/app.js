'use strict';

let storeDiv = document.getElementById('store');
let table = document.getElementById('storeTable');

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let cookieStores = [];

function randomCustPerHour(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Store(city, min, max, avgCookie) {
  this.city = city;
  this.min = min;
  this.max = max;
  this.avgCookie = avgCookie;
  this.total = 0;
  this.custPerHour = [];
  this.cookieSoldPerHour = [];

  cookieStores.push(this);
}
Store.prototype.getCustPerHour = function(){
  for (let i = 0; i < hours.length; i++){
    this.custPerHour.push(randomCustPerHour(this.min, this.max));
  }
};

Store.prototype.getcookieSoldPerHour = function(){
  this.getCustPerHour();
  for (let i = 0; i < hours.length; i++) {
    let cookiePerHour = Math.ceil(this.custPerHour[i] * this.avgCookie);
    this.cookieSoldPerHour.push(cookiePerHour);
    this.total += cookiePerHour;
  }
};

Store.prototype.render = function() {

  this.getcookieSoldPerHour();
  let divElem = document.createElement('div');
  storeDiv.appendChild(divElem);

  let h1Elem = document.createElement('h1');
  h1Elem.textContent = this.city;
  divElem.appendChild(h1Elem);

  let ulElem = document.createElement('ul');
  divElem.appendChild(ulElem);


  for(let i = 0; i < hours.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
    ulElem.appendChild(liElem);
  }

  let liElem = document.createElement('li');
  liElem.textContent = `Total: ${this.total} cookies`;
  ulElem.appendChild(liElem);

  let row = document.createElement('tr');
  table.appendChild(row);

  let th1 = document.createElement('th');
  th1.textContent = `${this.city}`;
  row.appendChild(th1);
};

const seattleStore = new Store('Seattle', 23, 65, 6.3);
const tokyoStore = new Store('Tokyo', 3, 24, 1.2);
const dubaiStore = new Store('Dubai', 11, 38, 3.7);
const parisStore = new Store('Paris', 20, 38, 2.3);
const limaStore = new Store('Lima', 2, 16, 4.6);

seattleStore.render();
tokyoStore.render();
dubaiStore.render();
parisStore.render();
limaStore.render();
