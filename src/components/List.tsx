import { useState, useEffect, createRef } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

import PlaceDetails from './PlaceDetails';
import useStyles from './listStyle';
import { GridRefType, Place } from '../types';

type PropType = {
  isLoading: boolean;
  isError: boolean;
  childClicked: any;
  places: Place[];
  type: string;
  rating: string;
  setType: (type: string) => void;
  setRating: (rating: string) => void;
};

const List = ({
  isLoading,
  isError,
  childClicked,
  places,
  type,
  setType,
  rating,
  setRating,
}: PropType) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState<GridRefType[]>([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef()),
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress size="5rem" color="secondary" />
        </div>
      )}
      {isError && (
        <div>
          <Typography variant="h5">
            Something went wrong. Please try again later.
          </Typography>
        </div>
      )}

      {!isLoading && (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as string)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value as string)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
