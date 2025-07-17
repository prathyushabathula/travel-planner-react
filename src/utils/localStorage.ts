export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  destinations: any[]
  itinerary: ItineraryDay[]
  createdAt: string
}

export interface ItineraryDay {
  date: string
  activities: TripActivity[]
}

export interface TripActivity {
  id: string
  name: string
  description: string
  time: string
  destinationId?: number
}

const TRIPS_STORAGE_KEY = 'travel-planner-trips'

export function saveTrip(trip: Trip): void {
  try {
    const trips = getTrips()
    const existingIndex = trips.findIndex(t => t.id === trip.id)
    
    if (existingIndex >= 0) {
      trips[existingIndex] = trip
    } else {
      trips.push(trip)
    }
    
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips))
  } catch (error) {
    console.error('Error saving trip:', error)
  }
}

export function getTrips(): Trip[] {
  try {
    const tripsJson = localStorage.getItem(TRIPS_STORAGE_KEY)
    return tripsJson ? JSON.parse(tripsJson) : []
  } catch (error) {
    console.error('Error loading trips:', error)
    return []
  }
}

export function deleteTrip(tripId: string): void {
  try {
    const trips = getTrips()
    const filteredTrips = trips.filter(trip => trip.id !== tripId)
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(filteredTrips))
  } catch (error) {
    console.error('Error deleting trip:', error)
  }
}

export function getTripById(tripId: string): Trip | undefined {
  try {
    const trips = getTrips()
    return trips.find(trip => trip.id === tripId)
  } catch (error) {
    console.error('Error getting trip by ID:', error)
    return undefined
  }
}
