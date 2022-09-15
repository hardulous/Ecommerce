import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from '../Core/Home'
import Menu from '../Core/Menu'
import Signin from './Signin'
import Signup from './Signup'
import ProtectedRoute from '../../auth api/PrivateRoute.js'
import UserDashboard from "./UserDashboard.js";
import AdminDashboard from './AdminDashboard'
import AdminRoute from '../../auth api/AdminRoute'
import AddCategory from '../Admin/AddCategory.js'
import AddProduct from '../Admin/AddProduct'
import Shop from '../Core/Shop'

const UserRoutes = () => {

  return (

    <Router>

       <Menu/>

       <Routes>
            
            <Route index path="/" exact element={<Home/>}/>
            <Route path="/signin" exact element={<Signin/>}/>
            <Route path="/signup" exact element={<Signup/>}/>

            {/* Protected route */}
            <Route path="/user/dashboard" exact element={

                 <ProtectedRoute>
                  <UserDashboard/>
                 </ProtectedRoute>

            }/>
            <Route path="/admin/dashboard" exact element={

                 <AdminRoute>
                  <AdminDashboard/>
                 </AdminRoute>

            }/>

             <Route path="/create/category" exact element={

                 <AdminRoute>
                  <AddCategory/>
                 </AdminRoute>

             }/>

              <Route path="/create/product" exact element={

                 <AdminRoute>
                  <AddProduct/>
                 </AdminRoute>

             }/>

             <Route path='/shop' exact element={<Shop/>}/>

       </Routes>

    </Router>

  )

}

export default UserRoutes