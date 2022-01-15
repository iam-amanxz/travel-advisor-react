import { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';
import usePlaces from './hooks/usePlaces';
import { Bound, Coord, Place } from './types';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState<string>('');
  const [coords, setCoords] = useState<Coord | {}>({});
  const [bounds, setBounds] = useState<Bound | null>(null);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [childClicked, setChildClicked] = useState(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  useEffect(() => {
    // get user location on first load
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  useEffect(() => {
    // get filtered places when filter updated
    const filtered = places.filter(
      (place) => Number(place.rating) > Number(rating),
    );
    setFilteredPlaces(filtered);
  }, [rating]);

  // get places
  const { isLoading, isError, places } = usePlaces({ type, bounds });

  const onLoad = (value: google.maps.places.Autocomplete) =>
    setAutocomplete(value);

  const onPlaceChanged = () => {
    const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
    const lng = autocomplete?.getPlace()?.geometry?.location?.lng();

    if (lat && lng) {
      setCoords({ lat, lng });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isError={isError}
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
