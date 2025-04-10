"use client"

import { useState } from "react"
import { Edit, Gift, Hotel, MoreHorizontal, Plus, Search, Sparkles, Trash2, Utensils } from "lucide-react"

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
  DialogTrigger,
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

// Mock data
const rewards = [
  {
    id: 1,
    name: "Free Night Stay",
    description: "Enjoy a complimentary night at any Kuriftu Resort",
    category: "Accommodation",
    points: 2000,
    active: true,
    icon: Hotel,
  },
  {
    id: 2,
    name: "Spa Treatment",
    description: "60-minute massage or facial treatment",
    category: "Wellness",
    points: 1000,
    active: true,
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Dinner for Two",
    description: "Complimentary dinner for two at any Kuriftu restaurant",
    category: "Dining",
    points: 1500,
    active: true,
    icon: Utensils,
  },
  {
    id: 4,
    name: "Room Upgrade",
    description: "Upgrade to the next room category",
    category: "Accommodation",
    points: 800,
    active: true,
    icon: Hotel,
  },
  {
    id: 5,
    name: "Welcome Package",
    description: "Special welcome package with local treats",
    category: "Other",
    points: 500,
    active: false,
    icon: Gift,
  },
]

export default function RewardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch =
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || reward.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Rewards</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Reward
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reward</DialogTitle>
                <DialogDescription>Create a new reward that members can redeem with their points.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="reward-name">Reward Name</Label>
                  <Input id="reward-name" placeholder="Enter reward name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-description">Description</Label>
                  <Textarea id="reward-description" placeholder="Enter reward description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reward-category">Category</Label>
                    <Select>
                      <SelectTrigger id="reward-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Accommodation">Accommodation</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                        <SelectItem value="Wellness">Wellness</SelectItem>
                        <SelectItem value="Activities">Activities</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reward-points">Points Required</Label>
                    <Input id="reward-points" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="reward-active" defaultChecked />
                  <Label htmlFor="reward-active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Reward</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Rewards</CardTitle>
          <CardDescription>View and manage all rewards available to members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rewards..."
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
                  <SelectItem value="Accommodation">Accommodation</SelectItem>
                  <SelectItem value="Dining">Dining</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reward</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRewards.length > 0 ? (
                  filteredRewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            <reward.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{reward.name}</div>
                            <div className="text-sm text-muted-foreground">{reward.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{reward.category}</TableCell>
                      <TableCell>{reward.points.toLocaleString()}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            reward.active
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }`}
                        >
                          {reward.active ? "Active" : "Inactive"}
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Reward
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {reward.active ? (
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
                              Delete Reward
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No rewards found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
