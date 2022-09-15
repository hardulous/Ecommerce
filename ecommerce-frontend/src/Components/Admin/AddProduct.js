import React, { useState, useEffect } from "react";
import Layout from "../Core/Layout";
import { isAutenticated } from "../../auth api";
import { Link } from "react-router-dom";
import { createProduct , getCategory } from "../../admin api/apiAdmin.js";

const AddProduct = () => {

  const { user, token } = isAutenticated();

  const [product, setproduct] = useState({
    name: "",
    description: "",
    price: "",
    categories: [], // this array get filled by backend get category method
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: false,
    createdProduct: "",
    redirectToProfile: false,
    formData:{},  // this get filled by FormData() API
  });
  
  // Load categories from backend and set form data
  const init =()=>{

    getCategory()
    .then(data=>{

        if(data.error){
            setproduct({...product,error:data.error})
        }
        else{

            // since we are sending form data not json and in order to send form data to backend we have to use API provided by browser by first create an instance formData
            setproduct({...product,categories:data,formData: new FormData()})
        }
    })

  }

  useEffect(()=>{
    
    init();

  },[])

  // now have to handle photo as well which is present in e.target.files[0]
  const handleChange = (e) => {
    
    const value = e.target.name ==='photo'? e.target.files[0] : e.target.value

    product.formData.set(e.target.name,value);  // setting for backend

    setproduct({

      ...product,
      [e.target.name]: value,

    });

  };

  const handleSubmit = (e)=>{

    e.preventDefault();
    console.log(product)
    
    setproduct({...product,error:false,loading:true});

    createProduct(user._id,token,product.formData)
    .then(data=>{

        if(data.error){
            setproduct({...product,error:data.error,loading:false})
        }
        else{
            setproduct({...product,
            
                name:'',description:'',price:'',photo:'',quantity:'',loading:false,error:false,createdProduct:data.name,category:'',shipping:'',
                formData:new FormData()  // as it is going in backend so set it empty as well

            })
        }

    })


  }

  // Alert for success
  const showSuccess = () => {
    
      return <div className="alert alert-info"style={{

        display: product.error?'':'none',
        fontSize:'2rem'

      }}>{`${(product.createdProduct).toUpperCase()} Product is Created`}</div>
    

  };

  const showError = () => {

      return <div className="alert alert-danger"style={{

        display: product.error?'':'none'

      }}>

         <h2>{product.error}</h2>

      </div>
    
  };

  const showLoading = ()=>{

    return product.loading && (

      <div className="spinner-border spinner-custom text-info mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

    )
  }

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
          Back to dashboard
        </Link>
      </div>
    );
  };
  

  return (

    <Layout
      className="container-fluid"
      title="Add a new Product"
      description={`Hello ${user.name} , ready to add a new product`}
    >

      <div className="row">
        <div className="col-md-8 offset-md-2">
           <div className="form-group" style={{ textAlign: "center" }}>
               {showSuccess()}
               {showError()}
               {showLoading()}
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 offset-md-2">

          <form className="mb-3" onSubmit={handleSubmit}>

            <h4>Post Photo</h4>
            <div className="form-group">
              <label htmlFor="photo" className="btn btn-outline-secondary">
                <input
                  type="file"
                  name="photo"   // be careful with this name if here is photo then in backend model it must be photo as well
                  id="photo"
                  accept="image/*"    // now it will accept any file whose type start with image/
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="name" className="text-muted">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleChange}
                value={product.name}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="text-muted">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control"
                onChange={handleChange}
                value={product.description}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="text-muted">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                onChange={handleChange}
                value={product.price}
                min={0}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="text-muted">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control"
                onChange={handleChange}
              >

                {/* Here we going to iterate over categories we get from backend and make option tag for select */}
                <option>Please select</option>
                {
                  product.categories && product.categories.map((category,index)=>{

                    return <option value={category._id} key={index}>{category.name}</option>

                  })
                }
                
                
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity" className="text-muted">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="form-control"
                onChange={handleChange}
                value={product.quantity}
                min={0}
              />
            </div>

            <div className="form-group">
              <label htmlFor="shipping" className="text-muted">
                Shipping
              </label>
              <select
                name="shipping"
                id="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <button className="btn btn-outline-primary mt-3">
              Create Product
            </button>

          </form>

          {goBack()}

        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;

// to know how form data passed to backend watch video of "Create product part 2"
