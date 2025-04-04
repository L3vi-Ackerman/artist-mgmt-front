'use client';
import { LogOutIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from 'next/navigation';
export function SiteHeader() {
  const router = useRouter()
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <SidebarTrigger className="-ml-1" />
    <Separator
    orientation="vertical"
    className="mx-2 data-[orientation=vertical]:h-4"
    />
    <h1 className="text-base font-medium">Documents</h1>
    <div className="ml-auto flex items-center gap-2">
<Button variant="ghost"  className="hidden sm:flex" onClick={()=>{
  router.push('/dashboard/edit-profile')
    }}>
   
    <div className="flex gap-2 items-center ">
    <User />
    <div>

  Profile 
    </div>
    </div>
    </Button>
    <Button variant="ghost"  className="hidden sm:flex" >
    <a
    href="/login"
    rel="noopener noreferrer"
    target="_blank"
    className="dark:text-foreground"
    >
    <div className="flex gap-2 items-center ">
    <LogOutIcon/> 
    <div>

    Logout
    </div>
    </div>
    </a>
    </Button>

    </div>
    </div>
    </header>
  )
}
