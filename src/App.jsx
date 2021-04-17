import "./App.css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Globe from "./components/Globe";
import markers from "./countryinfo";
import { getData, getWorld } from "./service";
import Location from "./svgs/location";
import Loader from "./components/Loader";
import { useToasts } from "react-toast-notifications";
import Search from "./components/Search";
import Panel from "./components/Panel";
import { fetchData } from "./functions/fetchData";
import Spinner from "./components/Spinner";

function getLocation(onSelect, addToast, geolocation, setLoadLocation) {
  if (geolocation.current) {
    setLoadLocation(false);
    onSelect(geolocation.current);
    return;
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=10f12efaaad87a8ad5d491ab98bcdfc8`
        )
          .then((res) => res.json())
          .then((data) => {
            let country;
            markers.forEach((e) => {
              if (e.code === data[0].country) {
                country = e.city;
              }
            });
            onSelect(country);
            geolocation.current = country;
            addToast(`You are in ${country}`, {
              appearance: "success",
              autoDismiss: true,
            });
            // alert(country);
            setLoadLocation(false);
          });
      },
      (error) => {
        addToast(`Please check you location permission!`, {
          appearance: "error",
          autoDismiss: true,
        });
        setLoadLocation(false);
      }
    );
  } else {
    addToast(`Location not available!`, {
      appearance: "error",
      autoDismiss: true,
    });
  }
}
function App() {
  const [event, setEvent] = useState();
  const [countries, setCountries] = useState(null);
  const [focus, setFoucs] = useState(null);
  const [over, setOver] = useState(null);
  const overDiv = useRef(null);
  const [status] = useState("Fetching data...");
  const { addToast } = useToasts();
  const geolocation = useRef(null);
  let [selectedCountry, setSelectedCountry] = useState(null);
  const [inputvalue, setInputValue] = useState("");
  const [loadLocation, setLoadLocation] = useState(false);

  useEffect(() => {
    setOver(event);
  }, [event]);

  useEffect(() => {
    getData().then((data) => {
      const update = fetchData(markers, data);

      getWorld().then((data) => {
        let d = data[0];
        let world = {
          city: "World Wide",
          newCase: +d.cases.new.slice(1) ?? 0,
          continent: "International",
          day: d.day,
          time: d.time,
          death: d.deaths.total,
          newDeath: d.deaths.new ?? 0,
          total: d.cases.total,
          active: d.cases.active,
          critical: d.cases.critical ?? 0,
          recovered: d.cases.recovered,
          test: d.tests.total,
        };
        update.push(world);
        setSelectedCountry(world);
      });
      setCountries(update);
    });
  }, []);

  const onClickMarker = useCallback((marker, markerObject, event) => {
    setSelectedCountry(marker);
    setFoucs(marker.coordinates);
    setInputValue(marker.city);
  }, []);

  function onSelect(item) {
    if (typeof item === "string") {
      item = countries.find((e) => e.city === item);
    }
    if (selectedCountry?.city !== item.city) {
      setSelectedCountry(item);
      setFoucs(item.coordinates);
      setInputValue(item.city);
    }
  }

  return (
    <div className="App">
      {!countries ? (
        <Loader status={status} />
      ) : (
        <>
          <Search
            onSelect={onSelect}
            inputvalue={inputvalue}
            setInputValue={setInputValue}
            countries={countries}
          />
          {loadLocation && <Spinner />}
          {over && (
            <div
              id="over"
              ref={overDiv}
              style={{
                position: "absolute",
                left: over.pointerEventPosition.x,
                top: over.pointerEventPosition.y,
              }}
            >
              <img alt="flag" src={over.marker.flag} id="overimg" />
              <span>{over.marker.city}</span>
              <br />
              <span id="newover">+{over.marker.newCase}</span>
            </div>
          )}
          <Location
            id="location"
            onClick={() => {
              setLoadLocation(true);
              getLocation(onSelect, addToast, geolocation, setLoadLocation);
            }}
          />
          <Panel
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setInputValue={setInputValue}
          />
          <Globe
            onClickMarker={onClickMarker}
            markers={countries}
            focus={focus}
            setEvent={setEvent}
          />
        </>
      )}
    </div>
  );
}
export default App;
