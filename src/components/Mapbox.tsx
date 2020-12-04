import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { mapbox_key, getCurrentLocation, fetchIncidentGeoJSON } from "./utils";

mapboxgl.accessToken = mapbox_key;

const Mapbox = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: document.getElementById("map"),
      style: "mapbox://styles/bryce06/ckaupxv3j2chg1ip6lnzupz8b",
      center: [getCurrentLocation().long, getCurrentLocation().lat],
      zoom: 9.5,
    });

    const updateIncidentLayer = () => {
      let newlayerData = fetchIncidentGeoJSON();

      if (map.getSource("points")) {
        map.getSource("points").setData(newlayerData);
      }

      // remove inactive markers

      const global: any = window;
      let markers = document.querySelectorAll(`.map-icon`);
      let pendingIncidents = global.incidents
        .filter((x) => x.status === "PENDING")
        .map((x) => x.id);

      markers.forEach((mark) => {
        let markid = mark.id;

        if (!pendingIncidents.includes(markid)) {
          document.querySelector(`.inm-${markid}`).remove();
        }
      });

      newlayerData.features.forEach(function (marker) {
        // create a DOM element for the marker

        if (
          !document.contains(
            document.querySelector(`.inm-${marker.properties.uid}`)
          )
        ) {
          var el = document.createElement("div");
          el.className = `pulse-alert map-icon ${
            marker.properties.type !== "emergency" ? "fishing-bg" : ""
          }
        %
        inm-${marker.properties.uid}
        `;

          // set marker id
          el.id = marker.properties.uid;

          el.innerHTML = `<i class="la ${
            marker.properties.type === "emergency" ? "la-bolt" : "la-fish"
          } text-white"></i>`;

          el.addEventListener("click", function () {
            let xid = marker.properties.uid;

            // open sidebar (for mobile view)

            let sidebar = document.getElementById(
              "event-thread"
            ) as HTMLElement;
            sidebar.style.display = "block";

            let cardInstance = document.getElementById(`ec-${xid}`);

            if (document.contains(cardInstance)) {
              cardInstance.click();
            } else {
              document.getElementById("r-cancel").click();
              setTimeout(() => {
                let cardInstance = document.getElementById(`ec-${xid}`);
                cardInstance.click();
              }, 200);
            }
          });

          // add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        }
      });
    };

    // prepare reports layer
    const InitReportLayer = () => {
      let incidentLayerData = {
        type: "FeatureCollection",
        features: [],
      };

      if (map.getSource("points")) {
        map.getSource("points").setData(incidentLayerData);
      }

      var size = 150;

      var alertDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        render: function () {
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
          context.fillStyle = "rgba(255, 200, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          map.triggerRepaint();
          return true;
        },
      };

      var greenDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        render: function () {
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
        },
      };

      map.addImage("emergency-dot", greenDot, { pixelRatio: 2 });
      map.addImage("alert-dot", alertDot, { pixelRatio: 2 });

      // at layer
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": ["get", "icon"],
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
    };

    map.on("load", () => {
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      InitReportLayer();
      addTrack();
    });

    function addTrack() {
      map.addSource("route", {
        type: "geojson",
        lineMetrics: true,
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              // [120.70893, 14.56745],
              // [120.72108, 14.58747],
              // [120.7273, 14.59647],
            ],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#6ff",
          "line-width": 4,
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],
            0,
            "blue",
            0.1,
            "royalblue",
            0.3,
            "cyan",
            0.5,
            "cyan",
            1,
            "blue",
          ],
        },
      });
    }

    function updateEventLinePath() {
      const global: any = window;

      if (map.getSource("route")) {
        map.getSource("route").setData(global.eventPath);
      }
    }

    function mapTo() {
      let currentLocation = JSON.parse(localStorage.currentLocation);

      map.flyTo({
        center: [currentLocation.long, currentLocation.lat],
        zoom: map.getZoom(),
        speed: 1.25,
        essential: true,
      });

      updateEventLinePath();
    }

    document.getElementById("mapJump").onclick = () => {
      mapTo();
    };

    document.getElementById("incidents-btn").onclick = () => {
      updateIncidentLayer();
    };

    document.getElementById("incident-track").onclick = () => {
      updateEventLinePath();
    };
  });

  return (
    <>
      <button id="mapJump" className="d-none" />
      <button id="removeRoutes" className="d-none" />

      <button id="incidents-btn" className="d-none" />
      <button id="incident-track" className="d-none" />

      <div>
        <div id="map" className="absolute top right left" />
      </div>
    </>
  );
};

export default Mapbox;
