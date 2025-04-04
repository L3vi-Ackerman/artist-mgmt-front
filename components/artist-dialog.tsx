import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { artistQuery } from "@/shared/Query/artistQuery";
export function ProfileDetail() {
  const {data:artist,isLoading,isError} = artistQuery()
  if(isLoading){
    return <p>Loading</p>
  }
  if(artist){
    console.log(artist)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
         <Card className=" p-2 m-4">
      <CardHeader>
       <CardTitle>Profile</CardTitle> 
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent >
        <form>
          <div className="grid grid-cols-2 w-3/4 items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <p>{artist.name}</p>
            </div>
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Address</Label>
              <p>{artist.address}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Date of Birth (DOB)</Label>
              <p>{artist.dob}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Gender</Label>
              <p>{artist.gender =='M'? 'Male':'Female'}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">No. of Albumns Released</Label>
              <p>{artist.no_of_albumns_released}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">First Albumn Release Year</Label>
              <p>{artist.first_release_year}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={()=>{
      router.push('/dashboard/profile-edit') 
        }}>Edit</Button>
      </CardFooter>
    </Card>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
  }
}
