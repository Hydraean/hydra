import Toastify from "toastify-js";

export const mapbox_key =
  "pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw";

export const API_URL = "https://kraken-demo.herokuapp.com";

// export const API_URL = "http://localhost:7000";

export const guid = () => {
  return "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
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

export const ErrorToast = (message) => {
  Toastify({
    text: message,
    duration: 2000,
    destination: "/analytics",
    newWindow: false,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #c91821, #c91)",
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

  // add to marker for user location
  if (localStorage.userLocation) {
    let uLocation = JSON.parse(localStorage.userLocation);
    let pointData = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [uLocation.long, uLocation.lat],
      },
      properties: {
        title: "CURRENT LOCATION",
        uid: "1123121231231232",
        type: "user_location",
      },
      locationUpdates: [],
    };

    baseDataLayer.features.push(pointData);
  }

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

export const fetchUser = () => {
  if (localStorage.user) {
    return JSON.parse(localStorage.user);
  } else {
    return {};
  }
};

export const publishedList = [
  {
    title: "Progress Update: April 2021",
    url: "https://sagipinas.vercel.app/docs/project-update-april-2021",
  },
  {
    title: "Progress Update: March 28, 2021",
    url: "https://sagipinas.vercel.app/docs/project-update-march-28-2021",
  },
  {
    title: "Presented potential use of Seantinel for Maritime Surveillance",
    url: "https://www.facebook.com/oceana.ph/videos/261932312161995",
  },
  {
    title: "Karagathon Presentation",
    url: "https://www.youtube.com/watch?v=7L645X3v4mw&t=28s",
  },
  {
    title: "About Karagathon",
    url:
      "https://www.facebook.com/oceana.ph/photos/a.820968671282627/3201295939916543/",
  },
  {
    title: "Seantinel December 2020, Progress udpdate ",
    url:
      "https://sagipinas.vercel.app/docs/seantinel#project-update-december-14-2020",
  },
  {
    title: "Seantinel Project Documentation",
    url: "https://sagipinas.vercel.app/docs/seantinel",
  },
];

export const clearSession = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

export const getBearing = (startLat, startLong, endLat, endLong) => {
  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(
    Math.tan(endLat / 2.0 + Math.PI / 4.0) /
      Math.tan(startLat / 2.0 + Math.PI / 4.0)
  );
  if (Math.abs(dLong) > Math.PI) {
    if (dLong > 0.0) dLong = -(2.0 * Math.PI - dLong);
    else dLong = 2.0 * Math.PI + dLong;
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
};

export function measureCoordDistance(lat1, lon1, lat2, lon2, unit) {
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);
  lat2 = parseFloat(lat2);
  lon2 = parseFloat(lon2);

  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}
