import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import { useState, useEffect } from 'react';
import { GetCoordinates } from './coordinates.js';

export function Map({ locationtest }: { locationtest: string }) {
  const [latgood, setLatgood] = useState(null);
  const [lnggood, setLnggood] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const [lat, lng] = await GetCoordinates(locationtest);
      setLatgood(lat);
      setLnggood(lng);
    };
    fetchCoordinates();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBGwo4KfC880qldYVqzMODQAIEmHt0pMeo",
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div style={{ height: "400px", width: "400px"}}>
      <GoogleMap
        
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={8}
        center={{ lat: latgood, lng: lnggood }}
      />
    </div>
  );
}