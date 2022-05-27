import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';




function SearchLocationInput(props) {
    const autoCompleteRef = useRef(null);
    const history = useHistory();

    //create the autocomplete widget
    let autoComplete;

    useEffect(() => {
        // assign autoComplete with Google maps place one time
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: ["(cities)"], componentRestrictions: { country: "us" } }
        );
        
        // specify what properties we will get from API
        autoComplete.setFields(["geometry.location", "address_components"]); 

        // add a listener to handle when the place is selected
        autoComplete.addListener("place_changed", () => handlePlaceSelect());
    }, []);

    function handlePlaceSelect() {
        const addressObject = autoComplete.getPlace(); // get place from google api
        const formattedQuery = addressObject.formatted_address;
        history.push(`/day/${addressObject.geometry.location.lat(formattedQuery)}/${addressObject.geometry.location.lng(formattedQuery)}`);
        autoCompleteRef.current.value = "";
    }

    return (
        <>
            <input
            className="form-control me-2"
            ref={autoCompleteRef}
            placeholder="Search City"
            />
        </>
    );
}

export default SearchLocationInput;