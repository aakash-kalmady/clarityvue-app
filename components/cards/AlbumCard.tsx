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
  imageUrl: string;
  isPrivate: boolean;
};

export default function AlbumCard(props: AlbumCardProps) {
  return (
    <Card className="w-full max-w-xs ">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={props.imageUrl}
          style={{ objectFit: "contain" }}
          alt="image"
          height={200}
          width={200}
          quality={50}
        />
      </CardContent>
      <CardFooter className="flex justify-around gap-2">
        <Button
          className={props.isPrivate ? "w-2/3" : "w-full"}
          asChild
          variant={"secondary"}
        >
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
              <Button className="w-1/3" asChild variant={"outline"}>
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
