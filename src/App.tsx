import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Globe } from 'lucide-react'

interface TravelDestination {
  id: number
  name: string
  location: string
  description: string
}

const travelDestinations: TravelDestination[] = [
  {
    id: 1,
    name: "Santorini",
    location: "Greece",
    description: "A stunning Greek island known for its white-washed buildings, blue-domed churches, and breathtaking sunsets over the Aegean Sea. Perfect for romantic getaways and photography enthusiasts."
  },
  {
    id: 2,
    name: "Kyoto",
    location: "Japan",
    description: "Ancient capital of Japan featuring thousands of temples, traditional wooden houses, and beautiful gardens. Experience authentic Japanese culture, tea ceremonies, and cherry blossoms in spring."
  },
  {
    id: 3,
    name: "Machu Picchu",
    location: "Peru",
    description: "The legendary 'Lost City of the Incas' perched high in the Andes Mountains. This UNESCO World Heritage site offers incredible hiking trails and fascinating ancient architecture."
  },
  {
    id: 4,
    name: "Bali",
    location: "Indonesia",
    description: "Tropical paradise known for its lush rice terraces, pristine beaches, vibrant culture, and spiritual temples. Perfect for relaxation, adventure, and cultural immersion."
  },
  {
    id: 5,
    name: "Iceland",
    location: "Nordic Region",
    description: "Land of fire and ice featuring dramatic waterfalls, geysers, glaciers, and the Northern Lights. Adventure seekers will love the unique landscapes and outdoor activities."
  },
  {
    id: 6,
    name: "Marrakech",
    location: "Morocco",
    description: "Vibrant city with bustling souks, stunning palaces, and rich history. Experience the magic of North African culture, delicious cuisine, and beautiful Islamic architecture."
  }
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Travel Destinations</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world. From ancient wonders to tropical paradises, 
            find your next adventure destination.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelDestinations.map((destination) => (
            <Card key={destination.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  {destination.name}
                </CardTitle>
                <CardDescription className="text-indigo-600 font-medium">
                  {destination.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {destination.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            Start planning your next adventure today!
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
