"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  format,
  formatDate
} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Calendar
} from "@/components/ui/calendar"
import {
  Calendar as CalendarIcon
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Pen} from 'lucide-react'
import {

  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { updateArtist} from "@/shared/api/post/artist"

const formSchema = z.object({
  name: z.string().min(1).nullable().optional(), // Optional and can be null
  dob: z.coerce.date(),
  gender: z.string().nullable().optional(),
  address: z.string().min(1).nullable().optional(),
  first_release_year: z.string().nullable().optional(),
  no_of_albumns_released: z.string().min(1).nullable().optional(),
});

interface PropsInterface{
  flag:boolean ;
  id:number;
  email:string | null |undefined;
  name:string | null |undefined;
  gender:string | null|undefined;
  no_of_albumns_released:number | null|undefined;
  first_release_year:string | null|undefined;
  dob:string | null|undefined;
  address:string | null|undefined;

}
export default function ArtistForm({
  flag,
  id,
  email,
  name,
  gender,
  no_of_albumns_released,
  first_release_year,
  dob,
  address,
}: PropsInterface) { {
  
   
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name, 
      dob: new Date(dob),
      gender: gender, 
      address: address, 
      first_release_year: first_release_year, 
      no_of_albumns_released: no_of_albumns_released?.toString(),
    },
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {

      const formattedValues = {
        id:id,
        name: values.name,
        dob: formatDate(values.dob, "yyyy-MM-dd"),
        gender: values.gender,
        address: values.address,
        first_release_year: values.first_release_year, 
        no_of_albumns_released: parseInt(values?.no_of_albumns_released),
      }

      console.log(formattedValues);
      const result = await updateArtist(formattedValues) 

    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
  <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-none">{flag? ('Edit'):(<Pen size={12} color="green"/> )}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="m-0 pb-0 ">
          <SheetTitle>Edit profile</SheetTitle>
          {/*<SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-4">

    <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
      <Input 
      placeholder="Enter your full name"
      type="text"
      {...field} />
      </FormControl>
      
      <FormMessage />
      </FormItem>
    )}
    />

    <FormField
    control={form.control}
    name="dob"
    render={({ field }) => (
      <FormItem className="flex flex-col">
      <FormLabel>Date of birth (A.D)</FormLabel>
      <Popover>
      <PopoverTrigger asChild>
      <FormControl>
      <Button
      variant={"outline"}
      className={cn(
        "w-[240px] pl-3 text-left font-normal",
        !field.value && "text-muted-foreground"
      )}
      >
      {field.value ? (
        format(field.value, "PPP")
      ) : (
      <span>Pick a date</span>
      )}
      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
      </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
      <Calendar
      mode="single"
      selected={field.value}
      onSelect={field.onChange}
      initialFocus
      />
      </PopoverContent>
      </Popover>
      
      <FormMessage />
      </FormItem>
    )}
    />

    <FormField
    control={form.control}
    name="gender"
    render={({ field }) => (
      <FormItem>
      <FormLabel>Gender</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
      <SelectTrigger>
      <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      </FormControl>
      <SelectContent>
      <SelectItem value="M">Male</SelectItem>
      <SelectItem value="F">Female</SelectItem>
      </SelectContent>
      </Select>

      <FormMessage />
      </FormItem>
    )}
    />

    <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem>
      <FormLabel>Address</FormLabel>
      <FormControl>
      <Input 
      placeholder="Address"

      type=""
      {...field} />
      </FormControl>
      
      <FormMessage />
      </FormItem>
    )}
    />

    <FormField
    control={form.control}
    name="first_release_year"
    render={({ field }) => (
      <FormItem>
      <FormLabel>First Albumn Release Date</FormLabel>
      <FormControl>
      <Input 
      placeholder="Music Release Date"

      type=""
      {...field} />
      </FormControl>
     
      <FormMessage />
      </FormItem>
    )}
    />

    <FormField
    control={form.control}
    name="no_of_albumns_released"
    render={({ field }) => (
      <FormItem>
      <FormLabel>No. of Albumns Released</FormLabel>
      <FormControl>
      <Input 
      placeholder="No. of Albumns Released"

      type=""
      {...field} />
      </FormControl>
     
      <FormMessage />
      </FormItem>
    )}
    />
    <SheetFooter className="px-0">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      
    </form>
    </Form>
</SheetContent>
    </Sheet>
  )
}
}
