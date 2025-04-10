"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Gift, BarChart3, UserCircle, LogOut, Settings, Menu, Briefcase, Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Book Services",
    href: "/book-services",
    icon: Calendar,
  },
  {
    title: "Join",
    href: "/join",
    icon: UserCircle,
  },
]

const adminNavItems = [
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Rewards",
    href: "/admin/rewards",
    icon: Gift,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  console.log("Current pathname:", pathname)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold">Kuriftu Resort</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UserCircle className="mr-2 h-4 w-4" />
            Account
          </Button>
        </div>
      </header>
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
        <SidebarProvider>
          <aside className="fixed top-16 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
            <Sidebar>
              <SidebarHeader>
                <div className="px-2 py-2">
                  <h2 className="px-4 text-lg font-semibold tracking-tight">Loyalty Program</h2>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild isActive={pathname === item.href}>
                            <Link href={item.href}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Admin</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminNavItems.map((item) => {
                        const isActive = pathname === item.href
                        console.log(`Item: ${item.title}, Path: ${item.href}, Active: ${isActive}`)

                        return (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
          </aside>
        </SidebarProvider>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

function MobileNav({
  pathname,
  setOpen,
}: {
  pathname: string
  setOpen: (open: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="px-2 py-2">
        <h2 className="px-2 text-lg font-semibold tracking-tight">Loyalty Program</h2>
      </div>
      <div className="px-2 py-2">
        <h3 className="mb-2 px-2 text-sm font-semibold">Main</h3>
        <nav className="grid gap-1">
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-2 py-2">
        <h3 className="mb-2 px-2 text-sm font-semibold">Admin</h3>
        <nav className="grid gap-1">
          {adminNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-2 py-2">
        <h3 className="mb-2 px-2 text-sm font-semibold">Account</h3>
        <nav className="grid gap-1">
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/logout"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </nav>
      </div>
    </div>
  )
}
