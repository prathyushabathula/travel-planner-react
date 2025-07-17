import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Trash2, X } from 'lucide-react'
import { travelDestinations } from '../App'
import { saveTrip, getTrips, Trip, TripActivity, ItineraryDay } from '../utils/localStorage'
import { format, addDays, parseISO } from 'date-fns'

export default function TripPlanner() {
  const [searchParams] = useSearchParams()
  const [tripName, setTripName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([])
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
  const [activityInputs, setActivityInputs] = useState<Record<string, { name: string; description: string; time: string }>>({})
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const editTripId = searchParams.get('edit')
    if (editTripId) {
      const trips = getTrips()
      const tripToEdit = trips.find(trip => trip.id === editTripId)
      if (tripToEdit) {
        setTripName(tripToEdit.name)
        setStartDate(tripToEdit.startDate)
        setEndDate(tripToEdit.endDate)
        setSelectedDestinations(tripToEdit.destinations.map(d => d.id))
        setCurrentTrip(tripToEdit)
        setIsEditMode(true)
      }
    }
  }, [searchParams])

  const generateTripDays = (start: string, end: string): ItineraryDay[] => {
    const days: ItineraryDay[] = []
    
    if (!start || !end) return days
    
    const startDateObj = parseISO(start)
    const endDateObj = parseISO(end)
    
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return days
    }
    
    let currentDate = startDateObj
    while (currentDate <= endDateObj) {
      days.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        activities: []
      })
      currentDate = addDays(currentDate, 1)
    }
    
    return days
  }

  const mergeItineraryWithDates = (existingItinerary: ItineraryDay[], startDate: string, endDate: string): ItineraryDay[] => {
    if (!startDate || !endDate) return existingItinerary
    
    const startDateObj = parseISO(startDate)
    const endDateObj = parseISO(endDate)
    
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return existingItinerary
    }
    
    const newDays: ItineraryDay[] = []
    let currentDate = startDateObj
    
    while (currentDate <= endDateObj) {
      const dateStr = format(currentDate, 'yyyy-MM-dd')
      const existingDay = existingItinerary.find(day => day.date === dateStr)
      
      newDays.push({
        date: dateStr,
        activities: existingDay ? existingDay.activities : []
      })
      
      currentDate = addDays(currentDate, 1)
    }
    
    return newDays
  }

  const createTrip = () => {
    if (!tripName) {
      alert('Please enter a trip name')
      return
    }

    const trip: Trip = {
      id: isEditMode && currentTrip ? currentTrip.id : Date.now().toString(),
      name: tripName,
      startDate: startDate || '',
      endDate: endDate || '',
      destinations: travelDestinations.filter(d => selectedDestinations.includes(d.id)),
      itinerary: isEditMode && currentTrip ? mergeItineraryWithDates(currentTrip.itinerary, startDate || '', endDate || '') : (startDate && endDate ? generateTripDays(startDate, endDate) : []),
      createdAt: isEditMode && currentTrip ? currentTrip.createdAt : new Date().toISOString()
    }

    setCurrentTrip(trip)
    saveTrip(trip)
    alert(`Trip "${tripName}" ${isEditMode ? 'updated' : 'created'} successfully!`)
  }

  const addActivity = (dayDate: string) => {
    const dayInput = activityInputs[dayDate]
    if (!currentTrip || !dayInput?.name) return

    const activity: TripActivity = {
      id: Date.now().toString(),
      name: dayInput.name,
      description: dayInput.description,
      time: dayInput.time
    }

    const updatedTrip = {
      ...currentTrip,
      itinerary: currentTrip.itinerary.map(day =>
        day.date === dayDate
          ? { ...day, activities: [...day.activities, activity] }
          : day
      )
    }

    setCurrentTrip(updatedTrip)
    saveTrip(updatedTrip)
    setActivityInputs(prev => ({
      ...prev,
      [dayDate]: { name: '', description: '', time: '' }
    }))
  }

  const removeActivity = (dayDate: string, activityId: string) => {
    if (!currentTrip) return

    const updatedTrip = {
      ...currentTrip,
      itinerary: currentTrip.itinerary.map(day =>
        day.date === dayDate
          ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
          : day
      )
    }

    setCurrentTrip(updatedTrip)
    saveTrip(updatedTrip)
  }

  const resetForm = () => {
    setTripName('')
    setStartDate('')
    setEndDate('')
    setSelectedDestinations([])
    setCurrentTrip(null)
    setActivityInputs({})
    setIsEditMode(false)
    window.history.replaceState({}, '', '/planner')
  }

  const updateActivityInput = (dayDate: string, field: string, value: string) => {
    setActivityInputs(prev => ({
      ...prev,
      [dayDate]: {
        ...prev[dayDate],
        [field]: value
      }
    }))
  }

  const getActivityInput = (dayDate: string, field: keyof { name: string; description: string; time: string }) => {
    return activityInputs[dayDate]?.[field] || ''
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Planner</h1>
        <p className="text-lg text-gray-600">Create your perfect travel itinerary</p>
      </header>

      {!currentTrip || isEditMode ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Trip' : 'Create New Trip'}</CardTitle>
            <CardDescription>{isEditMode ? 'Update your travel plans' : 'Plan your next adventure'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Trip name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date (Optional)</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Destinations</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {travelDestinations.map(destination => (
                  <label key={destination.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDestinations.includes(destination.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDestinations([...selectedDestinations, destination.id])
                        } else {
                          setSelectedDestinations(selectedDestinations.filter(id => id !== destination.id))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{destination.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={createTrip} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              {isEditMode ? 'Update Trip' : 'Create Trip'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentTrip.name}</h2>
              {currentTrip.startDate && currentTrip.endDate && (
                <p className="text-gray-600">
                  {(() => {
                    try {
                      const start = parseISO(currentTrip.startDate)
                      const end = parseISO(currentTrip.endDate)
                      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                        return `${format(start, 'MMM dd, yyyy')} - ${format(end, 'MMM dd, yyyy')}`
                      }
                    } catch (e) {
                      return null
                    }
                    return null
                  })()}
                </p>
              )}
            </div>
            <Button onClick={resetForm} variant="outline">
              <X className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </div>

          <div className="space-y-4">
            {currentTrip.itinerary.map((day, index) => (
              <Card key={day.date}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Day {index + 1} - {(() => {
                      if (!day.date) return 'No date'
                      try {
                        const date = parseISO(day.date)
                        return !isNaN(date.getTime()) ? format(date, 'EEEE, MMM dd') : 'No date'
                      } catch (e) {
                        return 'No date'
                      }
                    })()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{activity.name}</h4>
                        {activity.description && <p className="text-sm text-gray-600">{activity.description}</p>}
                        {activity.time && <p className="text-sm text-indigo-600">{activity.time}</p>}
                      </div>
                      <Button
                        onClick={() => removeActivity(day.date, activity.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <Input
                        placeholder="Activity name"
                        value={getActivityInput(day.date, 'name')}
                        onChange={(e) => updateActivityInput(day.date, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Description"
                        value={getActivityInput(day.date, 'description')}
                        onChange={(e) => updateActivityInput(day.date, 'description', e.target.value)}
                      />
                      <Input
                        type="time"
                        value={getActivityInput(day.date, 'time')}
                        onChange={(e) => updateActivityInput(day.date, 'time', e.target.value)}
                      />
                      <Button onClick={() => addActivity(day.date)} size="sm">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
