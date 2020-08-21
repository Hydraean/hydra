import React, { useEffect, useState } from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import { loadChart, API_URL } from "./utils";
import axios from "axios";
import moment from "moment";

const Devices = (props: any) => {
  const [devices, setDevices] = useState(null);

  const fetchData = () => {
    axios.get(`${API_URL}/devices`).then((res) => {
      setDevices(res.data);
    });
  };

  useEffect(() => {
    loadChart();

    fetchData();
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

            <input placeholder="Search Devices" className="search-input" />
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
                            <tr key={index}>
                              <th>
                                <strong>{index + 1}</strong>
                              </th>
                              <th>
                                <strong>{device.device_id}</strong>
                              </th>
                              <td>{device.first_interaction}</td>
                              <td>
                                {device.last_interaction} (
                                {moment(
                                  `${device.last_interaction.split(" - ")[0]},${
                                    device.last_interaction.split(" - ")[1]
                                  }`
                                ).fromNow()}
                                )
                              </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  {Math.abs(
                                    moment("Aug 1, 2020").diff(
                                      moment(
                                        `${
                                          device.last_interaction.split(
                                            " - "
                                          )[0]
                                        },${
                                          device.last_interaction.split(
                                            " - "
                                          )[1]
                                        }`
                                      ),
                                      "days"
                                    )
                                  ) > 7 ? (
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
                  <i className="la la-broadcast-tower text-active" /> GateWays
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
                      <th scope="col" className="sort" data-sort="budget">
                        Recorded Location
                      </th>
                      <th scope="col" className="sort" data-sort="status">
                        Deployment Date
                      </th>
                      <th scope="col" className="sort" data-sort="budget">
                        Last Interaction
                      </th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    <tr>
                      <th>
                        <strong>1</strong>
                      </th>
                      <th>
                        <strong>HG-0001</strong>
                      </th>
                      <td>
                        <strong>Pasay City</strong>
                      </td>
                      <td>June 28, 2020</td>
                      <td>June 28, 2020 (20 days ago)</td>
                      <td>
                        <span className="badge badge-dot mr-4">
                          <i className="bg-success" />
                          <span className="status">Active</span>
                        </span>
                      </td>
                    </tr>
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
