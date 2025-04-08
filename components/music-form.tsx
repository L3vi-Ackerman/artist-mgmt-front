"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { updateMusic } from "@/shared/api/post/music";
import { ToastContainer, toast } from "react-toastify";
const formSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1), 
  album_name: z.string().min(1),
  genre: z.string().min(1)
});

interface PropsInterface {
  id: number;
  name: string;
  genre: string;
  title: string; 
  album_name: string
}
export  function MusicForm({
  id,
  name,
  genre,
  title,
  album_name,
}: PropsInterface) {
  {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: name,
        title: title,
        genre: genre,
        album_name: album_name,
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const formattedValues = {
          id: id,
          title: values.title,
          genre: values.genre,
          album_name: values.album_name,
        };

        console.log(formattedValues);
        const result = await updateMusic(formattedValues);
        if(result.success ) {
          toast.success("Updated Successful!")
        }
        else{ toast.error("Unauthorized to Update!")}
        console.log(result.message);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    return (
      <Sheet>
      <SheetTrigger asChild>
      <Button variant="outline" className="border-none text-right">
      <Pen size={12} />
      </Button>
      </SheetTrigger>
      <SheetContent>
      <SheetHeader className="m-0 pb-0 ">
      <SheetTitle>Edit profile</SheetTitle>

      </SheetHeader>
      <Form {...form}>
      <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 mx-4"
      >
      <FormField
      control={form.control}
      name="name"
      disabled={true}
      render={({ field }) => (
        <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
        <Input
        placeholder="Enter your full name"
        type="text"
        {...field}
        value={field.value ?? ''}
        />
        </FormControl>

        <FormMessage />
        </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
        <Input placeholder="Address" type="" {...field} value={field.value ?? ''} />
        </FormControl>

        <FormMessage />
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="genre"
      render={({ field }) => (
        <FormItem>
        <FormLabel>Genre</FormLabel>
        <Select
        onValueChange={field.onChange}
        defaultValue={field.value ?? ''}
        >
        <FormControl>
        <SelectTrigger>
        <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        </FormControl>
        <SelectContent>
        <SelectItem value="rnb">RNB</SelectItem>
        <SelectItem value="c">Country</SelectItem>
        <SelectItem value="cl">Classic</SelectItem>
        <SelectItem value="r">Rock</SelectItem>
        <SelectItem value="j">Jazz</SelectItem>
        </SelectContent>
        </Select>

        <FormMessage />
        </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name="album_name"
      render={({ field }) => (
        <FormItem>
        <FormLabel>Album Name</FormLabel>
        <FormControl>
        <Input
        placeholder="Music Release Date"
        type="text"
        {...field}
        />
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
      <ToastContainer />
      </Sheet>

    );
  }
}
