import React, { useState, useEffect, useRef } from 'react';

let autoComplete;

function SearchLocationInput(props) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyD8k_gpcxH7yrSqL0rkEFyKgDPi_yDNyaw&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    // dynamically load JavaScript files in our html with callback when finished
    const loadScript = (url, callback) => {
        let script = document.createElement("script"); // create script tag
        script.type = "text/javascript";

        // when script state is ready and loaded or complete we will call callback
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url; // load by url
        document.getElementsByTagName("head")[0].appendChild(script); // append to head
    };

    // handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
    function handleScriptLoad(updateQuery, autoCompleteRef) {
        // assign autoComplete with Google maps place one time
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: ["(cities)"], componentRestrictions: { country: "us" } }
        );
        autoComplete.setFields(["geometry.location", "address_components"]); // specify what properties we will get from API
        // add a listener to handle when the place is selected
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace(); // get place from google api
        const query = addressObject.formatted_address;
        updateQuery(query);
        props.passbackGeolocation({
            city: (addressObject.address_components[0].long_name + ", " + addressObject.address_components[2].short_name),
            lat: addressObject.geometry.location.lat(query),
            lng: addressObject.geometry.location.lng(query)
        });
    }

    return (
        <>
            <input
            className="form-control me-2"
            ref={autoCompleteRef}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search City"
            value={query}
            />
        </>
    );
}

export default SearchLocationInput;