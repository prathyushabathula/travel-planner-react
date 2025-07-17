import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Globe } from 'lucide-react'
import Navigation from './components/Navigation'
import TripPlanner from './components/TripPlanner'
import Calendar from './components/Calendar'
import TripList from './components/TripList'
import DestinationDetail from './components/DestinationDetail'

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


export const travelDestinations: TravelDestination[] = [
  {
    id: 1,
    name: "Santorini",
    location: "Greece",
    description: "A stunning Greek island known for its white-washed buildings, blue-domed churches, and breathtaking sunsets over the Aegean Sea. Perfect for romantic getaways and photography enthusiasts.",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    type: 'beach',
    region: 'Europe',
    attractions: ["Oia Village", "Red Beach", "Akrotiri Archaeological Site", "Fira Town", "Santo Wines Winery"],
    food: ["Fava", "Tomatokeftedes", "Fresh Seafood", "Greek Salad", "Baklava"],
    hotels: ["Canaves Oia Hotel", "Grace Hotel Santorini", "Mystique Resort", "Andronis Luxury Suites", "Katikies Hotel"]
  },
  {
    id: 2,
    name: "Kyoto",
    location: "Japan",
    description: "Ancient capital of Japan featuring thousands of temples, traditional wooden houses, and beautiful gardens. Experience authentic Japanese culture, tea ceremonies, and cherry blossoms in spring.",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    type: 'cultural',
    region: 'Asia',
    attractions: ["Fushimi Inari Shrine", "Kinkaku-ji Temple", "Arashiyama Bamboo Grove", "Gion District", "Kiyomizu-dera Temple"],
    food: ["Kaiseki", "Tofu Cuisine", "Matcha Tea", "Wagyu Beef", "Tempura"],
    hotels: ["The Ritz-Carlton Kyoto", "Four Seasons Hotel Kyoto", "Hyatt Regency Kyoto", "Hotel Granvia Kyoto", "Yoshikawa Inn"]
  },
  {
    id: 3,
    name: "Machu Picchu",
    location: "Peru",
    description: "The legendary 'Lost City of the Incas' perched high in the Andes Mountains. This UNESCO World Heritage site offers incredible hiking trails and fascinating ancient architecture.",
    coordinates: { lat: -13.1631, lng: -72.5450 },
    type: 'mountain',
    region: 'South America',
    attractions: ["Machu Picchu Citadel", "Huayna Picchu", "Inca Trail", "Sacred Valley", "Ollantaytambo"],
    food: ["Ceviche", "Lomo Saltado", "Quinoa Soup", "Alpaca Meat", "Pisco Sour"],
    hotels: ["Belmond Hotel Machu Picchu Sanctuary Lodge", "Inkaterra Machu Picchu Pueblo Hotel", "Sumaq Machu Picchu Hotel", "Casa del Sol Machupicchu", "El MaPi Hotel"]
  },
  {
    id: 4,
    name: "Bali",
    location: "Indonesia",
    description: "Tropical paradise known for its lush rice terraces, pristine beaches, vibrant culture, and spiritual temples. Perfect for relaxation, adventure, and cultural immersion.",
    coordinates: { lat: -8.3405, lng: 115.0920 },
    type: 'beach',
    region: 'Asia',
    attractions: ["Tanah Lot Temple", "Tegallalang Rice Terraces", "Uluwatu Temple", "Mount Batur", "Monkey Forest Sanctuary"],
    food: ["Nasi Goreng", "Satay", "Rendang", "Gado-Gado", "Bebek Betutu"],
    hotels: ["The Mulia Resort", "Four Seasons Resort Bali", "AYANA Resort and Spa", "The St. Regis Bali Resort", "Hanging Gardens of Bali"]
  },
  {
    id: 5,
    name: "Iceland",
    location: "Nordic Region",
    description: "Land of fire and ice featuring dramatic waterfalls, geysers, glaciers, and the Northern Lights. Adventure seekers will love the unique landscapes and outdoor activities.",
    coordinates: { lat: 64.9631, lng: -19.0208 },
    type: 'adventure',
    region: 'Europe',
    attractions: ["Blue Lagoon", "Gullfoss Waterfall", "Geysir Hot Springs", "Jökulsárlón Glacier Lagoon", "Northern Lights"],
    food: ["Fresh Fish", "Lamb", "Skyr", "Rye Bread", "Brennivín"],
    hotels: ["Hotel Rangá", "ION Adventure Hotel", "Hotel Ranga", "Canopy by Hilton Reykjavik City Centre", "The Retreat at Blue Lagoon"]
  },
  {
    id: 6,
    name: "Marrakech",
    location: "Morocco",
    description: "Vibrant city with bustling souks, stunning palaces, and rich history. Experience the magic of North African culture, delicious cuisine, and beautiful Islamic architecture.",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    type: 'city',
    region: 'Africa',
    attractions: ["Jemaa el-Fnaa Square", "Bahia Palace", "Majorelle Garden", "Koutoubia Mosque", "Saadian Tombs"],
    food: ["Tagine", "Couscous", "Pastilla", "Mint Tea", "Harira Soup"],
    hotels: ["La Mamounia", "Royal Mansour Marrakech", "Four Seasons Resort Marrakech", "Mandarin Oriental Marrakech", "Amanjena"]
  },
  {
    id: 7,
    name: "Tokyo",
    location: "Japan",
    description: "Ultra-modern metropolis blending cutting-edge technology with traditional culture. Experience world-class dining, shopping, and entertainment in this vibrant capital city.",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    type: 'city',
    region: 'Asia',
    attractions: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing", "Meiji Shrine", "Tsukiji Outer Market"],
    food: ["Sushi", "Ramen", "Tempura", "Yakitori", "Mochi"],
    hotels: ["The Peninsula Tokyo", "Mandarin Oriental Tokyo", "Park Hyatt Tokyo", "The Ritz-Carlton Tokyo", "Aman Tokyo"]
  },
  {
    id: 8,
    name: "Patagonia",
    location: "Argentina/Chile",
    description: "Vast wilderness region featuring dramatic mountains, glaciers, and pristine lakes. Perfect for hiking, wildlife watching, and experiencing some of the world's most remote landscapes.",
    coordinates: { lat: -50.9423, lng: -73.4068 },
    type: 'adventure',
    region: 'South America',
    attractions: ["Torres del Paine", "Perito Moreno Glacier", "Mount Fitz Roy", "Ushuaia", "Beagle Channel"],
    food: ["Asado", "Empanadas", "King Crab", "Patagonian Lamb", "Calafate Berry Desserts"],
    hotels: ["Eolo Patagonia Spirit", "Awasi Patagonia", "Hotel Las Torres", "Los Cauquenes Resort", "Explora Patagonia"]
  },
  {
    id: 9,
    name: "Maldives",
    location: "Indian Ocean",
    description: "Tropical paradise of coral islands with crystal-clear waters, pristine beaches, and luxury overwater bungalows. Perfect for honeymoons, diving, and ultimate relaxation.",
    coordinates: { lat: 3.2028, lng: 73.2207 },
    type: 'beach',
    region: 'Asia',
    attractions: ["Coral Reefs", "Overwater Bungalows", "Whale Shark Diving", "Sandbank Excursions", "Sunset Cruises"],
    food: ["Fresh Fish Curry", "Coconut-based Dishes", "Tropical Fruits", "Lobster", "Tuna Sashimi"],
    hotels: ["Soneva Jani", "One&Only Reethi Rah", "Four Seasons Resort Maldives", "St. Regis Maldives", "Conrad Maldives Rangali Island"]
  },
  {
    id: 10,
    name: "Tuscany",
    location: "Italy",
    description: "Rolling hills covered in vineyards, medieval towns, and Renaissance art. Experience world-class wine, authentic Italian cuisine, and stunning countryside landscapes.",
    coordinates: { lat: 43.7711, lng: 11.2486 },
    type: 'cultural',
    region: 'Europe',
    attractions: ["Florence Cathedral", "Leaning Tower of Pisa", "Chianti Wine Region", "San Gimignano", "Val d'Orcia"],
    food: ["Bistecca alla Fiorentina", "Ribollita", "Pici Pasta", "Chianti Wine", "Gelato"],
    hotels: ["Belmond Villa San Michele", "Four Seasons Hotel Firenze", "Castello di Casole", "Borgo Santo Pietro", "Hotel Davanzati"]
  },
  {
    id: 11,
    name: "Swiss Alps",
    location: "Switzerland",
    description: "Majestic mountain peaks, pristine lakes, and charming alpine villages. Perfect for skiing, hiking, and experiencing traditional Swiss culture in breathtaking natural settings.",
    coordinates: { lat: 46.5197, lng: 7.9969 },
    type: 'mountain',
    region: 'Europe',
    attractions: ["Matterhorn", "Jungfraujoch", "Lake Geneva", "Zermatt", "Interlaken"],
    food: ["Fondue", "Raclette", "Rösti", "Swiss Chocolate", "Alpine Cheese"],
    hotels: ["The Chedi Andermatt", "Grand Hotel Zermatterhof", "Kulm Hotel St. Moritz", "Victoria Jungfrau Grand Hotel", "Hotel Villa Honegg"]
  },
  {
    id: 12,
    name: "Cape Town",
    location: "South Africa",
    description: "Stunning coastal city with dramatic mountain backdrops, world-class wineries, and rich cultural heritage. Experience diverse wildlife, beautiful beaches, and vibrant neighborhoods.",
    coordinates: { lat: -33.9249, lng: 18.4241 },
    type: 'city',
    region: 'Africa',
    attractions: ["Table Mountain", "Robben Island", "Cape of Good Hope", "Stellenbosch Wine Region", "Boulder's Beach Penguins"],
    food: ["Bobotie", "Biltong", "Boerewors", "Cape Malay Curry", "Rooibos Tea"],
    hotels: ["One&Only Cape Town", "The Silo Hotel", "Belmond Mount Nelson Hotel", "Ellerman House", "The Twelve Apostles Hotel"]
  }
]

function DestinationsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredDestinations = travelDestinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = !selectedRegion || destination.region === selectedRegion
    const matchesType = !selectedType || destination.type === selectedType
    
    return matchesSearch && matchesRegion && matchesType
  })

  const regions = [...new Set(travelDestinations.map(d => d.region))]
  const types = [...new Set(travelDestinations.map(d => d.type))]

  const handleDestinationClick = (destination: TravelDestination) => {
    setSelectedDestination(destination)
    setIsDetailModalOpen(true)
  }

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
          <Card 
            key={destination.id} 
            className="hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
            onClick={() => handleDestinationClick(destination)}
          >
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

      <DestinationDetail
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

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
