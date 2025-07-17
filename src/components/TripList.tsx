import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Edit3, Calendar, MapPin } from 'lucide-react'
import { getTrips, deleteTrip, Trip } from '../utils/localStorage'
import { format, parseISO } from 'date-fns'

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = () => {
    setTrips(getTrips())
  }

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId)
      loadTrips()
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(null)
      }
    }
  }

  const getTotalActivities = (trip: Trip) => {
    return trip.itinerary.reduce((total, day) => total + day.activities.length, 0)
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Trips</h1>
        <p className="text-lg text-gray-600">Manage your saved travel plans</p>
      </header>

      {trips.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-4">Start planning your first adventure!</p>
            <Button onClick={() => window.location.href = '/planner'}>
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {trips.map(trip => (
              <Card
                key={trip.id}
                className={`cursor-pointer transition-all ${
                  selectedTrip?.id === trip.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedTrip(trip)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{trip.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.startDate && trip.endDate && 
                           !isNaN(parseISO(trip.startDate).getTime()) && 
                           !isNaN(parseISO(trip.endDate).getTime()) ? (
                            `${format(parseISO(trip.startDate), 'MMM dd')} - ${format(parseISO(trip.endDate), 'MMM dd')}`
                          ) : (
                            'Invalid dates'
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.destinations.length} destinations
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/planner?edit=${trip.id}`
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTrip(trip.id)
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{getTotalActivities(trip)} activities planned</span>
                    <span>Created {trip.createdAt && !isNaN(parseISO(trip.createdAt).getTime()) ? 
                      format(parseISO(trip.createdAt), 'MMM dd, yyyy') : 'Unknown'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTrip && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTrip.name}</CardTitle>
                  <CardDescription>
                    {selectedTrip.startDate && selectedTrip.endDate && 
                     !isNaN(parseISO(selectedTrip.startDate).getTime()) && 
                     !isNaN(parseISO(selectedTrip.endDate).getTime()) ? (
                      `${format(parseISO(selectedTrip.startDate), 'MMM dd, yyyy')} - ${format(parseISO(selectedTrip.endDate), 'MMM dd, yyyy')}`
                    ) : (
                      'Invalid dates'
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Destinations:</h5>
                    <div className="space-y-1">
                      {selectedTrip.destinations.map(dest => (
                        <div key={dest.id} className="text-sm text-gray-600">
                          {dest.name}, {dest.location}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Itinerary Overview:</h5>
                    <div className="space-y-3">
                      {selectedTrip.itinerary.map((day, index) => (
                        <div key={day.date} className="text-sm">
                          <div className="font-medium mb-1">Day {index + 1}:</div>
                          {day.activities.length > 0 ? (
                            <div className="space-y-1 ml-2">
                              {day.activities.slice(0, 3).map(activity => (
                                <div key={activity.id} className="text-gray-600">
                                  {activity.time && `${activity.time} - `}{activity.name}
                                </div>
                              ))}
                              {day.activities.length > 3 && (
                                <div className="text-gray-500 text-xs">
                                  +{day.activities.length - 3} more activities
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-500 ml-2">No activities planned</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => window.location.href = `/planner?edit=${selectedTrip.id}`}
                      className="w-full"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
