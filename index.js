
let coords = [12.96415, 77.58454];

var map = L.map('map').setView(coords, 18);
// var marker = L.marker(coords).addTo(map);

map.addControl(L.control.search({ position: 'bottomright' }));

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
