'use strict'

let storeDiv = document.getElementById('store');

this.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

function randomCustPerHour(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let cookieStores = [];

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
cookieStores.prototype.getCustPerHour = function () {
    for (let i = 0; i < hours.length; i++)
      this.custPerHour.push(randomCustPerHour(this.min, this.max));
  }


cookieStores.prototype.getcookieSoldPerHour = function () {
    this.getCustPerHour();
    for (let i = 0; i <= hours.length; i++) {
      let cookiePerHour = (Math.ceil(this.custPerHour[i] * this.avgCookie));
      this.cookieSoldPerHour.push(cookiePerHour);
      this.total += cookiePerHour;
    }


cookieStores.prototype.render = function() {
  let divElem = document.createElement('div');
  storeDiv.appendChild(divElem);

  let h1Elem = document.createElement('h1');
  h1Elem.textContent = this.name;
  divElem.appendChild(h1Elem);

  let ulElem = document.createElement('ul');
  divElem.appendChild(ulElem);

  for(let i = 0; i < this.hours.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${this.hours[i]}: ${this.cookieSoldPerHour[i]}cookies`;
    ulElem.appendChild(liElem);
  }

  let liElem = document.createElement('li');
  liElem.textContent = `Total: ${this.total}`;
  ulElem.appendChild(liElem);


}
  
const seattleStore = new Store('Seattle', 23, 65, 6.3);
const tokyoStore = new Store('Tokyo', 3, 24, 1.2);
const dubaiStore = new Store('Dubai', 11, 38, 3.7);
const parisStore = new Store('Paris', 20, 38, 2.3);
const limaStore = new Store('Lima', 2, 16, 4.6);


Store.render();
