maptilersdk.config.apiKey = mapToken;

async function initMap() {
    try {
        const mapContainer = document.getElementById('map');
        const locationStr = mapContainer.dataset.location || (typeof listingLocation !== 'undefined' ? listingLocation : '');
        
        let coords = [77.2090, 28.6139]; // Default coordinates (e.g. New Delhi)
        let zoomLevel = 9;

        if (locationStr) {
            const geocodeUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(locationStr)}.json?key=${mapToken}`;
            const response = await fetch(geocodeUrl);
            const data = await response.json();

            if (data && data.features && data.features.length > 0) {
                coords = data.features[0].center; // [lng, lat]
            }
        }

        const map = new maptilersdk.Map({
            container: 'map',
            style: maptilersdk.MapStyle.STREETS,
            center: coords,
            zoom: zoomLevel
        });

        if (locationStr) {
            new maptilersdk.Marker({ color: "#FF0000" })
                .setLngLat(coords)
                .setPopup(
                    new maptilersdk.Popup({ offset: 25 })
                    .setHTML(`<h5>${locationStr}</h5><p>Exact location provided after booking.</p>`)
                )
                .addTo(map);
        }
    } catch (err) {
        console.error("Error loading map:", err);
    }
}

initMap();
