import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { getTrips, Trip } from '../utils/localStorage'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths } from 'date-fns'

export default function Calendar() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  useEffect(() => {
    setTrips(getTrips())
  }, [])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getTripForDate = (date: Date) => {
    return trips.find(trip => {
      if (!trip.startDate || !trip.endDate) return false
      
      const tripStart = parseISO(trip.startDate)
      const tripEnd = parseISO(trip.endDate)
      
      if (isNaN(tripStart.getTime()) || isNaN(tripEnd.getTime())) return false
      
      return date >= tripStart && date <= tripEnd
    })
  }

  const getActivitiesForDate = (date: Date) => {
    const trip = getTripForDate(date)
    if (!trip) return []
    
    const dayItinerary = trip.itinerary.find(day => {
      if (!day.date) return false
      const dayDate = parseISO(day.date)
      if (isNaN(dayDate.getTime())) return false
      return isSameDay(dayDate, date)
    })
    
    return dayItinerary?.activities || []
  }

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Calendar</h1>
        <p className="text-lg text-gray-600">View your planned trips and activities</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {format(currentDate, 'MMMM yyyy')}
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={prevMonth} variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextMonth} variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(day => {
                  const trip = getTripForDate(day)
                  const activities = getActivitiesForDate(day)
                  const isCurrentMonth = isSameMonth(day, currentDate)
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`
                        p-2 min-h-[80px] border rounded-lg cursor-pointer transition-colors
                        ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                        ${trip ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}
                        hover:bg-indigo-100
                      `}
                      onClick={() => setSelectedTrip(trip || null)}
                    >
                      <div className="text-sm font-medium mb-1">
                        {format(day, 'd')}
                      </div>
                      {trip && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-indigo-700 truncate">
                            {trip.name}
                          </div>
                          {activities.slice(0, 2).map(activity => (
                            <div key={activity.id} className="text-xs text-gray-600 truncate">
                              {activity.time && `${activity.time} `}{activity.name}
                            </div>
                          ))}
                          {activities.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{activities.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {trips.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No trips planned</p>
              ) : (
                <div className="space-y-3">
                  {trips.slice(0, 5).map(trip => (
                    <div
                      key={trip.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTrip(trip || null)}
                    >
                      <h4 className="font-medium">{trip.name}</h4>
                      <p className="text-sm text-gray-600">
                        {trip.startDate && trip.endDate && 
                         !isNaN(parseISO(trip.startDate).getTime()) && 
                         !isNaN(parseISO(trip.endDate).getTime()) ? (
                          `${format(parseISO(trip.startDate), 'MMM dd')} - ${format(parseISO(trip.endDate), 'MMM dd')}`
                        ) : (
                          'Invalid dates'
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedTrip && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedTrip.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {selectedTrip.startDate && selectedTrip.endDate && 
                     !isNaN(parseISO(selectedTrip.startDate).getTime()) && 
                     !isNaN(parseISO(selectedTrip.endDate).getTime()) ? (
                      `${format(parseISO(selectedTrip.startDate), 'MMM dd, yyyy')} - ${format(parseISO(selectedTrip.endDate), 'MMM dd, yyyy')}`
                    ) : (
                      'Invalid dates'
                    )}
                  </p>
                  
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
                    <h5 className="font-medium mb-2">Total Activities:</h5>
                    <p className="text-sm text-gray-600">
                      {selectedTrip.itinerary.reduce((total, day) => total + day.activities.length, 0)} activities planned
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
