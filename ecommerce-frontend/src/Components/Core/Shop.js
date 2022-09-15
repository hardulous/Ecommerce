import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategory } from "../../product api/apiProduct";
import Checkbox from "./Checkbox";
import { prices } from "./FixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {
  const [categories, setcategories] = useState([]);
  const [error, seterror] = useState(false);

  // this state data  will be used for backend API call
  const [myFilters, setmyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });

  // load categories from backend
  const init = () => {
    getCategory().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setcategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  // this method triggered by child checkbox component
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };

    newFilters.filters[filterBy] = filters; // can change both price and categories property
    setmyFilters(newFilters);
  };

  console.log(myFilters);

  return (

    <Layout
      title="Shop Page"
      description="Search and find books for your choice"
      className="container-fluid"
    >

      <div className="row">

        <div className="col-4">

          <div className="checkbox-custom">
            <h4>Filter by Categories</h4>

            <ul>
              <Checkbox categories={categories} handleFilters={handleFilters} />
            </ul>
          </div>

          <div className="radio-custom">
            <h4>Filter by Price</h4>

            <ul>
              <RadioBox prices={prices} handleFilters={handleFilters} />
            </ul>
          </div>
        </div>

        <div className="col-8">Right</div>

      </div>
      
    </Layout>
  );
};

export default Shop;
