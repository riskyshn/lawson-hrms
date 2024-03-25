import type { Map } from 'leaflet'

import React, { useEffect, useRef, useState } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import FullScreenModal from './FullScreenModal'
import 'leaflet/dist/leaflet.css'

type MapsPreviewerProps = {
  coordinates?: [number, number] | null
  radius?: number
  zoom?: number
  onClose: () => void
}

const MapsPreviewer: React.FC<MapsPreviewerProps> = ({ coordinates, radius, zoom, onClose }) => {
  const [data, setData] = useState<{ coordinates: [number, number]; radius?: number; zoom?: number }>()
  const ref = useRef<Map>(null)

  useEffect(() => {
    if (coordinates) {
      setData({ coordinates, radius, zoom })
      setTimeout(() => {
        ref.current?.invalidateSize()
      }, 100)
    }
  }, [coordinates, radius, zoom])

  if (!data) return null

  return (
    <FullScreenModal show={!!coordinates} onClose={() => onClose?.()}>
      <MapContainer ref={ref} center={data.coordinates} zoom={data.zoom || 15} className="h-full w-full" attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={data.coordinates}>
          <Popup>
            <div className="text-lg font-semibold">
              <h3>Location Details</h3>
              <p>Latitude: {data.coordinates[0]}</p>
              <p>Longitude: {data.coordinates[1]}</p>
            </div>
          </Popup>
        </Marker>
        {radius && (
          <Circle center={data.coordinates} className="fill-primary-600 stroke-primary-600" radius={radius}>
            <Popup>
              <div>
                <h3 className="text-lg font-semibold">Area Details</h3>
                <p>{radius}m radius</p>
              </div>
            </Popup>
          </Circle>
        )}
      </MapContainer>
    </FullScreenModal>
  )
}

export default MapsPreviewer
