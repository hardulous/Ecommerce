import {API} from '../confiq.js'

// get all product
export const getProducts= async(sortBy)=>{

    return  fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
      method:"GET",
      headers:{
        Accept:'aaplication/json',
        "Content-Type":"application/json"
      }
    })
    .then(response=>{
      return response.json()
    })
    .catch(err=>console.log(err))
  
}

// get all the categories
export const getCategory=async()=>{

    return  fetch(`${API}/categories`,{
      method:"GET",
    })
    .then(response=>{
      return response.json()
    })
    .catch(err=>console.log(err))
  
}
