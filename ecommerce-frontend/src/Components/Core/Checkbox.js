import React,{useState,useEffect} from 'react'


const Checkbox = ({categories,handleFilters}) => {
  
  // State that hold who many check box are selected for filtering and will send to parent component  
  const [checked, setchecked] = useState([]);
  
  // high order method calling it will return inside arrow method 
  const handleToggle = (e)=>{

    return (e)=>{
      
      const currentCategoryId = checked.indexOf(e.target.value);
      const newCheckedCategoryIds = [...checked] 

      // if current checked id is not present in checked state then push it otherwise remove it if present
      if(currentCategoryId === -1){
        newCheckedCategoryIds.push(e.target.value)
      }
      else{

        // this splice method also overwrite the original array , here remove only 1 element from its index in array 
        newCheckedCategoryIds.splice(currentCategoryId,1)
      }
      
      setchecked(newCheckedCategoryIds);  // updating the state

      // now passing it to parent as well 
      handleFilters(newCheckedCategoryIds,'category');
       
    }

  }

  console.log(checked)

  return (

    categories.map((c,i)=>{

        return <li className="list-unstyled" key={i}>

            <input type="Checkbox" id={i} className='form-check-input me-2' name="search" onChange={handleToggle()} value={c._id}/>

            <label htmlFor={i} className="form-check-label">{c.name}</label>
        </li>

    })

  )

}

export default Checkbox