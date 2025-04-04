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
import { ArtistInterface} from "@/types/interface";
interface TableProps {
  data: ArtistInterface[];
}
export function TableComponent({ data }: TableProps) {
  console.log(data)
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
            {/* <TableCell>{item.user.role}</TableCell> */}
            <TableCell>
              {item.first_name} {item.last_name}
            </TableCell>
            <TableCell>{item.no_of_albumns_released}</TableCell>
            <TableCell>{item.dob}</TableCell>
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
