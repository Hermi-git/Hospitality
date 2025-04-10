"use client"

import { useState } from "react"
import { Award, Calendar, ChevronRight, CreditCard, Gift, History, Hotel, Sparkles, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

// Mock data
const userData = {
  name: "John Doe",
  points: 2450,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 550,
  totalPointsForNextTier: 3000,
  progress: 82,
  recentBookings: [
    {
      id: 1,
      date: "May 15-18, 2023",
      location: "Kuriftu Resort & Spa, Bishoftu",
      status: "Completed",
      points: 350,
    },
    {
      id: 2,
      date: "Mar 3-5, 2023",
      location: "Kuriftu Resort & Spa, Bahir Dar",
      status: "Completed",
      points: 250,
    },
    {
      id: 3,
      date: "Dec 24-26, 2022",
      location: "Kuriftu Resort & Spa, Bishoftu",
      status: "Completed",
      points: 300,
    },
  ],
  upcomingBookings: [
    {
      id: 4,
      date: "Aug 12-15, 2023",
      location: "Kuriftu Resort & Spa, Bahir Dar",
      status: "Confirmed",
    },
  ],
  rewards: [
    {
      id: 1,
      name: "Free Night Stay",
      description: "Enjoy a complimentary night at any Kuriftu Resort",
      points: 2000,
      icon: Hotel,
    },
    {
      id: 2,
      name: "Spa Treatment",
      description: "60-minute massage or facial treatment",
      points: 1000,
      icon: Sparkles,
    },
    {
      id: 3,
      name: "Dinner for Two",
      description: "Complimentary dinner for two at any Kuriftu restaurant",
      points: 1500,
      icon: Utensils,
    },
  ],
  pointsHistory: [
    { month: "Jan", points: 150 },
    { month: "Feb", points: 220 },
    { month: "Mar", points: 250 },
    { month: "Apr", points: 180 },
    { month: "May", points: 350 },
    { month: "Jun", points: 200 },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Gift className="mr-2 h-4 w-4" />
              Redeem Points
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.points}</div>
                  <p className="text-xs text-muted-foreground">+350 points from last stay</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Membership Tier</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.tier}</div>
                  <p className="text-xs text-muted-foreground">
                    {userData.pointsToNextTier} points to {userData.nextTier}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Rewards</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.rewards.length}</div>
                  <p className="text-xs text-muted-foreground">Rewards you can redeem now</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Booking</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Aug 12</div>
                  <p className="text-xs text-muted-foreground">Kuriftu Resort & Spa, Bahir Dar</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={userData.pointsHistory}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="points" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Tier Progress</CardTitle>
                  <CardDescription>
                    {userData.pointsToNextTier} points needed to reach {userData.nextTier}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div>{userData.tier}</div>
                    <div>{userData.nextTier}</div>
                  </div>
                  <Progress value={userData.progress} className="h-2" />
                  <div className="mt-3 text-center text-sm text-muted-foreground">
                    {userData.points} / {userData.totalPointsForNextTier} points
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-2 font-medium">Tier Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        10% discount on all bookings
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        Early check-in when available
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                        Welcome amenity on arrival
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Recent Bookings</h3>
              <div className="space-y-4">
                {userData.recentBookings.slice(0, 2).map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{booking.date}</CardTitle>
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {booking.status}
                        </div>
                      </div>
                      <CardDescription>{booking.location}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="flex w-full items-center justify-between">
                        <div className="text-sm text-muted-foreground">Earned {booking.points} points</div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                <div className="text-center">
                  <Button variant="link">View All Bookings</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your confirmed reservations at Kuriftu Resorts</CardDescription>
              </CardHeader>
              <CardContent>
                {userData.upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {userData.upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h4 className="font-medium">{booking.date}</h4>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {booking.status}
                          </div>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No upcoming bookings</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Book your next stay at Kuriftu Resort to earn more points.
                    </p>
                    <Button className="mt-4" size="sm">
                      Book Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>Your past stays at Kuriftu Resorts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <h4 className="font-medium">{booking.date}</h4>
                        <p className="text-sm text-muted-foreground">{booking.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-medium text-primary">+{booking.points}</span> points
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <History className="mr-2 h-4 w-4" />
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userData.rewards.map((reward) => (
                <Card key={reward.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <reward.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{reward.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="font-medium text-primary">{reward.points} points</div>
                    <Button size="sm">Redeem</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Available Rewards</CardTitle>
                <CardDescription>Browse all rewards you can earn with your points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-medium">Accommodation Rewards</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hotel className="h-4 w-4 text-primary" />
                          <span>Free Night Stay</span>
                        </div>
                        <span className="font-medium">2000 points</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hotel className="h-4 w-4 text-primary" />
                          <span>Room Upgrade</span>
                        </div>
                        <span className="font-medium">1000 points</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-medium">Dining Rewards</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-primary" />
                          <span>Dinner for Two</span>
                        </div>
                        <span className="font-medium">1500 points</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-primary" />
                          <span>Complimentary Breakfast</span>
                        </div>
                        <span className="font-medium">500 points</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 font-medium">Spa & Wellness</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>Spa Treatment</span>
                        </div>
                        <span className="font-medium">1000 points</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>Wellness Package</span>
                        </div>
                        <span className="font-medium">1800 points</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Points Activity</CardTitle>
                <CardDescription>Track your points earned and redeemed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userData.pointsHistory}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="points" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent points transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <h4 className="font-medium">Points Earned</h4>
                        <p className="text-sm text-muted-foreground">
                          {booking.date} - {booking.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-500">+{booking.points}</div>
                        <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h4 className="font-medium">Welcome Bonus</h4>
                      <p className="text-sm text-muted-foreground">New member signup bonus</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">+500</div>
                      <p className="text-xs text-muted-foreground">{new Date(2022, 11, 15).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <History className="mr-2 h-4 w-4" />
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
