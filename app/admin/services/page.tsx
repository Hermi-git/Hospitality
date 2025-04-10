"use client"

import { useState } from "react"
import { Briefcase, Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
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
    active: false,
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<any>(null)

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleAddService = () => {
    setCurrentService(null)
    setIsEditDialogOpen(true)
  }

  const handleEditService = (service: any) => {
    setCurrentService(service)
    setIsEditDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false)
    setCurrentService(null)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddService}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Services</CardTitle>
          <CardDescription>View and manage all services available to members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Requires Presence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.points.toLocaleString()}</TableCell>
                      <TableCell>{service.requiresPresence ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            service.active
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }`}
                        >
                          {service.active ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditService(service)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Service
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {service.active ? (
                                <>
                                  <span className="mr-2">☓</span>
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <span className="mr-2">✓</span>
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Service
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No services found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {currentService ? "Update the service details below" : "Create a new service that members can book"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input id="service-name" placeholder="Enter service name" defaultValue={currentService?.name || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-category">Category</Label>
              <Select defaultValue={currentService?.category || ""}>
                <SelectTrigger id="service-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Dining">Dining</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea
                id="service-description"
                placeholder="Enter service description"
                defaultValue={currentService?.description || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-points">Points</Label>
              <Input id="service-points" type="number" placeholder="0" defaultValue={currentService?.points || ""} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="requires-presence" defaultChecked={currentService?.requiresPresence || false} />
              <Label htmlFor="requires-presence">Requires physical presence</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="service-active" defaultChecked={currentService?.active || true} />
              <Label htmlFor="service-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit">{currentService ? "Update Service" : "Create Service"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
