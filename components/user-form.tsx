
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
import { updateUser } from "@/shared/api/post/user";
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

const formSchema = z.object({
  email: z.string().min(1),
  role: z.string().min(6),
  status: z.string().min(2),
})

interface PropsInterface {
  id: number;
  email: string ;
  role:string;
  status:string;
}
export default function UserForm({
  id,
  email,
  role,
  status
}: PropsInterface) {
  {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: email ,
        role: role,
        status:status,
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const formattedValues = {
          id: id,
          email: values.email,
          role: values.role,
          status: values.status === 'true',
        };

        console.log(formattedValues);
        const result = await updateUser(formattedValues);
        console.log(result);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    return (
      <Sheet>
      <SheetTrigger asChild>
      <Button variant="outline" className="border-none">
       <Pen size={12}  />
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
      name="email"
      disabled
      render={({ field }) => (
        <FormItem>
        <FormLabel>Email</FormLabel>
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
      name="role"
      render={({ field }) => (
        <FormItem>
        <FormLabel>Role</FormLabel>
        <Select
        onValueChange={field.onChange}
        defaultValue={field.value || ""}
        >
        <FormControl>
        <SelectTrigger>
        <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        </FormControl>
        <SelectContent>
        <SelectItem value="ARTIST">Artist</SelectItem>
        <SelectItem value="ARTIST_MANAGER">Manager</SelectItem>
        </SelectContent>
        </Select>
        <FormMessage />
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
        <FormLabel>Status</FormLabel>
        <Select
        onValueChange={field.onChange}
        defaultValue={field.value || ""}
        >
        <FormControl>
        <SelectTrigger>
        <SelectValue placeholder="Status" />
        </SelectTrigger>
        </FormControl>
        <SelectContent>
        <SelectItem value="true">Active</SelectItem>
        <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
        </Select>
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
