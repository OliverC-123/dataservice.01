// import css to show map
import "leaflet/dist/leaflet.css";

import L from "leaflet";

// import map pin - you are here
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// code for Pin icon and how it should act
let Pin = L.icon({
  iconUrl: icon,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});
let mymap, marker;

var popup = L.popup();

// must receive parameters as an array
export const getMap = (coords, weather) => {
  console.log("1", mymap);
  if (!mymap || mymap == null) {
    mymap = L.map("mapdiv");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    // declaring marker icon only once
    marker = L.marker(coords, { icon: Pin }).addTo(mymap);
    // mymap.on("click", onMapClick);
    mymap.on("click", (e) => {
      console.log(e);
    });
  }

  marker.setLatLng(coords).bindPopup(weather);
  mymap.setView(coords, 10);

  // close map function
};

export const getGeo = (position, weather) => {
  console.log("2", mymap);
  if (!mymap || mymap == null) {
    mymap = L.map("mapdiv");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    // declaring marker icon only once
    marker = L.marker(position, { icon: Pin }).addTo(mymap);

  }

  marker.setLatLng(position).bindPopup(weather);
  mymap.setView(position, 13);
};

export const delMap = () => {
  if (mymap) {
    mymap.off();
    mymap = null;
  }
};


