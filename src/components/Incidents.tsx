import React, { useEffect, useState } from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import { loadChart, API_URL, ellipsis } from "./utils";
import axios from "axios";
import nprogress from "nprogress";
import IncidentDetails from "./IncidentDetails";

const Incidents = (props: any) => {
  const [events, setEvents] = useState(null);
  const [currentEvent, setcurrentEvent] = useState(null);

  const fetchIncidents = () => {
    nprogress.set(0.4);
    axios.get(`${API_URL}/incidents`).then((res) => {
      setEvents(res.data);
      nprogress.done();
    });
  };

  const searchEvents = () => {
    let query = document.getElementById("search-events") as HTMLInputElement;
    if (query.value.trim() !== "") {
      nprogress.set(0.4);
      axios
        .get(`${API_URL}/incidents/search/?query=${query.value}`)
        .then((res) => {
          setEvents(res.data);
          nprogress.done();
        });
    } else {
      fetchIncidents();
    }
  };

  useEffect(() => {
    loadChart();
    fetchIncidents();
  }, []);

  const viewEvent = (event) => {
    setcurrentEvent(null);
    setTimeout(() => {
      setcurrentEvent(event);
    }, 200);
  };

  return (
    <>
      {currentEvent && (
        <IncidentDetails data={currentEvent} setData={setcurrentEvent} />
      )}
      <Sidebar active="Emergencies" />
      <div className="dashboard-content">
        <div className="content-header">
          <div className="content-nav">
            <h1>
              <i className="la la-exclamation-circle text-danger" /> Incidents
            </h1>

            <input
              placeholder="Search Incidents"
              className="search-input"
              id="search-events"
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  searchEvents();
                }
              }}
            />
          </div>
        </div>

        <div className="row table-content">
          <div className="stats-row col-md-11">
            <div className="stats-card fade-in-bottom dl-1">
              <i className="la la-fish la-5x text-warning" />
              <h1>
                <small>ILLEGAL FISHING</small>
                <br />
                <span>
                  {events &&
                    events.filter((x) => x.type === "illegal_fishing").length}
                </span>
              </h1>
            </div>

            <div className="stats-card fade-in-bottom dl-2">
              <i className="la la-bolt text-danger la-5x" />
              <h1>
                <small>EMERGENCY</small>
                <br />
                <span>
                  {" "}
                  {events &&
                    events.filter((x) => x.type === "emergency").length}
                </span>
              </h1>
            </div>

            <div className="stats-card fade-in-bottom dl-3">
              <i className="la la-check-circle text-success la-5x" />
              <h1>
                <small>CONFIRMED</small>
                <br />
                <span>
                  {events &&
                    events.filter((x) => x.status === "CONFIRMED").length}
                </span>
              </h1>
            </div>

            <div className="stats-card fade-in-bottom dl-4">
              <i className="la la-exclamation-circle text-yellow la-5x" />
              <h1>
                <small>PENDING</small>
                <br />
                <span>
                  {events &&
                    events.filter((x) => x.status === "PENDING").length}
                </span>
              </h1>
            </div>
          </div>
          <div className="col-md-11">
            <div className="card bg-default shadow">
              <div className="card-header bg-transparent border-0">
                <h3 className="text-white mb-0">
                  {" "}
                  <i className="la la-fish text-warning" /> Illegal Fishing
                </h3>
                <small className="text-muted">
                  List of recorded illegal fishing activity from the network.
                </small>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-dark table-flush">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="sort" data-sort="name">
                        No.
                      </th>
                      <th scope="col" className="sort" data-sort="name">
                        Device ID
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Location
                      </th>
                      <th scope="col" className="sort" data-sort="status">
                        title
                      </th>
                      <th scope="col" className="sort" data-sort="status">
                        reportee
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        date
                      </th>
                      <th scope="col">Mode</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {events &&
                      events
                        .filter((x) => x.type === "illegal_fishing")
                        .map((event: any, index: number) => {
                          return (
                            <tr
                              key={index}
                              className={`fade-in record-row ${
                                currentEvent && currentEvent.id === event.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => {
                                viewEvent(event);
                              }}
                            >
                              <th>
                                <strong>{index + 1}</strong>
                              </th>
                              <th>
                                <strong>{ellipsis(event.device_id, 10)}</strong>
                              </th>
                              <td>{event.address}</td>
                              <td>{event.title}</td>
                              <td>{event.reportee}</td>
                              <td>{event.date}</td>
                              <td>
                                <span
                                  className={`text-mode ${event.report_type}`}
                                >
                                  {event.report_type}
                                </span>
                              </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  <i
                                    className={
                                      event.status === "PENDING"
                                        ? "bg-warning"
                                        : "bg-success"
                                    }
                                  />
                                  <span className="status text-capitalize">
                                    {event.status}
                                  </span>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* gateway table */}
          <div className="col-md-11">
            <div className="card bg-default shadow">
              <div className="card-header bg-transparent border-0">
                <h3 className="text-white mb-0">
                  {" "}
                  <i className="la la-bolt text-warning" /> Emergencies
                </h3>
                <small className="text-muted">
                  List of recorded emergency signals or distress calls
                </small>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-dark table-flush">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="sort" data-sort="name">
                        No.
                      </th>
                      <th scope="col" className="sort" data-sort="name">
                        Device ID
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Recorded Location
                      </th>
                      <th scope="col" className="sort" data-sort="status">
                        title
                      </th>
                      <th scope="col" className="sort" data-sort="status">
                        Details
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Reportee
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col">Mode</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {events &&
                      events
                        .filter((x) => x.type === "emergency")
                        .map((event: any, index: number) => {
                          return (
                            <tr
                              key={index}
                              className={`fade-in record-row ${
                                currentEvent && currentEvent.id === event.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => {
                                viewEvent(event);
                              }}
                            >
                              <th>
                                <strong>{index + 1}</strong>
                              </th>
                              <th>
                                <strong>{ellipsis(event.device_id, 10)}</strong>
                              </th>
                              <td>{event.address}</td>
                              <td>{event.title}</td>
                              <td>{event.reportee}</td>
                              <td>{event.date}</td>
                              <td>
                                <span
                                  className={`text-mode ${event.report_type}`}
                                >
                                  {event.report_type}
                                </span>
                              </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  <i
                                    className={
                                      event.status === "PENDING"
                                        ? "bg-warning"
                                        : "bg-success"
                                    }
                                  />
                                  <span className="status text-capitalize">
                                    {event.status}
                                  </span>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Incidents;
