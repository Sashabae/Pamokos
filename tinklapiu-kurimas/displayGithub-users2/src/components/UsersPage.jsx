import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${id}`);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <img src={data.avatar_url} />
      <h1>{data.login}</h1>
      <p>Name: {data.name}</p>
      <p>Company: {data.company}</p>
      <p>Location: {data.location}</p>
    </>
  );
}
