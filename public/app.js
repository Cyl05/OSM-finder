var map = L.map('map');
let amenity = "hospital";
let pincode = "560078";
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function listItem (title, type, address) {
    return `
    <div class="list-element">
        <div class="list-col">
            <p class="list-title">${title}</p>
            <p class="list-type">${type}</p>
            <p class="list-address">${address}</p>
        </div>
        <button class="list-button">
            <img src="pop-in-new.svg">
        </button>
    </div>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchLocation(query) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&bounded=1&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                    var location = data[i];
                    map.setView([location.lat, location.lon], 14);
                    L.marker([location.lat, location.lon]).addTo(map);
                    $("#results").append(listItem(location.name, capitalizeFirstLetter(location.type), location.display_name));
                }
            } else {
                alert("Location not found");
            }
        });
}

$("#btn-submit").on("click", () => {
    amenity = $("#amenity").val();
    pincode = $("#pincode").val();
    searchLocation(`${amenity}s+near+${pincode}`);
});