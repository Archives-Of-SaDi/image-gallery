import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=${env.PIXABAY_KEY}&q=${term}&image_type=photo&pretty=true`
      );
      setImages(data.hits);
      setIsLoading(false);
    })();
  }, [term]);

  return (
    <div className="App">
      <div className="container mx-auto">
        <ImageSearch searchText={(text) => setTerm(text)} />

        {!isLoading && images.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-34">
            No images found
          </h1>
        )}

        {isLoading ? (
          <h1 className="text-6xl text-center mx-auto mt-34">Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
