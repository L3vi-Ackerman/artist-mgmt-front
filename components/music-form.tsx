"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format, formatDate } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { updateArtist } from "@/shared/api/post/artist";

const formSchema = z.object({
  title: z.string().min(1).nullable().optional(), // Optional and can be null
  name: z.string().min(1).nullable().optional(), // Optional and can be null
  album_name: z.string().nullable().optional(),
  genre: z.string().min(1).nullable().optional(),
});

interface PropsInterface {
  id: number;
  name: string | null | undefined;
  genre: string | null | undefined;
  title: string | null | undefined;
  album_name: string | null | undefined;
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
          name: values.name,
          title: values.title,
          genre: values.genre,
          album_name: values.album_name,
        };

        console.log(formattedValues);
        const result = await updateArtist(formattedValues);
        console.log(result);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-none text-right">
             <Pen size={12} color="green" />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        type="text"
                        {...field}
                      />
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
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="RNB">RNB</SelectItem>
                        <SelectItem value="Country">Country</SelectItem>
                        <SelectItem value="Classic">Classic</SelectItem>
                        <SelectItem value="Rock">Rock</SelectItem>
                        <SelectItem value="Jazz">Jazz</SelectItem>
                      </SelectContent>
                    </Select>

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
                      <Input placeholder="Address" type="" {...field} />
                    </FormControl>

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
                        type=""
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
      </Sheet>
    );
  }
}
