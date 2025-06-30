import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import Footer from './components/Footer';
import { MagicCard } from "../components/ui/magic-card";


export default function Home() {
  const destinations = [
    {
      id: 1,
      name: 'Taj Mahal, Agra',
      image: '/images/taj.jpg',
      description: 'A UNESCO World Heritage Site, the Taj Mahal is an iconic symbol of love and one of the Seven Wonders of the World.',
    },
    {
      id: 2,
      name: 'Jaipur, Rajasthan',
      image: '/images/jaipur.jpg',
      description: 'Known as the Pink City, Jaipur is famous for its historic forts, palaces, and vibrant culture.',
    },
    {
      id: 3,
      name: 'Kerala Backwaters',
      image: '/images/kerla.jpg',
      description: 'Experience the serene beauty of Kerala’s backwaters with houseboat cruises and lush greenery.',
    },
    {
      id: 4,
      name: 'Varanasi, Uttar Pradesh',
      image: '/images/varansi.jpeg',
      description: 'One of the oldest cities in the world, Varanasi is a spiritual hub on the banks of the Ganges River.',
    },
    {
      id: 5,
      name: 'Goa Beaches',
      image: '/images/goa.jpeg',
      description: 'Famous for its golden beaches, vibrant nightlife, and Portuguese heritage.',
    },
    {
      id: 6,
      name: 'Leh-Ladakh',
      image: '/images/ladhakh.jpg',
      description: 'A paradise for adventure enthusiasts, known for its stunning landscapes and monasteries.',
    },
    {
      id: 7,
      name: 'Rann of Kutch, Gujarat',
      image: '/images/rann.jpg',
      description: 'A seasonal salt marsh famous for its white desert and the Rann Utsav festival.',
    },
    {
      id: 8,
      name: 'Hampi, Karnataka',
      image: '/images/hampi.jpg',
      description: 'A UNESCO World Heritage Site, Hampi is known for its ancient temples and ruins.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="container mx-auto px-4 py-12">
          <MagicCard />
          <SearchBar />
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Top Tourist Spots in India</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                name={dest.name}
                image={dest.image}
                description={dest.description}
              />
            ))}
          </div>
        </section>
      </main>


      <div>
        <h1 className='map'>Visit using Map</h1>
        <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124684.39467468763!2d73.78056571763675!3d18.524761374915713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1739813000547!5m2!1sen!2sin" 
  width="600" 
  height="450" 
  style={{ border: 0 }} 
  allowFullScreen 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade" 
/>
</div>
      <Footer />
    </div>
  );
}
