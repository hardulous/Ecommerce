import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "../../product api/apiProduct";
import Card from "./Card";

const Home = () => {
  const [produtsBySell, setprodutsBySell] = useState([]);
  const [produtsByArrival, setprodutsByArrival] = useState([]);
  const [error, seterror] = useState(false);

  // function to load product by sold
  const loadProductBysell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setprodutsBySell(data);
      }
    });
  };

  // function to load product by arrival
  const loadprodutsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setprodutsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBysell();
    loadprodutsByArrival();
  }, []);

  console.log(produtsBySell, produtsByArrival);

  return (

    <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

      <h2 className="mb-4">Best Sellers</h2>

      <div className="row">

        {produtsBySell.map((p, index) => {

          return <Card key={p._id} product={p} />;

        })}

      </div>

      <h2 className="mb-4">New Arrivals</h2>

      <div className="row">

        {produtsByArrival.map((p, index) => {

          return <Card key={p._id} product={p} />;
          
        })}

      </div>

    </Layout>
  );
};

export default Home;

// Here in home page we will by-default show products by most sold and products by arrival/latest
