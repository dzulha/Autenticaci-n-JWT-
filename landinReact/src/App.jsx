import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <Card
            title="Mountains"
            text="Explore the beauty of nature."
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
          />
          <Card
            title="City Life"
            text="Discover vibrant urban scenes."
            image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80"
          />
          <Card
            title="Beach Vibes"
            text="Relax by the ocean."
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
          />
          <Card
            title="Adventure"
            text="Find your next thrill."
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
