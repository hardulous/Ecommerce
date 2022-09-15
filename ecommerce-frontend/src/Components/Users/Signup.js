import React, { useEffect, useState } from 'react'
import Layout from '../Core/Layout'
import {Link} from 'react-router-dom'
import './Styles/Signup.css'
import { signUp } from '../../auth api'

const Signup = () => {
  
  const [credentials, setcredentials] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  })
  
  const handleChange=(e)=>{

     setcredentials({
      ...credentials,[e.target.name]:e.target.value, error:"",
      success:false
     })

  }

  const handleSubmit = (e)=>{
     
    e.preventDefault();

    signUp(credentials.name,credentials.email,credentials.password)
    .then( data =>{
        
        console.log(data);
        
        if(data.error){
          setcredentials({
          name:"",
          email:"",
          password:"",
          error:data.error,
          success:false})
        }
        else{
          setcredentials({
            ...credentials, 
              name:"",
              email:"",
              password:"",
              error:"",
              success: true
          })
        }

    } )


  }
  

  // here this will add event listner to error close button
  useEffect(()=>{

    const Alert = document.getElementsByClassName('alert-custom')
    
    Array.from(Alert).forEach((alert)=>{
      
       alert.addEventListener('click',()=>{
        
          alert.style.cssText+="display:none;"

       })

    })

  },[])
  
  const showError = ()=>{

    return <div className='alert alert-danger alert-custom' style={{

      display:credentials.error ? '' : 'none'

    }}>
      
      {credentials.error}

      <span className='cut'>X</span>

    </div>

  }

  const showSuccess = ()=>{

    return <div className='alert alert-info alert-custom' style={{

      display:credentials.success ? '' : 'none'

    }}>
      
      New Account is created. Please
      <Link style={{

        textDecoration:'none',
        animationName:'signIn',
        display: 'inline-block',
        animationDuration:'2s',
        animationIterationCount:'infinite',
        animationDirection:'alternate'
        
      }} to="/signin">Signin</Link>

      <span className='cut'>X</span>

    </div>

  }

  
  return (
  
    <Layout className="container container-custom col-md-8 offset-md-2" title='Signup Page' description='Signup to React E-commerce App'>
      
      {/* Here either show error or success alert */}
      {showError()}
      {showSuccess()}

      <form onSubmit={handleSubmit} className="form-custom">

        <div className='icon-container'>

          <div className='icon-custom'>

              <h4>Signup</h4>
              {

                !credentials.success ? 
                <i className="fa-solid fa-lock"></i> :
                <i className="fa-solid fa-lock-open"></i>
            
              }
            
          </div>          

        </div>

        <div className="form-group mb-2">
          <label htmlFor="name" className='text-muted label pb-2 pt-2'>Name</label>
          <input type="text" className='form-control label ' id="name" name="name" value={credentials.name} onChange={handleChange} />
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
          <button className='btn btn-outline-info mt-2 w-100 label'>Signup</button>
        </div>

      </form>   
        
    </Layout>

  )
  
}

export default Signup