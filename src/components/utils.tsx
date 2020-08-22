import Toastify from "toastify-js";

export const mapbox_key =
  "pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw";

export const API_URL = "https://kraken-demo.herokuapp.com";

export const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const googleMapsAPIKEY = "AIzaSyD5kFZMwUIUDZ25nTtLx0_0G3x1d2GMiCY";

export const normalizeText = (text) => {
  return text.split("_").join(" ");
};

const defaultCoordinates = {
  long: 121.001433,
  lat: 14.507936,
};

export const getCurrentLocation = () => {
  try {
    let savedCoordinates = JSON.parse(localStorage.currentLocation);
    return savedCoordinates;
  } catch {
    return defaultCoordinates;
  }
};

export const seCurrentLocation = (data: object) => {
  localStorage.currentLocation = JSON.stringify(data);
};

export const loadChart = () => {
  let rtChart = document.querySelector(".rt-chart") as HTMLElement;

  if (window.location.pathname === "/map") {
    rtChart.style.display = "flex";
  } else {
    rtChart.style.display = "none";
  }
};

export const Toast = (message, url) => {
  Toastify({
    text: message,
    duration: 2000,
    destination: "/incidents",
    newWindow: false,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
};

export const eventSpike = () => {
  let sbtn = document.getElementById("activityBtn") as HTMLButtonElement;
  sbtn.click();
};

export const fetchIncidentGeoJSON = () => {
  let baseDataLayer = {
    type: "FeatureCollection",
    features: [],
  };

  let incidentData = JSON.parse(localStorage.incidents);
  incidentData = incidentData.filter((x) => x.status === "PENDING");

  incidentData.forEach((incident) => {
    let pointData = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [incident.coordinates.long, incident.coordinates.lat],
      },
      properties: {
        title: incident.details,
        uid: incident.id,
        type: incident.type,
      },
    };

    baseDataLayer.features.push(pointData);
  });

  return baseDataLayer;
};
