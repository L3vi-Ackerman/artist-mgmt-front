'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table";

import { Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { ArtistInterface, ProfileInterface} from "@/types/interface";
import { userQuery } from "@/shared/Query/userQuery";
import { ManagerForm } from "./manager-form";
interface TableProps {
  data:ProfileInterface[];
}
export function ManagerTable() {
  
  const { data:user, isLoading, isError } = userQuery("profile");
  console.log(user)
  if(isLoading) return <p>Loading</p>
  if(isError) return <p>Error</p>
  if(user){
    return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Name</TableHead>

          <TableHead>Phone</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user.map((item, index) => (
          <TableRow key={index + 1}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.user.email}</TableCell>
            {/* <TableCell>{item.user.role}</TableCell> */}
            <TableCell>
              {item.first_name} {item.last_name}
            </TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.dob}</TableCell>
              <TableCell>
      <div className="flex items-center justify-between">

      {item.address}

      <div className="flex gap-2 items-center pr-4">
    <ManagerForm 
      flag= {false}
      id ={item.id}
      email={item.user.email}
      first_name={item.first_name}
      last_name ={item.last_name}
      phone = {item.phone ?? 0}
      dob = {item.dob}
      address = {item.address}

      />
      <Trash size={20} color="black" onClick={()=>deleteArtist(item.id)}/>
      <ToastContainer />

      </div>

      </div>

      </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
  }
  
}
