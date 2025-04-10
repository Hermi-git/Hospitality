import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, Gift, Hotel, Percent, Calendar, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Kuriftu Rewards</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join our exclusive loyalty program and enjoy premium benefits, special offers, and personalized
                  experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/join">
                  <Button size="lg">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    Member Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt="Kuriftu Resort"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Membership Benefits</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Enjoy exclusive perks and privileges as a Kuriftu Rewards member
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Tier-Based Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Progress through Silver, Gold, and Platinum tiers, unlocking greater benefits with each level.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Percent className="mr-2 h-5 w-5 text-primary" />
                    Exclusive Discounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enjoy special rates on accommodations, dining, and spa services available only to members.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-5 w-5 text-primary" />
                    Points & Redemptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Earn points with every stay and redeem them for free nights, room upgrades, or resort experiences.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Hotel className="mr-2 h-5 w-5 text-primary" />
                    Priority Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enjoy early check-in, late check-out, and priority reservations for dining and activities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/join">
              <Button size="lg" className="mt-4">
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New section for Services */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Premium Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Book exclusive services and earn points with every booking
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Book Services</h3>
                  <p className="text-muted-foreground">
                    Browse and book premium services like spa treatments, private dining, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Earn Points</h3>
                  <p className="text-muted-foreground">
                    Earn loyalty points with every service booking to redeem for future stays and experiences
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/book-services">
                  <Button size="lg">
                    Explore Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl bg-background p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">Featured Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Spa Treatment</p>
                    <p className="text-sm text-muted-foreground">Relaxing spa treatment with various options</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Private Dining</p>
                    <p className="text-sm text-muted-foreground">Exclusive dining experience in a private setting</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Guided Tour</p>
                    <p className="text-sm text-muted-foreground">Guided tour of local attractions</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Testimonials</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">Hear what our members have to say</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 bg-background/60">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <CardTitle className="text-base">Member Name</CardTitle>
                      <CardDescription>Gold Member</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The Kuriftu Rewards program has transformed my stays. The personalized service and exclusive
                    benefits make every visit special."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Join?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Become a member today and start enjoying exclusive benefits
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/join">
                <Button size="lg" className="mt-4">
                  Join Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-services">
                <Button variant="outline" size="lg" className="mt-4">
                  Book Services
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
