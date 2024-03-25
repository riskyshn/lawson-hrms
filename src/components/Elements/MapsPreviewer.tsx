import { Map } from 'leaflet'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import FullScreenModal from './FullScreenModal'
import 'leaflet/dist/leaflet.css'

type MapsPreviewerProps = {
  coordinates?: [number, number] | null
  onClose: () => void
}

const MapsPreviewer: React.FC<MapsPreviewerProps> = ({ coordinates, onClose }) => {
  const [data, setData] = useState<[number, number]>()
  const ref = useRef<Map>(null)

  useEffect(() => {
    if (coordinates) {
      setData(coordinates)
      setTimeout(() => {
        ref.current?.invalidateSize()
      }, 100)
    }
  }, [coordinates])

  if (!data) return null

  return (
    <FullScreenModal show={!!coordinates} onClose={() => onClose?.()}>
      <MapContainer ref={ref} center={data} zoom={15} className="h-full w-full" attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={data} />
      </MapContainer>
    </FullScreenModal>
  )
}

export default MapsPreviewer
