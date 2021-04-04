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
import FMASelector from "./FmaSelector";
import AreaChartSkeleton from "./AreaChartSkeleton";
import DateFilters from "./DateFilters";
import moment from "moment";

const Analytics = () => {
  const [events, setEvents] = useState(null);
  const [currentEvent, setcurrentEvent] = useState(null);
  const [query, setQuery] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const [shapeChartData, setShapeChartData] = useState([]);
  const [fma, setFMA] = useState({
    fma: "All Records",
    description: "Displaying data from all FMAs",
  });
  const [filterDates, setFilterDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [dateSelector, showDateSelector] = useState(false);

  const fetchIncidents = () => {
    setEvents(null);
    nprogress.set(0.4);
    axios.get(`${API_URL}/incidents`).then((res) => {
      setEvents(res.data);
      nprogress.done();
    });

    nprogress.set(0.4);
    axios.get(`${API_URL}/analytics`).then((res) => {
      setAnalytics(res.data);
      nprogress.done();
    });

    nprogress.set(0.4);
    axios.get(`${API_URL}/analytics/incidents/all`).then((res) => {
      setShapeChartData(res.data);
      nprogress.done();
    });
    // reset date filter
    setFilterDates({
      startDate: null,
      endDate: null,
    });
  };

  const filterByDate = (start: any, end: any) => {
    let noDataEntry = [{ date: Date.now(), activityCount: 0 }];

    nprogress.set(0.4);
    axios
      .get(
        `${API_URL}/analytics/incidents/date-search/?fma=${fma.fma}&startDate=${start}&endDate=${end}`
      )
      .then((res) => {
        setShapeChartData([]);

        setTimeout(() => {
          if (res.data.results.length > 0) {
            let results = [...res.data.results, ...noDataEntry];
            setShapeChartData(results);
          } else {
            setShapeChartData([...noDataEntry, ...noDataEntry]);
          }
          nprogress.done();
        }, 200);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const formatDate = (date: any) => {
    return moment(date).format("MMM D, YYYY");
  };

  const setAllRecords = () => {
    setShapeChartData([]);
    setTimeout(() => {
      fetchIncidents();
    }, 200);
    setFMA({
      fma: "All Records",
      description: "Displaying data from all FMAs",
    });
    setFilterDates({
      startDate: null,
      endDate: null,
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

          <div className="analytics-chart">
            {shapeChartData.length > 0 ? (
              <ShapeChart width={800} height={200} chartData={shapeChartData} />
            ) : (
              <AreaChartSkeleton />
            )}

            <div className="area-card fade-in">
              <div className="card-content">
                <small className="text-muted">
                  <i className="la la-line-chart text-danger" /> Activiy
                  Overview
                </small>
                <h1 className="mt-2">{fma.fma}</h1>
                <small>{fma.description}</small>
                <br />
                <small className="text-muted mr-2">
                  Historical Data on:
                  <span className="text-active">
                    {filterDates.startDate && filterDates.endDate
                      ? ` ${formatDate(filterDates.startDate)} - ${formatDate(
                          filterDates.endDate
                        )}`
                      : " All Dates"}
                  </span>
                </small>
              </div>

              <div className="fma-card-actions">
                <button onClick={setAllRecords}>
                  <i className="la la-calendar mr-2" />
                  All Records
                </button>
                <button
                  onClick={() => {
                    setShowSelector(true);
                  }}
                >
                  <i className="la la-crosshairs mr-2" /> Select FMA
                </button>
                <button
                  onClick={() => {
                    showDateSelector(true);
                  }}
                >
                  <i className="la la-calendar mr-2" />
                  Select Date
                </button>
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

      {showSelector && (
        <FMASelector
          data={analytics}
          onClose={() => {
            setShowSelector(false);
          }}
          setFMA={setFMA}
          setShapeChartData={setShapeChartData}
          currentFMA={fma}
          setFilterDates={setFilterDates}
        />
      )}

      {dateSelector && (
        <DateFilters
          onClose={() => {
            showDateSelector(false);
          }}
          setFilterDates={setFilterDates}
          filterDates={filterDates}
          applyFilters={filterByDate}
        />
      )}
    </>
  );
};

export default Analytics;
