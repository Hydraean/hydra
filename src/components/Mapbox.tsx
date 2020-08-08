import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { mapbox_key } from "./utils";

mapboxgl.accessToken = mapbox_key;

const defaultCoordinates = {
  long: 121.001433,
  lat: 14.507936
};

const Mapbox = props => {
  useEffect(() => {
    let currentLocation = localStorage.currentLocation
      ? JSON.parse(localStorage.currentLocation)
      : defaultCoordinates;

    const map = new mapboxgl.Map({
      container: document.getElementById("map"),
      style: "mapbox://styles/bryce06/ckaupxv3j2chg1ip6lnzupz8b",
      // style: 'mapbox://styles/bryce06/ck5w2nl700lyp1ip79hnktdrr',
      center: [currentLocation.long, currentLocation.lat],
      zoom: 13
    });

    let originLocation = localStorage.originLocation
      ? JSON.parse(localStorage.originLocation)
      : defaultCoordinates;

    map.on("load", () => {
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      // load covid heat map
      map.addSource("covid-data", {
        type: "geojson",
        data: props.covidMap
      });

      map.addLayer(
        {
          id: "covid-cases",
          type: "heatmap",
          source: "covid-data",
          maxzoom: 20,
          layout: {
            visibility: "none"
          },
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)"
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              9,
              0.2
            ]
          }
        },
        "waterway-label"
      );
    });

    const toggleCovidLayer = () => {
      console.log(props.covidMap);
      let visibility = map.getLayoutProperty("covid-cases", "visibility");
      if (visibility === "none") {
        map.setLayoutProperty("covid-cases", "visibility", "visible");
      } else {
        map.setLayoutProperty("covid-cases", "visibility", "none");
      }
    };

    map.on("click", e => {
      let ncoords = { lat: e.lngLat.wrap().lat, long: e.lngLat.wrap().lng };
      localStorage.dtype = "coordinates";
      localStorage.currentLocation = JSON.stringify(ncoords);
    });

    function mapTo() {
      let currentLocation = JSON.parse(localStorage.currentLocation);
      let originLocation = JSON.parse(localStorage.originLocation);
      let currentIncident = JSON.parse(localStorage.currentIncident);

      let incidentLayerData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [currentLocation.long, currentLocation.lat]
            },
            properties: {
              title: `Incident report location`,
              icon: "alert-dot"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [originLocation.long, originLocation.lat]
            },
            properties: {
              title: "Your location",
              icon: "green-dot"
            }
          }
        ]
      };

      if (map.getSource("points")) {
        map.getSource("points").setData(incidentLayerData);
      }

      var size = 200;

      var alertDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function() {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          map.triggerRepaint();
          return true;
        }
      };

      var greenDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function() {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "#5CD5A7";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          map.triggerRepaint();
          return true;
        }
      };

      map.addImage("green-dot", greenDot, { pixelRatio: 3.5 });
      map.addImage("alert-dot", alertDot, { pixelRatio: 2 });

      // try to add map layer
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": ["get", "icon"],
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        },
        paint: {
          "text-color": "#ffffff"
        }
      });

      map.flyTo({
        center: [currentLocation.long, currentLocation.lat],
        zoom: map.getZoom() - 1,
        speed: 1.25,
        essential: true
      });
    }

    document.getElementById("mapJump").onclick = () => {
      mapTo();
    };

    document.getElementById("showCovid").onclick = () => {
      toggleCovidLayer();
    };
  });

  return (
    <>
      <button id="mapJump" className="d-none" />
      <button id="removeRoutes" className="d-none" />
      <button id="showCovid" className="d-none" />

      <div>
        <div id="map" className="absolute top right left" />
      </div>
    </>
  );
};

export default Mapbox;
