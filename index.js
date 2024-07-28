var map = L.map('map');
let amenity = "hospital";
let pincode = "560078";
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Function to perform the search
function searchLocation(query) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&bounded=1&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                    var location = data[i];
                    map.setView([location.lat, location.lon], 14);
                    L.marker([location.lat, location.lon]).addTo(map);
                }
            } else {
                alert("Location not found");
            }
        });
}

// Example usage
searchLocation(`${amenity}s+near+${pincode}`);