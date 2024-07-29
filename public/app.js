var map = L.map('map');
let amenity = "hospital";
let pincode = "560078";
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function listItem (title, type, address, lat, lon) {
    return `
    <div class="list-element">
        <div class="list-col">
            <p class="list-title" data-lat=${lat} data-lon=${lon}>${title}</p>
            <p class="list-type">${type}</p>
            <p class="list-address">${address}</p>
        </div>
        <a href="https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lon}&zoom=18" target="_blank">
            <button class="list-button">
                <img src="pop-in-new.svg">
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
    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&bounded=1&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let location = data[i];
                    map.setView([location.lat, location.lon], 14);
                    let loc_mark = L.marker([location.lat, location.lon]).addTo(map);
                    let popUpContent = `<p class="popup-title list-title">${location.name}</p>`;
                    loc_mark.bindPopup(popUpContent);
                    $("#results").append(listItem(location.name, capitalizeFirstLetter(location.type), location.display_name, location.lat, location.lon));
                }
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
    searchLocation(`${amenity}s+near+${pincode}`);
});