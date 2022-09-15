import React,{useState,useEffect} from 'react'
import './Styles/checkbox.css'

const RadioBox = ({prices,handleFilters}) => {
    
  const [checked, setchecked] = useState([])

  const handleToggle =(e)=>{

    return (e)=>{
      
      let newCheckedBox = []
      
      const priceArray = e.target.value.split(","); // in the form of string

      newCheckedBox = [ Number(priceArray[0]) , Number(priceArray[1]) ] // converting array of price in Number 

      console.log(newCheckedBox);

      // now sending price range to parent component
      handleFilters(newCheckedBox,'price')

    }

  }


  return (
    
    <>
    
      {
        prices.map((p,i)=>{
            
            return <li className="list-unstyled" key={i}>
    
                <input type="radio" id={i+'i'} className='form-check-input me-2' name="search" onChange={handleToggle()} value={p.array}/>
    
                <label htmlFor={i+'i'} className="form-check-label">{p.name}</label>
            </li>
          }
        )
      }
    
    </>
    
  )

}

export default RadioBox

// NOTE: here even the value we are setting for input field is array of price range but still it will show in the form of string when accessing them , so handle the case 