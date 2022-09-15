import React from 'react'
import { API } from '../../confiq'

const ShowImage = ({product,url}) => {


  return (

    <div className="product-img">
        <img src={`${API}/${url}/photo/${product._id}`} alt={product.name} className="mb-3" style={{

          height:'100%',
          width:'100%'

        }} />
    </div>

  )
}

export default ShowImage


// Here this image tag src contain ${API}/${url}/photo${product._id} it means making request to https://localhost:8000/api/product/photo/:productId and by putting it inside src it will grab the image buffer data 