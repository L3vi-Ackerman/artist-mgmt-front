import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArtistInterface } from "@/types/interface";
import ArtistForm from "./artist-form";
import { Trash } from "lucide-react";
import { deleteArtist } from "@/shared/api/post/artist";
import { ToastContainer } from "react-toastify";
interface ArtistTableProps {
  data: ArtistInterface[];
}
export function ArtistTable({ data }: ArtistTableProps) {
  return (
    <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">ID</TableHead>
    <TableHead>E-mail</TableHead>
    <TableHead>Name</TableHead>

    <TableHead>No. of Albumns</TableHead>
    <TableHead>DOB</TableHead>
    <TableHead>First Album Release Year</TableHead>
    <TableHead>Address</TableHead>
    </TableRow>
    </TableHeader>
    <TableBody>
    {data?.map((item, index) => (

      <TableRow key={index + 1}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.user.email}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
      {item.no_of_albumns_released}
      </TableCell>
      <TableCell>{item.dob}</TableCell>

      <TableCell>{item.first_release_year}</TableCell>
      <TableCell>
      <div className="flex items-center justify-between">

      {item.address}

      <div className="flex gap-2 items-center pr-4">
      <ArtistForm
      flag={false}
      id={item.id}
      email={item.user?.email || ''}
      name={item.name}
      gender={item.gender}
      no_of_albumns_released={item.no_of_albumns_released}
      first_release_year={item.first_release_year}
      dob={item.dob}
      address={item.address}
      />
      <Trash size={20} color="black" onClick={()=>deleteArtist(item.id)}/>
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
