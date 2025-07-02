import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

type AlbumCardProps = {
  title: string;
  description: string | null;
  albumId: string;
};

export default function AlbumCard(props: AlbumCardProps) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src="/assets/stock.jpg"
          alt="Stock Image"
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="flex justify-around gap-2">
        <Button className="w-full">
          <Link href={`/album/${props.albumId}`}>View Album</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
