import React from "react";
import Layout from "../Core/Layout";
import { isAutenticated } from "../../auth api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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

        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <div className="card">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link className="nav-link" style={{ color: "blue" }} to="/create/category">
                  Create Category
                </Link>
              </li>

              <li className="list-group-item">
                <Link
                  className="nav-link"
                  style={{ color: "blue" }}
                  to="/create/product"
                >
                  Create Product
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <div className="card mb-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
              <li className="list-group-item">Name : {name}</li>
              <li className="list-group-item">Email : {email}</li>
              <li className="list-group-item">
                {role === 1 ? "Admin" : "RegisteredUser"}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDashboard;
