export const mapbox_key =
  "pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw";

export const API_URL = "https://onos-chore.herokuapp.com";

export const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const googleMapsAPIKEY = "AIzaSyD5kFZMwUIUDZ25nTtLx0_0G3x1d2GMiCY";

export const normalizeText = text => {
  return text.split("_").join(" ");
};

const defaultCoordinates = {
  long: 121.001433,
  lat: 14.507936
};

export const getCurrentLocation = () => {
  return localStorage.currentLocation
    ? JSON.parse(localStorage.currentLocation)
    : defaultCoordinates;
};

export const seCurrentLocation = (data: object) => {
  localStorage.currentLocation = JSON.stringify(data);
};