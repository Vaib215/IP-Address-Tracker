let input = document.querySelector('.search_wrapper input');
let button = document.querySelector('.search_wrapper button');

// Functions

const addMap = (lat, lng) => {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    // add marker
    new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}

const searchRequest = () => {
    let search = input.value;
    let domain = ''
    if (search.includes('http') || search.includes('.com') || search.includes('.net') || search.includes('.org')) {
        // search is domain
        domain = search;
        search = ''
    }
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_tiNzXjCx1LOkc5UcNKe567PKO4iy6&ipAddress=${search}&domain=${domain}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            timezone.innerHTML = `UTC ${data.location.timezone}`;
            ip.innerHTML = `${data.ip}`;
            locate.innerHTML = `${data.location.city}, ${data.location.country}, ${data.location.postalCode || data.location.region}`;
            isp.innerHTML = `${data.isp}`;
            addMap(data.location.lat, data.location.lng);
        })
        .catch(error => console.log(error));
}

mapboxgl.accessToken = 'pk.eyJ1IjoidmFpYjIxNSIsImEiOiJjbDRzNTVqNnEwOTNyM2tsYXdhZGw0c2V6In0.6rCOzRdWRFkwfFrKuoV0qA';

searchRequest();

// Event Listeners
button.addEventListener('click', searchRequest);
// Add event listener to input on pressing enter
input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        searchRequest();
    }
}
)
