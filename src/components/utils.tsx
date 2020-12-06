import Toastify from "toastify-js";

export const mapbox_key =
  "pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw";

export const API_URL = "https://kraken-demo.herokuapp.com";

// export const API_URL = "http://localhost:7000";

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
    destination: "/analytics",
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

export const ellipsis = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  } else {
    return text;
  }
};

const global: any = window;

export const fetchIncidentGeoJSON = () => {
  let baseDataLayer = {
    type: "FeatureCollection",
    features: [],
  };

  let incidentData = global.incidents ? global.incidents : [];
  incidentData = incidentData.filter((x) => x.status === "PENDING");

  incidentData.forEach((incident) => {
    let pointData = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [incident.coordinates.long, incident.coordinates.lat],
      },
      properties: {
        title: incident.title,
        uid: incident.id,
        type: incident.type,
      },
      locationUpdates: incident.updates ? incident.updates : [],
    };

    baseDataLayer.features.push(pointData);
  });

  return baseDataLayer;
};

export const soundNotif = () => {
  let audio = document.getElementById("sound-notif") as HTMLAudioElement;
  audio.play();
};

export const setCurrentIncident = (data: any) => {
  global.currentIncident = data;

  // Create route path.
  let coordSet = [[data.coordinates.long, data.coordinates.lat]];

  if (data.updates) {
    data.updates.forEach((x) => {
      coordSet.push([x.coordinates.long, x.coordinates.lat]);
    });
  }

  let routeData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordSet,
    },
  };

  global.eventPath = routeData;
};

export const clearEventLinePath = () => {
  let incidentTrackBtn: any = document.getElementById("incident-track");

  let routeData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  global.eventPath = routeData;

  if (incidentTrackBtn) {
    incidentTrackBtn.click();
  }
};

export const currentIncident = global.currentIncident;
