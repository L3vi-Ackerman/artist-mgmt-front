"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userQuery } from "@/shared/Query/userQuery";
import { Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import UserForm from "../user-form";
export function UserTableComponent() {

  const {data,isLoading,isError} = userQuery('user')
  if(isLoading) {
    return <p>Loading...</p>
  }
  if(data){

    console.log('user table data', data)
    return (
      <Table>
      <TableCaption>A list of your recent invoices</TableCaption>
      <TableHeader>
      <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>E-mail</TableHead>
      <TableHead>Role</TableHead>

      <TableHead>Status</TableHead>
      </TableRow>
      </TableHeader>
      {/*{isLoading && <h1> Loading </h1>} */}
      <TableBody>

      {data.map((item, index:number) => (
        <TableRow key={index + 1}>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
        {item.role == 'ARTIST_MANAGER' ? 'Manager':'Artist'}
        </TableCell>

        <TableCell>
        <div className="flex items-center justify-between">
        {item.is_active ? "Active" : "Inactive"}
        <div className="flex gap-2 items-center pr-4">
        <UserForm 
        id={item.id}
        email = {item.email}
        role = {item.role}
        status = {item.is_active.toString()}
        />
        <Trash size={18} color="black" />
        <ToastContainer />

        </div>

        </div>

        </TableCell>

        </TableRow>
      ))}
      </TableBody>



      </Table>
    );

  }
}
