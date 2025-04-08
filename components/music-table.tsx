'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { deleteArtist } from "@/shared/api/post/artist";
import { ToastContainer } from "react-toastify";
import { musicQuery } from "@/shared/Query/musicQuery";
import {MusicForm} from "./music-form";
const genreMap: { [key: string]: string } = {
  rnb: "RNB",
  c: "country",
  cl: "classic",
  r: "rock",
  j: "jazz",
};

const getGenreDisplay = (genreCode: string): string | undefined => {
  return genreMap[genreCode];
};
export function MusicTable() {
  const {data, isLoading, isError} = musicQuery()
  if(isLoading) return <p>loading</p>
    if(data){
      return (
        <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Album</TableHead>

        <TableHead>Genre</TableHead>
        <TableHead>Artist</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {data?.map((item, index) => (

          <TableRow key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.album_name}</TableCell>
          <TableCell>
          {getGenreDisplay(item.genre)}
          </TableCell>
          <TableCell>
          <div className="flex items-center justify-between">

          {item.artist.name}

          <div className="flex gap-2 items-center pr-4">
          <MusicForm          id={item.id}
          name={item.artist.name || ''}
          title={item.title}
          genre={getGenreDisplay(item.genre) ||""}
          album_name={item.album_name}
          />
          <Trash size={18} color="black" onClick={()=>deleteArtist(item.id)}/>
          </div>

          </div>

          </TableCell>


          {/* <TableCell>

              </TableCell> */}

          <ToastContainer />
          </TableRow>

        ))}
        </TableBody>

        </Table>
      );

    }

}
