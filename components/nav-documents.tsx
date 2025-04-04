"use client"

import {
  
  type Icon,
} from "@tabler/icons-react"


import {
  SidebarGroup,
  
  useSidebar,
} from "@/components/ui/sidebar"

export function NavDocuments({

}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    </SidebarGroup>
  )
}
