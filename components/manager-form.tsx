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
import {

  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { updateArtist} from "@/shared/api/post/artist"

const formSchema = z.object({
  first_name: z.string().min(1).nullable().optional(), 
  last_name: z.string().min(1).nullable().optional(), 
  dob: z.coerce.date(),
  phone: z.string().nullable().optional(),
  address: z.string().min(1).nullable().optional(),
});

interface PropsInterface{
  flag:boolean ;
  id:number;
  email:string | null |undefined;
  first_name:string | null |undefined;
  last_name:string | null |undefined;
  phone:string | null|undefined;
  dob:string | null|undefined;
  address:string | null|undefined;

}
export function ManagerForm({
  flag,
  id,
  email,
  first_name,
  last_name,
  phone,
  dob,
  address,
}: PropsInterface) { {
  
   
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name:first_name, 
      last_name:last_name,
      dob: new Date(dob),
      phone: phone, 
      address: address, 
    },
  })

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {

      const formattedValues = {
        id:id,
        first_name: values.first_name,
        last_name:values.last_name,
        dob: formatDate(values.dob, "yyyy-MM-dd"),
        phone: values.phone,
        address: values.address,
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
        <Button variant="outline" className="border-none">Edit</Button>
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
    name="first_name"
    render={({ field }) => (
      <FormItem>
      <FormLabel>First Name</FormLabel>
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
    name="last_name"
    render={({ field }) => (
      <FormItem>
      <FormLabel>Last Name</FormLabel>
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
    name="phone"
    render={({ field }) => (
      <FormItem>
      <FormLabel>Phone</FormLabel>
      <FormControl>
      <Input 
      placeholder="Phone Number"

      type=""
      {...field} />
      </FormControl>
      
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
