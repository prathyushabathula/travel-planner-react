import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { travelDestinations } from '../App'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapView() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination Map</h1>
        <p className="text-lg text-gray-600">Explore travel destinations around the world</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-b-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {travelDestinations.map(destination => (
                    <Marker
                      key={destination.id}
                      position={[destination.coordinates.lat, destination.coordinates.lng]}
                    >
                      <Popup>
                        <div className="p-2 max-w-xs">
                          <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{destination.location}</p>
                          <p className="text-sm mb-2">{destination.description}</p>
                          <div className="flex gap-2">
                            <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                              {destination.type}
                            </span>
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                              {destination.region}
                            </span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {travelDestinations.map(destination => (
                  <div key={destination.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{destination.name}</h4>
                    <p className="text-sm text-gray-600">{destination.location}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                        {destination.type}
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                        {destination.region}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Destination Marker</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Click on any marker to view detailed information about the destination.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
