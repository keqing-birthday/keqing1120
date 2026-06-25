import MusicPlayerCard from './MusicPlayerCard';

export default function MusicPlayerWidget() {
  return (
    <div className="hidden 2xl:block fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40">
      <MusicPlayerCard compact />
    </div>
  );
}
