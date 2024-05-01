import { nominatimService } from '@/services'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { twMerge } from 'tailwind-merge'

type LatLng = [number, number]

type PropType = {
  city?: string
  error?: string
  onValueChange?: (value: string) => void
  value?: string
}

const GeoPicker: React.FC<PropType> = ({ city, error, onValueChange, value }) => {
  const [latLng, setLatLng] = useState<LatLng>()
  const [viewLatLng, setViewLatLng] = useState<LatLng>()
  const [isHold, setIsHold] = useState(false)

  useEffect(() => {
    const load = async (query: string) => {
      const [place] = await nominatimService.search(query)
      if (place) setViewLatLng([parseFloat(place.lat), parseFloat(place.lon)])
    }
    if (city) load(city)
  }, [city])

  useEffect(() => {
    if (!value) return
    const [lat, lng] = value.split(',')
    const iLng = parseFloat(lng)
    const iLat = parseFloat(lat)

    if (isNaN(iLat) || isNaN(iLng)) return
    setLatLng([iLat, iLng])
    setViewLatLng([iLat, iLng])
  }, [value])

  const onLatLngChange = (value: LatLng) => {
    setLatLng(value)
    setViewLatLng(value)
    onValueChange?.(value.join(', '))
  }

  return (
    <div
      className={twMerge(
        'relative z-0 aspect-video w-full cursor-default overflow-hidden rounded-lg border bg-gray-200',
        !!isHold && 'cursor-grabbing',
        !!error && 'border-error-600',
      )}
    >
      {viewLatLng && (
        <MapContainer attributionControl={false} center={viewLatLng} style={{ cursor: 'inherit', height: '100%', width: '100%' }} zoom={14}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {latLng && <Marker position={latLng} />}
          <MapEventHandlers latLng={latLng} setHold={setIsHold} setLatLng={onLatLngChange} viewLatLng={viewLatLng} />
        </MapContainer>
      )}
    </div>
  )
}

const MapEventHandlers: React.FC<{
  latLng?: LatLng
  setHold?: (value: boolean) => void
  setLatLng?: (latlng: LatLng) => void
  setViewLatLng?: (latlng: LatLng) => void
  viewLatLng: LatLng
}> = ({ latLng, setHold, setLatLng, setViewLatLng, viewLatLng }) => {
  const map = useMapEvents({
    click: (e) => {
      setLatLng?.([e.latlng.lat, e.latlng.lng])
      setViewLatLng?.([e.latlng.lat, e.latlng.lng])
    },
    mousedown: () => setHold?.(true),
    mouseup: () => setHold?.(false),
  })

  useEffect(() => {
    map.invalidateSize()
  }, [map])

  useEffect(() => {
    if (latLng) map.setView(latLng, map.getZoom())
  }, [map, latLng])

  useEffect(() => {
    if (!latLng) map.setView(viewLatLng, map.getZoom())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, viewLatLng])

  return null
}

export default GeoPicker
