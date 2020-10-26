import React, { useEffect, useState } from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import { loadChart, API_URL } from "./utils";
import axios from "axios";
import moment from "moment";
import nprogress from "nprogress";
import TableSkeleton from "./TableSkeleton";

const Devices = (props: any) => {
  const [devices, setDevices] = useState(null);

  const fetchDevices = () => {
    setDevices(null);
    nprogress.set(0.4);
    axios.get(`${API_URL}/devices`).then((res) => {
      setDevices(res.data);
      nprogress.done();
    });
  };

  const searchDevices = () => {
    setDevices(null);
    let query = document.getElementById("search-devices") as HTMLInputElement;
    if (query.value.trim() !== "") {
      nprogress.set(0.4);
      axios
        .get(`${API_URL}/devices/search/?query=${query.value}`)
        .then((res) => {
          setDevices(res.data);
          nprogress.done();
        });
    } else {
      fetchDevices();
    }
  };

  useEffect(() => {
    loadChart();

    fetchDevices();
  }, []);

  return (
    <>
      <Sidebar active="Devices" />
      <div className="dashboard-content">
        <div className="content-header">
          <div className="content-nav">
            <h1>
              <i className="la la-list text-active" /> Devices
            </h1>

            <div className="d-flex">
              <input
                id="search-devices"
                placeholder="Search Devices"
                className="search-input"
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    searchDevices();
                  }
                }}
              />
              <div className="search-icon" onClick={searchDevices}>
                <i className="la la-search" />
              </div>
            </div>
          </div>
        </div>

        <div className="row table-content">
          <div className="col-md-11">
            <div className="card bg-default shadow">
              <div className="card-header bg-transparent border-0">
                <h3 className="text-white mb-0">
                  {" "}
                  <i className="la la-project-diagram text-active" /> Nodes
                </h3>
                <small className="text-muted">
                  List of Node Devices in the Network.
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
                      <th scope="col" className="sort" data-sort="status">
                        First Interaction
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Last Interaction
                      </th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {devices &&
                      devices
                        .filter((x) => x.type === "node")
                        .map((device: any, index: number) => {
                          return (
                            <tr key={index} className="fade-in">
                              <th>
                                <strong>{index + 1}</strong>
                              </th>
                              <th>
                                <strong>{device.device_id}</strong>
                              </th>
                              <td>{device.first_interaction}</td>
                              <td>
                                {device.last_interaction} (
                                {moment(device.last_interaction).fromNow()})
                              </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  {Math.abs(
                                    moment().diff(
                                      moment(device.last_interaction),
                                      "days"
                                    )
                                  ) < 7 ? (
                                    <>
                                      <i className="bg-success" />
                                      <span className="status">Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <i className="bg-danger" />
                                      <span className="status">Inactive</span>
                                    </>
                                  )}
                                </span>
                              </td>
                            </tr>
                          );
                        })}

                    {!devices && <TableSkeleton row={5} col={5} />}
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
                  <i className="la la-broadcast-tower text-active" /> Gateways
                </h3>
                <small className="text-muted">
                  List of Gateway Devices in the Network.
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
                      <th scope="col" className="sort" data-sort="status">
                        First Interaction
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Last Interaction
                      </th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {devices &&
                      devices
                        .filter((x) => x.type === "gateway")
                        .map((device: any, index: number) => {
                          return (
                            <tr key={index} className="fade-in">
                              <th>
                                <strong>{index + 1}</strong>
                              </th>
                              <th>
                                <strong>{device.device_id}</strong>
                              </th>
                              <td>{device.first_interaction}</td>
                              <td>
                                {device.last_interaction} (
                                {moment(device.last_interaction).fromNow()})
                              </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  {Math.abs(
                                    moment().diff(
                                      moment(device.last_interaction),
                                      "days"
                                    )
                                  ) < 7 ? (
                                    <>
                                      <i className="bg-success" />
                                      <span className="status">Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <i className="bg-danger" />
                                      <span className="status">Inactive</span>
                                    </>
                                  )}
                                </span>
                              </td>
                            </tr>
                          );
                        })}

                    {!devices && <TableSkeleton row={5} col={5} />}
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

export default Devices;
