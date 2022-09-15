import {API} from '../confiq.js'

// Create Category
export const createCategory = async (userId,token,category)=>{

    return fetch(`${API}/category/create/${userId}`,{

      method:"POST",

      headers:{
        "Content-Type":'application/json',
        "Authorization":`bearer ${token}`    // for express-jwt authentication 
      },

      body: JSON.stringify({name:category})

    })
    .then( response => {

      return response.json()     
    })
    .catch( err=>console.log(err) ) 
}

// Create Product
export const createProduct = async (userId,token,product)=>{

    return fetch(`${API}/products/create/${userId}`,{

      method:"POST",

      headers:{      // now we are not sending json data but sending form data so no application/json
        Accept:"application/json", // by Accept we are telling server about type of data accepted by client
        "Authorization":`bearer ${token}`    // for express-jwt authentication 
      },

      body: product  // no need to do stringify because it is form data

    })
    .then( response => {

      return response.json()     
    })
    .catch( err=>console.log(err) ) 
}

export const getCategory=async()=>{

  return  fetch(`${API}/categories`,{
    method:"GET",
  })
  .then(response=>{
    return response.json()
  })
  .catch(err=>console.log(err))

}