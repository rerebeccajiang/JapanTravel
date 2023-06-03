mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: oneplace.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

//make a marker and add to map
new mapboxgl.Marker()
    .setLngLat(oneplace.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${oneplace.name}</h3><p>${oneplace.location}</p>`
            )
    )
    .addTo(map);