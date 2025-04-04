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
import { UserInterface } from "@/types/interface";
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
    <TableHead>Signup date</TableHead>
    </TableRow>
    </TableHeader>
    {/*{isLoading && <h1> Loading </h1>} */}
    <TableBody>

    {data.map((item, index) => (
      <TableRow key={index + 1}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.email}</TableCell>
      {/* <TableCell>{item.user.role}</TableCell> */}
      <TableCell>
      {item.role == 'ARTIST_MANAGER' ? 'Manager':'Artist'}
      </TableCell>

      <TableCell>{item.is_active ? "Active" : "Inactive"}</TableCell>


      <TableCell>{item.date_joined.split('T')[0]}</TableCell>
      </TableRow>
    ))}
    </TableBody>



    </Table>
  );

  }
}
