import type { Map } from 'leaflet'

import { Modal } from 'jobseeker-ui'
import React, { useEffect, useRef, useState } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

type MapsPreviewerModalProps = {
  coordinates?: [number, number] | null
  radiusCoordinates?: [number, number] | null
  radius?: number
  zoom?: number
  onClose: () => void
}

const MapsPreviewerModal: React.FC<MapsPreviewerModalProps> = ({ coordinates, radiusCoordinates, radius, zoom, onClose }) => {
  const [data, setData] = useState<{
    coordinates: [number, number]
    radiusCoordinates?: [number, number] | null
    radius?: number
    zoom?: number
  }>()
  const ref = useRef<Map>(null)

  useEffect(() => {
    if (coordinates) {
      setData({ coordinates, radiusCoordinates, radius, zoom })
      setTimeout(() => {
        ref.current?.invalidateSize()
      }, 100)
    }
  }, [coordinates, radiusCoordinates, radius, zoom])

  if (!data) return null

  return (
    <Modal show={!!coordinates} onClose={() => onClose?.()}>
      <MapContainer
        ref={ref}
        center={data.coordinates}
        zoom={data.zoom || 15}
        className="h-[600px] max-h-[90vh] w-full overflow-hidden rounded-lg"
        attributionControl={false}
      >
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
        {radius && radiusCoordinates && (
          <Circle center={radiusCoordinates} className="fill-primary-600 stroke-primary-600" radius={radius}>
            <Popup>
              <div>
                <h3 className="text-lg font-semibold">Area Details</h3>
                <p>{radius}m radius</p>
              </div>
            </Popup>
          </Circle>
        )}
      </MapContainer>
    </Modal>
  )
}

export default MapsPreviewerModal
