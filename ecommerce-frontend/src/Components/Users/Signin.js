import React, { useEffect, useState } from 'react'
import Layout from '../Core/Layout'
import {Navigate, useNavigate} from 'react-router-dom'
import './Styles/Signin.css'
import { signIn , authenticate , isAutenticated } from '../../auth api'


const Signin = () => {

  const navigate = useNavigate();
  
  const [credentials, setcredentials] = useState({
    email:"",
    password:"",
    error:"",
    loading:false,
    redirect:false
  })
  
  const handleChange=(e)=>{

     setcredentials({
      ...credentials,[e.target.name]:e.target.value, error:"",
      loading:false,redirect:false
     })

  }

  const handleSubmit = (e)=>{
     
    e.preventDefault();
    setcredentials({...credentials,error:false,loading:true,redirect:false})

    signIn(credentials.email,credentials.password)
    .then( data =>{
        
        console.log(data);

        // now saving track of logged in user

        
        if(data.error){
          setcredentials({
          email:"",
          password:"",
          error:data.error,
          loading:false,
          redirect:false})
        }
        else{

          authenticate( data , ()=>{

            setcredentials({
              ...credentials, 
                email:"",
                password:"",
                error:"",
                loading:false,
                redirect:true
            })

            const {user} = isAutenticated() // so that when signed in based on user role we can re-direct him to either admin or user dashboard
            console.log(user);
  
            setTimeout(()=>{

              user && user.role ===1 ? navigate('/admin/dashboard') :
              navigate('/user/dashboard');
              
            },600)

          } )
          
        }

    } )


  }
    
  useEffect(()=>{

    const Alert = document.getElementsByClassName('alert-custom')
    
    Array.from(Alert).forEach((alert)=>{
      
       alert.addEventListener('click',()=>{
        
          alert.style.cssText+="display:none;"

       })

    })
    
    // Here if user is already logged in so re-direct him to home page
    if(isAutenticated()){
      
      return navigate('/');
  
    }

  },[])
  
  const showError = ()=>{

    return <div className='alert alert-danger alert-custom' style={{

      display:credentials.error ? '' : 'none'

    }}>
      
      {credentials.error}

      <span className='cut'>X</span>

    </div>

  }

  const showLoading = ()=>{

    return credentials.loading && (

      <div className="spinner-border spinner-custom text-info mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

    )
  }

  return (
  
    <Layout className="container container-custom col-md-8 offset-md-2" title='Signin Page' description='Signin to React E-commerce App'>
      
      {showError()}
      {showLoading()}

      <form onSubmit={handleSubmit} className="form-custom">

        <div className='icon-container'>

          <div className='icon-custom'>

              <h4>Signin</h4>
            
          </div>          

        </div>
        
        <div className="form-group mb-2">
          <label htmlFor="email" className='text-muted label pb-2 pt-2'>Email</label>
          <input type="email" className='form-control label' id="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        
        <div className="form-group mb-2">
          <label htmlFor="password" className='text-muted label pb-2 pt-2'>Password</label>
          <input type="password" className='form-control label' id="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>

        <div className="form-group mb-2">
          <button className='btn btn-outline-info mt-2 w-100 label'>Signin</button>
        </div>

      </form>  
        
    </Layout>

  )
  
}

export default Signin