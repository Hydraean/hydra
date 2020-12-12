import React, { useEffect, useState } from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import { loadChart, API_URL, ellipsis } from "./utils";
import axios from "axios";
import nprogress from "nprogress";
import IncidentDetails from "./IncidentDetails";
import TableSkeleton from "./TableSkeleton";
import StatCards from "./StatCards";
import ShapeChart from "./ShapeChart";

const Analytics = (props: any) => {
  const [events, setEvents] = useState(null);
  const [currentEvent, setcurrentEvent] = useState(null);
  const [query, setQuery] = useState(null);

  const fetchIncidents = () => {
    setEvents(null);
    nprogress.set(0.4);
    axios.get(`${API_URL}/incidents`).then((res) => {
      setEvents(res.data);
      nprogress.done();
    });
  };

  const searchEvents = () => {
    setEvents(null);
    let query = document.getElementById("search-events") as HTMLInputElement;
    if (query.value.trim() !== "") {
      nprogress.set(0.4);
      setQuery(query.value.trim());
      axios
        .get(`${API_URL}/incidents/search/?query=${query.value}`)
        .then((res) => {
          setEvents(res.data);
          nprogress.done();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchIncidents();
    }
  };

  const searchAction = () => {
    let searchBar = document.getElementById(
      "search-events"
    ) as HTMLInputElement;
    if (query) {
      fetchIncidents();
      setQuery("");
      searchBar.value = "";
    } else {
      searchEvents();
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
      <Sidebar active="Analytics" />
      <div className="dashboard-content">
        <div className="content-header">
          <div className="content-nav">
            <h1>
              <i className="la la-line-chart text-danger" /> Analytics
            </h1>

            <div className="d-flex">
              <input
                placeholder="Search Incidents"
                className="search-input"
                id="search-events"
                onKeyUp={(e: any) => {
                  if (e.keyCode === 13) {
                    searchEvents();
                  }
                }}
              />
              <div className="search-icon" onClick={searchAction}>
                <i className={`la ${!query ? "la-search" : "la-close"}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="row table-content">
          <StatCards data={events} />

          <div className="d-flex mb-4" style={{ width: "89%" }}>
            <ShapeChart width={800} height={200} />
            <div className="area-card">

            <div className="card-content">
            <small className="text-muted">
                <i className="la la-line-chart text-danger" /> Activiy Overview
              </small>
              <h1 className="mt-2">All Records</h1>
              <small>Fishery management area 7</small>
              <br />
              <small className="text-muted mr-2">
                Historical Data on: Apr 12 - Oct 2020
              </small>
            </div>

            <div className="fma-card-actions">
            <button><i className="la la-calendar mr-2"/>All Records</button>
              <button><i className="la la-user mr-2"/> Select FMA</button>
              <button><i className="la la-calendar mr-2"/>Select Date</button>
            </div>


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
                              <td>{event.fma}</td>
                              <td>{event.title}</td>
                              <td>{event.reportee}</td>
                              <td>{event.date_reported}</td>
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

                    {!events && <TableSkeleton row={3} col={8} />}
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

                    {!events && <TableSkeleton row={3} col={8} />}
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

export default Analytics;
