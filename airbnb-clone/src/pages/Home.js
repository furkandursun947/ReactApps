import Banner from '@/components/Banner'
import Header from '@/components/Header'
import fetch from 'node-fetch';
import https from 'https';
import SmallCard from '@/components/SmallCard';
import MediumCard from '@/components/MediumCard';
import LargeCard from '@/components/LargeCard';
import Footer from '@/components/Footer';

const agent = new https.Agent({
    rejectUnauthorized: false,
});

export default function Home({exploreData, cardsData}) {
  return (
    <div>
      {/* header */}
      <Header/>
      {/* banner */}
      <Banner/>
    
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
            <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
            {/* Pull some data from server */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {exploreData?.map(({img, distance, location}, index) => (
                    <SmallCard key={index} location={location} img={img} distance={distance}/>
                ))}
            </div>
        </section>
        <section>
            <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
            <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3'>
                {cardsData?.map(({img, title}, index) => (
                    <MediumCard img={img} title={title} key={index}/>
                ))}
            </div>
        </section>
        <section>
            <LargeCard img='https://links.papareact.com/4cj' title='The Greatest Outdoors' description='Wishlists curated by Airbnb.' buttonText='Get Inspired'/>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp", {agent}).then((res) => res.json());
  const cardsData = await fetch("https://links.papareact.com/zp1", {agent}).then((res) => res.json());
  return {
    props: {
      exploreData,
      cardsData
    }
  }
}