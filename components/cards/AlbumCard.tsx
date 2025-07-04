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
import { SquarePen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type AlbumCardProps = {
  title: string;
  description: string | null;
  albumId: string;
  isPrivate: boolean;
};

export default function AlbumCard(props: AlbumCardProps) {
  return (
    <Card className="w-full max-w-xs bg-neutral-800 border-gray-950">
      <CardHeader>
        <CardTitle className="text-white">{props.title}</CardTitle>
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
        <Button className="w-2/3" asChild variant={"outline"}>
          <Link
            href={
              props.isPrivate
                ? `/album/${props.albumId}`
                : `/u/album/${props.albumId}`
            }
          >
            View Album
          </Link>
        </Button>
        {props.isPrivate && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-1/3" asChild>
                <Link href={`/album/edit/${props.albumId}`}>
                  <SquarePen />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Album</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
}
