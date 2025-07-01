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
        href={`dashboard/album/edit/${props.albumId}`}
        className="bg-black text-white text-center"
      >
        Edit Album
      </Link>
    </div>
  );
}
