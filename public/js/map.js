/* Unified map initializer
   - Supports either `maptilersdk` (MapTiler JS SDK) or `maplibregl` (MapLibre) depending on which is loaded on the page
   - Uses MapTiler geocoding to resolve a location string (from `data-location` on the #map element)
   - Provides safe defaults and a popup when a location is available
*/

(async function () {
  const MAPTILER_KEY = typeof mapToken !== 'undefined' ? mapToken : (window.MAPTILER_KEY || '');
  const mapEl = document.getElementById('map');
  if (!mapEl) return; // no map element on page

  const locationStr = mapEl.dataset.location || (typeof listingLocation !== 'undefined' ? listingLocation : '');

  // Default to New Delhi [lng, lat]
  let coords = [77.2090, 28.6139];
  let zoom = 9;

  if (locationStr && MAPTILER_KEY) {
    const geocodeUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(locationStr)}.json?key=${MAPTILER_KEY}`;
    try {
      const res = await fetch(geocodeUrl);
      const body = await res.json();
      if (body && body.features && body.features.length) {
        // features[0].geometry.coordinates is [lng, lat]
        coords = body.features[0].geometry?.coordinates || body.features[0].center || coords;
        zoom = 12;
      }
    } catch (err) {
      console.error('Geocoding error', err);
    }
  } else if (!MAPTILER_KEY && locationStr) {
    console.warn('No MapTiler API key found; using default coordinates. Set `mapToken` to enable geocoding.');
  }

  // If page loaded MapTiler SDK
  if (typeof maptilersdk !== 'undefined' && maptilersdk && MAPTILER_KEY) {
    try {
      maptilersdk.config.apiKey = MAPTILER_KEY;
      const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: coords,
        zoom: zoom
      });

      if (locationStr) {
        new maptilersdk.Marker({ color: '#FF0000' })
          .setLngLat(coords)
          .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML(`<h5>${locationStr}</h5><p>Exact location provided after booking.</p>`))
          .addTo(map);
      }
      return;
    } catch (err) {
      console.error('maptilersdk init error', err);
    }
  }

  // If page loaded MapLibre GL / maplibregl
  if (typeof maplibregl !== 'undefined' && maplibregl) {
    try {
      const styleUrl = MAPTILER_KEY
        ? `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`
        : 'https://demotiles.maplibre.org/style.json';

      const map = new maplibregl.Map({
        container: 'map',
        style: styleUrl,
        center: coords,
        zoom: zoom
      });

      if (locationStr) {
        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`<h5>${locationStr}</h5><p>Exact location provided after booking.</p>`);
        new maplibregl.Marker({ color: '#FF0000' }).setLngLat(coords).setPopup(popup).addTo(map);
      }
      return;
    } catch (err) {
      console.error('maplibregl init error', err);
    }
  }

  console.warn('No supported mapping library found (maptilersdk or maplibregl).');
})();
