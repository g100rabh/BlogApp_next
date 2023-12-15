import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationInput: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<any>(null);

  const handleSelect = async (selected: string) => {
    try {
      const results = await geocodeByAddress(selected);
      const latLng = await getLatLng(results[0]);
      setAddress(selected);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <StandaloneSearchBox>
              <input {...getInputProps({ placeholder: "Type address" })} />
            </StandaloneSearchBox>

            <div>
              {loading && <div>Loading...</div>}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    // key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={defaultCenter}
      >
        {/* Additional map components go here */}
      </GoogleMap>

      {coordinates && (
        <p>
          Coordinates: Lat {coordinates.lat}, Lng {coordinates.lng}
        </p>
      )}
    </LoadScript>
  );
};

export default LocationInput;
