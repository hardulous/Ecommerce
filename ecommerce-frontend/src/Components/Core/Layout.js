import React from 'react'
import  './Styles/Layout.css'

const Layout = ({title="Title",description="Description",children,className}) => {

  return (

    <div>
        <div className='jumbotron mb-4'>
            <h2>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={`${className}`}>{children}</div>
    </div>

  )

}

export default Layout