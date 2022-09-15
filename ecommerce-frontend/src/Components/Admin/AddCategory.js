import React, { useState } from "react";
import Layout from "../Core/Layout";
import { isAutenticated } from "../../auth api";
import { Link } from "react-router-dom";
import {createCategory} from '../../admin api/apiAdmin.js'

const AddCategory = () => {
  const [Category, setCategory] = useState("");
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);

  const { user, token } = isAutenticated();

  const handleClick = (e) => {
    setError(false);
    setSuccess(false);
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(user._id,token,Category.toLowerCase())
    .then(data=>{

        if(data.error){
            setError(data.error);
            setSuccess(false);
        }
        else{
            setError(false);
            setSuccess(true);
        }

    })

  };

  // Alert for success 
  const showSuccess = ()=>{

     if(Success){
        return <h3 className="text-success">Category {Category} is created</h3>
     }
  }

  const showError = ()=>{

    if(Error){
       return <h3 className="text-danger">{Error}</h3>
    }
  }

  const goBack = ()=>{
     
    return <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>     
    </div>
  }

  return (
    <Layout
      className="container-fluid"
      title="Create a new Category"
      description={`Hello ${user.name}`}
    > 
      
      <div className="form-group" style={{textAlign:'center'}}>
         {showSuccess()}
         {showError()}  
      </div>
      
      <div className="row">
        <div className="col-md-8 offset-md-2">

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="text-muted mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleClick}
                value={Category}
                autoFocus
                placeholder="Name of Category"
                required={true}
              />
            </div>
            <button className="btn btn-outline-primary mt-2">Create Category</button>
            {goBack()}
          </form>

        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
