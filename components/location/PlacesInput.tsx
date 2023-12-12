import React, { useState, ChangeEvent } from 'react';
import Autocomplete from 'react-google-autocomplete';

interface PlacesInputProps {
  onSelect: (location: google.maps.LatLngLiteral) => void;
}

const PlacesInput: React.FC<PlacesInputProps> = ({ onSelect }) => {
  const handlePlaceSelect = (place: any) => {
    const { geometry } = place;

    if (geometry) {
      const location = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      };

      onSelect(location);
    }
  };

  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={handlePlaceSelect}
      types={['geocode']}
      componentRestrictions={{ country: 'us' }} // Adjust the country restriction as needed
    />
  );
};

export default PlacesInput;