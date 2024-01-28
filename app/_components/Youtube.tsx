export default function YouTube({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-white/10 shadow">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className="size-full border-none object-cover"
      />
    </div>
  );
}
