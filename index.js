'use strict';
const mapDisplay = document.querySelector('#map')
const searchArrow = document.querySelector('.search-arrow')
const input = document.querySelector('.input')
const ipLocation = document.querySelector('.location')
const ipBoard = document.querySelector('.ip-board')
const ipAddress = document.querySelector('.ip-address')
const timezone = document.querySelector('.timezone')
const isp = document.querySelector('.isp')
const arrow = document.querySelector('.arrow')
let map;
let ready = false

// display ip board
 const displayBoard = function(i){
   ipAddress.textContent = i.ip
   ipLocation.textContent = i.location.city
   timezone.textContent = i.location.timezone;
   isp.innerText = i.isp
 }
// displaymap
const displayMap = function(lat, lng){
  map = L.map('map').setView([lat, lng], 13);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup('you are currently here')
    .openPopup();
}
// getaddress
const getaddress = async function(address){
 try {
  ready = true
 const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_QhIHHTLcND0reC4R0ZrwRwZBABbhL&ipAddress=${address}`)
 const data = await res.json()
 displayMap(data.location.lat, data.location.lng)
 displayBoard(data)
 } catch (err) {
  alert('wrong ip-address refresh page')
  console.error(`check ip address well: ${err}. try again`)
 }
}
getaddress('')
searchArrow.addEventListener('click', function(){
  const inputValue = input.value
  const v = String(inputValue)
  getaddress(v)
  input.value = ''
})  
input.addEventListener('click', function(){
  if(ready === true){
    map.remove()
  }
  ready = false
  })
