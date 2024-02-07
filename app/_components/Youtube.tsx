export default function YouTube({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-xl shadow">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        allowFullScreen
        className="m-0 block size-full border-none object-cover p-0"
        loading="lazy"
      />
    </div>
  );
}
