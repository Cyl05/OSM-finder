var map = L.map('map');
let amenity = "hospital";
let pincode = "560078";
let markerGroup;
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{attribution}', {
    foo: 'bar',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var locIcon = L.icon({
        iconUrl: './images/location.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
});

function listItem (title, type, address, lat, lon) {
    return `
    <div class="list-element">
        <div class="list-col">
            <p class="list-title" data-lat=${lat} data-lon=${lon}>${title}</p>
            <p class="list-type">${type}</p>
            <p class="list-address">${address}</p>
        </div>
        <a href="https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lon}&zoom=20" target="_blank">
            <button class="list-button">
                <img src="./images/pop-in-new.svg">
            </button>
        </a>
    </div>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function zoomIntoLoc(loc) {
    map.setView([loc.data("lat"), loc.data("lon")], 17);
}

function searchLocation(query) {
    console.log(query);
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&bounded=0.1&limit=10&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                $(".list-element").remove();
                if (markerGroup) {
                    map.removeLayer(markerGroup);
                }
                markerGroup = L.layerGroup().addTo(map);
                for (let i = 0; i < data.length; i++) {
                    
                    let location = data[i];
                    L.marker([location.lat, location.lon]).addTo(markerGroup).bindPopup(`<p class="popup-title list-title">${location.name}</p>`);
                    $("#results").append(listItem(location.name, capitalizeFirstLetter(location.type), location.display_name, location.lat, location.lon));
                }
                map.setView([data[0].lat, data[0].lon], 13);
                $(".list-title").on("click", function() {
                    zoomIntoLoc($(this))
                });
            } else {
                alert("Location not found");
            }
        });
}

$("#btn-submit").on("click", () => {
    amenity = $("#amenity").val();
    pincode = $("#pincode").val();
    searchLocation(`${amenity}+near+${pincode}`);
});

$("#current-loc").on("click", function() {
    amenity = $("#amenity").val();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            let coords = `${position.coords.latitude}%2C+${position.coords.longitude}`;
            searchLocation(`${amenity}+near+${coords}`);
            L.marker([position.coords.latitude, position.coords.longitude], {icon: locIcon}).addTo(map).bindPopup("Your location");
        });
    }
});