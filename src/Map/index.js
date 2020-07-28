import React from 'react'
import mapboxgl from 'mapbox-gl'
import { getRandomPointsWithinMap } from './utils'
import boundaries from './LAPD-divisions.geojson'

mapboxgl.accessToken = ''

class Map extends React.Component {

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.4, 34],
      zoom: 9,
    })

    this.map.on('load', () => {
      this.addPointsSource()
      this.addPointsLayer()

      this.addBoundarySource()
      this.addBoundaryLineLayer()
      this.addBoundaryFillLayer()

      console.log(this.map.getStyle())
    })
  }

  addPointsSource = () => {
    this.map.addSource('random-points', {
      type: 'geojson',
      data: getRandomPointsWithinMap(this.map, 50)
    })
  }

  addPointsLayer = () => {
    this.map.addLayer({
      id: 'random-points-circle',
      source: 'random-points',
      type: 'circle',
      paint: {
        'circle-radius': 6,
        'circle-color': '#FF0000',
      },
    })
  }

  addBoundarySource = () => {
    this.map.addSource('boundaries', {
      type: 'geojson',
      data: boundaries,
    })
  }

  addBoundaryLineLayer = () => {
    this.map.addLayer({
      id: 'boundaries-line',
      source: 'boundaries',
      type: 'line',
      paint: {
        'line-width': 2,
        'line-dasharray': [3, 1],
      },
    })
  }

  addBoundaryFillLayer = () => {
    this.map.addLayer({
      id: 'boundaries-fill',
      source: 'boundaries',
      type: 'fill',
      paint: {
        'fill-color': '#00FF00',
        'fill-opacity': 0.25,
      },
    })
  }

  render() {
    return (
      <div
        ref={el => this.mapContainer = el}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    )
  }
}

export default Map
