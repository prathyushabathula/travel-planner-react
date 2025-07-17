import { Link, useLocation } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Calendar, PlusCircle, List } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  
  const getActiveTab = () => {
    switch (location.pathname) {
      case '/':
        return 'destinations'
      case '/planner':
        return 'planner'
      case '/calendar':
        return 'calendar'
      case '/trips':
        return 'trips'
      default:
        return 'destinations'
    }
  }

  return (
    <div className="flex justify-center">
      <Tabs value={getActiveTab()} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="destinations" asChild>
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Destinations</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="planner" asChild>
            <Link to="/planner" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Plan Trip</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="calendar" asChild>
            <Link to="/calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="trips" asChild>
            <Link to="/trips" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">My Trips</span>
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
