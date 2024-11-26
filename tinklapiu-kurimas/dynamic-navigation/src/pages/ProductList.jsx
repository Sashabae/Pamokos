import { Link } from "react-router";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];
export default function ProductList() {
  return (
    <>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <Link to={`/products/${product.id}`}> View Details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
