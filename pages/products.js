import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

// productList Prop get SSR
const Products = ({ productList }) => {
  const [products, setProducts] = React.useState(productList);
  const router = useRouter();

  //this function work CSR
  const fetchFoodProducts = async () => {
    const { data } = await axios(
      "http://localhost:4000/products?category=food"
    );
    setProducts(data);
    //shallow routing
    router.push("products?category=food", undefined, { shallow: true });
  };
  return (
    <>
      <h1>List of Products</h1>
      <button onClick={fetchFoodProducts}>Food Products</button>
      {products.map((product) => {
        const { id, description, title, category, price } = product;
        return (
          <div key={id}>
            <h2>
              {id} - {title} - {category} - {price}
            </h2>
            <p>{description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
};
export default Products;

export const getServerSideProps = async (ctx) => {
  const { query, resolvedUrl } = ctx;
  //!hard code method
  console.log("query--->", query);
  //   const queryString = query.category ? "/products?category=food" : "/products";
  //   const { data } = await axios(`http://localhost:4000${queryString}`);

  //!parametric method
  console.log("resolvedUrl--->", resolvedUrl);
  const { data } = await axios(`http://localhost:4000${resolvedUrl}`);

  return {
    props: {
      productList: data,
    },
  };
};
