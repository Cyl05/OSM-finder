var map = L.map('map').setView([51.505, -0.09], 13);
let amenity = "hospital";
let postalcode = "560078";

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Function to perform the search
function searchLocation(query) {
    fetch(`https://nominatim.openstreetmap.org/search?${query}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var location = data[0];
                map.setView([location.lat, location.lon], 14);
                L.marker([location.lat, location.lon]).addTo(map);
            } else {
                alert("Location not found");
            }
        });
}

// Example usage
searchLocation(`amenity=${amenity}&postalcode=${postalcode}`);