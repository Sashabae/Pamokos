import { useParams, Link } from "react-router";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

export default function ProductDetails() {
    let { id } = useParams();
    const product = products.find((prod) => prod.id == id);


  return (
    <div>
      <h1>{product.name}</h1>
      <Link to="/">Back to Product List</Link>
    </div>
  );
}
