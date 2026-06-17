import Header from '../components/Header/Header';
import ParallaxGrid from '../components/ParallaxGrid/ParallaxGrid';
import InteractiveMap from '../components/InteractiveMap/InteractiveMap';
import BeforeAfter from '../components/BeforeAfter/BeforeAfter';
import Booking from '../components/Booking/Booking';
import Social from '../components/Social/Social';

export default function Home() {
  return (
    <main>
      <Header />
      <ParallaxGrid />
      <InteractiveMap />
      <BeforeAfter />
      <Booking />
      <Social />
    </main>
  );
}
