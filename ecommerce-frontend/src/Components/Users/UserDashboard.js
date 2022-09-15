import React from "react";
import Layout from "../Core/Layout";
import { isAutenticated } from "../../auth api";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAutenticated(); // taking information of logged in user

  return (
    <Layout
      className="container-fluid"
      title="Dashboard"
      description={`Hello ${name}`}
    >
      <div className="row">

        <div className="col-3">
          <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link className="nav-link" style={{ color: "blue" }} to="/cart">
                  My Cart
                </Link>
              </li>

              <li className="list-group-item">
                <Link
                  className="nav-link"
                  style={{ color: "blue" }}
                  to="/profile/update"
                >
                  Update Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">Name : {name}</li>
              <li className="list-group-item">Email : {email}</li>
              <li className="list-group-item">
                {role === 1 ? "Admin" : "RegisteredUser"}
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12">
            <div className="card">
              <h3 className="card-header">Purchase History</h3>
              <ul className="list-group">
                <li className="list-group-item">history</li>
              </ul>
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default UserDashboard;
