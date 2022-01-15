import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bound, Place } from '../types';

type PropType = {
  type: string;
  bounds: Bound | null;
};

const usePlaces = ({ type, bounds }: PropType) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = async () => {
    if (bounds) {
      setIsLoading(true);
      setIsError(false);

      try {
        const {
          data: { data },
        } = await axios.get(
          `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
          {
            params: {
              bl_latitude: bounds.sw.lat,
              bl_longitude: bounds.sw.lng,
              tr_latitude: bounds.ne.lat,
              tr_longitude: bounds.ne.lng,
            },
            headers: {
              'x-rapidapi-key': import.meta.env
                .VITE_RAPID_API_TRAVEL_API_KEY as string,
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
          },
        );
        setPlaces(data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [type, bounds]);

  return { isLoading, isError, places };
};

export default usePlaces;
