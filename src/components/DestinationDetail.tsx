import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Star, Utensils, Hotel } from 'lucide-react'

interface TravelDestination {
  id: number
  name: string
  location: string
  description: string
  coordinates: {
    lat: number
    lng: number
  }
  type: 'beach' | 'city' | 'mountain' | 'cultural' | 'adventure'
  region: string
  attractions: string[]
  food: string[]
  hotels: string[]
}

interface DestinationDetailProps {
  destination: TravelDestination | null
  isOpen: boolean
  onClose: () => void
}

export default function DestinationDetail({ destination, isOpen, onClose }: DestinationDetailProps) {
  if (!destination) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-indigo-600" />
            {destination.name}
          </DialogTitle>
          <p className="text-lg text-indigo-600 font-medium">
            {destination.location} • {destination.type.charAt(0).toUpperCase() + destination.type.slice(1)}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {destination.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Top Attractions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {destination.attractions.map((attraction, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      {attraction}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="h-5 w-5 text-green-500" />
                  Local Cuisine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {destination.food.map((food, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      {food}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hotel className="h-5 w-5 text-blue-500" />
                  Recommended Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {destination.hotels.map((hotel, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      {hotel}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                {destination.type}
              </span>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {destination.region}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
