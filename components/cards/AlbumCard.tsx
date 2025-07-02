import Link from "next/link";

type AlbumCardProps = {
  title: string;
  description: string | null;
  albumId: string;
};

export default function AlbumCard(props: AlbumCardProps) {
  return (
    <div className="border-2 border-black">
      <p>Title: {props.title}</p>
      <p>Description: {props?.description}</p>
      <Link
        className="bg-black text-white text-center"
        href={`/album/${props.albumId}`}
      >
        View Album
      </Link>
    </div>
  );
}
