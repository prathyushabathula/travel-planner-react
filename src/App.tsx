import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Globe } from 'lucide-react'
import Navigation from './components/Navigation'
import TripPlanner from './components/TripPlanner'
import Calendar from './components/Calendar'
import MapView from './components/MapView'
import TripList from './components/TripList'

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
}


export const travelDestinations: TravelDestination[] = [
  {
    id: 1,
    name: "Santorini",
    location: "Greece",
    description: "A stunning Greek island known for its white-washed buildings, blue-domed churches, and breathtaking sunsets over the Aegean Sea. Perfect for romantic getaways and photography enthusiasts.",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    type: 'beach',
    region: 'Europe'
  },
  {
    id: 2,
    name: "Kyoto",
    location: "Japan",
    description: "Ancient capital of Japan featuring thousands of temples, traditional wooden houses, and beautiful gardens. Experience authentic Japanese culture, tea ceremonies, and cherry blossoms in spring.",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    type: 'cultural',
    region: 'Asia'
  },
  {
    id: 3,
    name: "Machu Picchu",
    location: "Peru",
    description: "The legendary 'Lost City of the Incas' perched high in the Andes Mountains. This UNESCO World Heritage site offers incredible hiking trails and fascinating ancient architecture.",
    coordinates: { lat: -13.1631, lng: -72.5450 },
    type: 'mountain',
    region: 'South America'
  },
  {
    id: 4,
    name: "Bali",
    location: "Indonesia",
    description: "Tropical paradise known for its lush rice terraces, pristine beaches, vibrant culture, and spiritual temples. Perfect for relaxation, adventure, and cultural immersion.",
    coordinates: { lat: -8.3405, lng: 115.0920 },
    type: 'beach',
    region: 'Asia'
  },
  {
    id: 5,
    name: "Iceland",
    location: "Nordic Region",
    description: "Land of fire and ice featuring dramatic waterfalls, geysers, glaciers, and the Northern Lights. Adventure seekers will love the unique landscapes and outdoor activities.",
    coordinates: { lat: 64.9631, lng: -19.0208 },
    type: 'adventure',
    region: 'Europe'
  },
  {
    id: 6,
    name: "Marrakech",
    location: "Morocco",
    description: "Vibrant city with bustling souks, stunning palaces, and rich history. Experience the magic of North African culture, delicious cuisine, and beautiful Islamic architecture.",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    type: 'city',
    region: 'Africa'
  }
]

function DestinationsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredDestinations = travelDestinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = !selectedRegion || destination.region === selectedRegion
    const matchesType = !selectedType || destination.type === selectedType
    
    return matchesSearch && matchesRegion && matchesType
  })

  const regions = [...new Set(travelDestinations.map(d => d.region))]
  const types = [...new Set(travelDestinations.map(d => d.type))]

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe className="h-8 w-8 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-800">Travel Destinations</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing places around the world. From ancient wonders to tropical paradises, 
          find your next adventure destination.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <Card key={destination.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600" />
                {destination.name}
              </CardTitle>
              <CardDescription className="text-indigo-600 font-medium">
                {destination.location} • {destination.type.charAt(0).toUpperCase() + destination.type.slice(1)}
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

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="mt-8">
          <Routes>
            <Route path="/" element={<DestinationsView />} />
            <Route path="/planner" element={<TripPlanner />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/trips" element={<TripList />} />
          </Routes>
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
