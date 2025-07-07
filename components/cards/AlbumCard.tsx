import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function AlbumCard(props: {
  title: string;
  description: string | null;
  albumId: string;
  imageUrl: string;
  isPrivate: boolean;
  username: string;
}) {
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
        <Button className={props.isPrivate ? "w-2/3" : "w-full"} asChild>
          <Link
            href={
              props.isPrivate
                ? `/album/${props.albumId}`
                : `/u/${props.username}/${props.albumId}`
            }
          >
            View Album
          </Link>
        </Button>
        {props.isPrivate && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-1/3" asChild variant={"outline"}>
                <Link href={`/album/edit/${props.albumId}?redirect=/dashboard`}>
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
