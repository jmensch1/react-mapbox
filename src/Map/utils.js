
function randomLng(east, west) {
  return west + Math.random() * (east - west)
}

function randomLat(south, north) {
  return south + Math.random() * (north - south)
}

export function getRandomPointsWithinMap(map, numPoints) {
  const bounds = map.getBounds()

  const west = bounds.getWest()
  const east = bounds.getEast()
  const south = bounds.getSouth()
  const north = bounds.getNorth()

  const geojson = {
    type: 'FeatureCollection',
    features: []
  }

  Array.from({ length: numPoints }).forEach(() => {
    geojson.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          randomLng(west, east),
          randomLat(south, north),
        ]
      }
    })
  })

  return geojson
}
