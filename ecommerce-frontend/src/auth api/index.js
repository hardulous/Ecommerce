import {API} from '../confiq.js'

//SignUp method
export const signUp = async (name,email,password)=>{

    return fetch(`${API}/signup`,{

      method:"POST",

      headers:{
        "Content-Type":'application/json'
      },

      body: JSON.stringify({name,email,password})

    })

    .then( response => {

      return response.json()     // basically this response is something which is returned by res.json() in express

    })

    .catch( err=>console.log(err) )  // this trigger only if there is an error while fetching from backend but not if res.json() executed
}

// SignIn method
export const signIn = async (email,password)=>{

  return fetch(`${API}/signin`,{

    method:"POST",

    headers:{
      "Content-Type":'application/json'
    },

    body: JSON.stringify({email,password})

  })

  .then( response => {

    return response.json()     

  })

  .catch( err=>console.log(err) ) 
}

// authenticate logged in user
export const authenticate = (data,next)=>{
  
  // here local storage is property of window so first check wheter we have window object or not 
  if(typeof window !== 'undefined'){  

    localStorage.setItem('jwt',JSON.stringify(data));

    next(); // doing work like clear state , redirect user 

  }

}

export const signOut = (next)=>{

  if(typeof window !== undefined){

    localStorage.removeItem('jwt');
    
    fetch(`${API}/signout`,{

      method:'GET',

    })
    .then(response=>console.log('signout',response))
    .catch(error=>console.log('error',error));
     
    next();

  }

}

export const isAutenticated = ()=>{

  if(typeof window !== undefined){

     if(localStorage.getItem('jwt')){
      return JSON.parse(localStorage.getItem('jwt'));
     }
     else{
      return false
     }

  }

}
