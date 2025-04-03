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
import { ArtistInterface } from "@/types/interface";
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

          <TableHead>Phone</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index + 1}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.user.email}</TableCell>
            <TableCell>{item.user.role}</TableCell>
            <TableCell>
            {item.name}
            </TableCell>
            <TableCell>{item.gender}</TableCell>
            
            <TableCell>{item.no_of_albumns_released}</TableCell>
            <TableCell>{item.address}</TableCell>
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
