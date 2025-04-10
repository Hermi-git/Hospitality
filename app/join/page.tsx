"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function JoinPage() {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Join Kuriftu Rewards</h1>
          <p className="mt-2 text-muted-foreground">
            Complete the form below to become a member and start earning points
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                )}
              >
                1
              </div>
              <span className="mt-2 text-sm font-medium">Personal Info</span>
            </div>
            <div className="h-[2px] flex-1 bg-muted" />
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                )}
              >
                2
              </div>
              <span className="mt-2 text-sm font-medium">Preferences</span>
            </div>
            <div className="h-[2px] flex-1 bg-muted" />
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                )}
              >
                3
              </div>
              <span className="mt-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Personal Information"}
              {step === 2 && "Preferences & Interests"}
              {step === 3 && "Membership Confirmation"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Please provide your contact details"}
              {step === 2 && "Help us personalize your experience"}
              {step === 3 && "Review and confirm your membership"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select>
                      <SelectTrigger id="nationality">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="et">Ethiopia</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter your address" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Preferred Location</h3>
                  <RadioGroup defaultValue="bishoftu">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bishoftu" id="bishoftu" />
                      <Label htmlFor="bishoftu">Kuriftu Resort & Spa, Bishoftu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bahirdar" id="bahirdar" />
                      <Label htmlFor="bahirdar">Kuriftu Resort & Spa, Bahir Dar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">No Preference</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Interests</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="spa" />
                      <Label htmlFor="spa">Spa & Wellness</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dining" />
                      <Label htmlFor="dining">Fine Dining</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activities" />
                      <Label htmlFor="activities">Outdoor Activities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="events" />
                      <Label htmlFor="events">Events & Celebrations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="family" />
                      <Label htmlFor="family">Family Packages</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="business" />
                      <Label htmlFor="business">Business Facilities</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">How did you hear about us?</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="ad">Advertisement</SelectItem>
                      <SelectItem value="visit">Previous Visit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests or Comments</Label>
                  <Textarea id="special-requests" placeholder="Any special requests or comments?" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-medium">Silver Tier Membership</h3>
                  </div>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Your starting tier with exclusive benefits
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Membership Benefits:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>Earn 10 points for every $1 spent at Kuriftu Resorts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>5% discount on room bookings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>Early check-in and late check-out (subject to availability)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>Welcome amenity on arrival</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                      <span>Exclusive member-only offers and promotions</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Terms and Conditions:</h3>
                  <div className="max-h-40 overflow-y-auto text-sm text-muted-foreground">
                    <p className="mb-2">
                      By joining the Kuriftu Rewards program, you agree to the following terms and conditions:
                    </p>
                    <ol className="list-decimal space-y-1 pl-4">
                      <li>Membership is free and available to individuals 18 years or older.</li>
                      <li>Points are earned on eligible spending at Kuriftu Resorts and affiliated properties.</li>
                      <li>Points have no cash value and cannot be transferred or sold.</li>
                      <li>Kuriftu Resorts reserves the right to modify or terminate the program at any time.</li>
                      <li>Your personal information will be handled in accordance with our Privacy Policy.</li>
                    </ol>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <Link href="/">
                <Button variant="outline">Cancel</Button>
              </Link>
            )}

            {step < 3 ? <Button onClick={handleNextStep}>Continue</Button> : <Button>Complete Registration</Button>}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
