"use client"

import { useState, useEffect } from "react"
import { Briefcase, Calendar, Check, Info, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data - same as in admin/services/page.tsx
const services = [
  {
    id: 1,
    name: "Spa Treatment",
    category: "Wellness",
    description: "Relaxing spa treatment with various options",
    points: 500,
    requiresPresence: true,
    active: true,
  },
  {
    id: 2,
    name: "Airport Transfer",
    category: "Transportation",
    description: "Pickup and drop-off service to/from airport",
    points: 300,
    requiresPresence: false,
    active: true,
  },
  {
    id: 3,
    name: "Private Dining",
    category: "Dining",
    description: "Exclusive dining experience in a private setting",
    points: 800,
    requiresPresence: true,
    active: true,
  },
  {
    id: 4,
    name: "Guided Tour",
    category: "Activities",
    description: "Guided tour of local attractions",
    points: 600,
    requiresPresence: true,
    active: true,
  },
  {
    id: 5,
    name: "Laundry Service",
    category: "Housekeeping",
    description: "Premium laundry and dry cleaning service",
    points: 200,
    requiresPresence: false,
    active: true,
  },
]

// Mock hotel locations
const hotelLocations = [
  { id: 1, name: "Kuriftu Resort & Spa, Bishoftu", lat: 8.7522, lng: 38.9965 },
  { id: 2, name: "Kuriftu Resort & Spa, Bahir Dar", lat: 11.5959, lng: 37.3908 },
]

export default function BookServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isLocationVerified, setIsLocationVerified] = useState(false)
  const [isBookingSuccess, setIsBookingSuccess] = useState(false)

  const filteredServices = services.filter((service) => {
    if (!service.active) return false

    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const selectedServicesData = services.filter((service) => selectedServices.includes(service.id))
  const totalPoints = selectedServicesData.reduce((sum, service) => sum + service.points, 0)
  const hasPresenceRequiredService = selectedServicesData.some((service) => service.requiresPresence)

  useEffect(() => {
    // Reset location verification when selected services change
    if (selectedServices.length === 0 || !hasPresenceRequiredService) {
      setIsLocationVerified(true)
    } else {
      setIsLocationVerified(false)
    }
  }, [selectedServices, hasPresenceRequiredService])

  const handleToggleService = (serviceId: number) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const handleVerifyLocation = () => {
    // In a real implementation, this would use the Google Maps API
    // to check if the user is within the hotel location radius

    // For demo purposes, we'll simulate getting the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userLoc)

          // For demo purposes, we'll simulate a successful verification
          setIsLocationVerified(true)
          setIsLocationDialogOpen(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          // For demo purposes, we'll still allow booking
          setIsLocationVerified(true)
          setIsLocationDialogOpen(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser")
      // For demo purposes, we'll still allow booking
      setIsLocationVerified(true)
      setIsLocationDialogOpen(false)
    }
  }

  const handleProceedToBooking = () => {
    if (hasPresenceRequiredService && !isLocationVerified) {
      setIsLocationDialogOpen(true)
    } else {
      setIsConfirmDialogOpen(true)
    }
  }

  const handleConfirmBooking = () => {
    // In a real implementation, this would submit the booking to the backend
    setIsConfirmDialogOpen(false)
    setIsBookingSuccess(true)

    // Reset selection after successful booking
    setTimeout(() => {
      setSelectedServices([])
      setSelectedLocation("")
      setSelectedDate("")
      setIsBookingSuccess(false)
    }, 3000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Book Services</h2>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Services</TabsTrigger>
          <TabsTrigger value="selected">Selected Services ({selectedServices.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Available Services</CardTitle>
              <CardDescription>Browse and select services to book</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search services..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Dining">Dining</SelectItem>
                      <SelectItem value="Activities">Activities</SelectItem>
                      <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <Card key={service.id} className={selectedServices.includes(service.id) ? "border-primary" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{service.name}</CardTitle>
                        </div>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-medium text-primary">{service.points} points</span>
                        {service.requiresPresence && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            Requires presence
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`service-${service.id}`}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => handleToggleService(service.id)}
                          />
                          <Label htmlFor={`service-${service.id}`}>Select</Label>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Services</CardTitle>
              <CardDescription>Review and book your selected services</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedServices.length > 0 ? (
                <div className="space-y-4">
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-4">
                      {selectedServicesData.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Briefcase className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">{service.category}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-primary">{service.points} points</span>
                            <Button variant="ghost" size="sm" onClick={() => handleToggleService(service.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Points:</span>
                      <span className="text-lg font-bold text-primary">{totalPoints} points</span>
                    </div>
                    {hasPresenceRequiredService && (
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Info className="mr-2 h-4 w-4" />
                        Some selected services require your physical presence at the resort
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Select Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select resort location" />
                        </SelectTrigger>
                        <SelectContent>
                          {hotelLocations.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Select Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No services selected</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select services from the Browse tab to book them.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedServices([])}
                disabled={selectedServices.length === 0}
              >
                Clear Selection
              </Button>
              <Button
                onClick={handleProceedToBooking}
                disabled={selectedServices.length === 0 || !selectedLocation || !selectedDate}
              >
                Proceed to Booking
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Location Verification Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Verification Required</DialogTitle>
            <DialogDescription>
              Some of the services you selected require your physical presence at the resort. We need to verify your
              location before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Location verification is required for:</span>
              </div>
              <ul className="mt-2 space-y-1 pl-7">
                {selectedServicesData
                  .filter((service) => service.requiresPresence)
                  .map((service) => (
                    <li key={service.id} className="text-sm">
                      {service.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLocationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyLocation}>Verify My Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>Please review your booking details before confirming.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Selected Services:</h4>
                <ul className="mt-1 space-y-1 pl-5">
                  {selectedServicesData.map((service) => (
                    <li key={service.id} className="text-sm">
                      {service.name} - {service.points} points
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span>Total Points:</span>
                <span className="font-bold text-primary">{totalPoints} points</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span>{hotelLocations.find((loc) => loc.id.toString() === selectedLocation)?.name || ""}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date:</span>
                <span>{selectedDate}</span>
              </div>
              {hasPresenceRequiredService && !isLocationVerified && (
                <div className="rounded-lg bg-amber-100 p-3 text-sm text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>Location verification is required for some services.</span>
                  </div>
                </div>
              )}
              {hasPresenceRequiredService && isLocationVerified && (
                <div className="rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-300">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Location verified successfully.</span>
                  </div>
                </div>
              )}
              {!hasPresenceRequiredService && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>Your booking will be submitted for admin approval.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBooking}>Confirm Booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={isBookingSuccess} onOpenChange={setIsBookingSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              {hasPresenceRequiredService
                ? "Your services have been booked successfully."
                : "Your booking request has been submitted for admin approval."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <Check className="h-8 w-8" />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
