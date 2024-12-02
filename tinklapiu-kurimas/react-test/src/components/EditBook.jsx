import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function EditBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = ["Drama", "Romance", "Horror", "Science"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/books/${id}`);
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

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <form className="col-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
          />
          {errors.title?.type === "required" && (
            <p>Title field cannot be empty</p>
          )}
          {errors.title?.type === "minLength" && (
            <p>Title must be at least 3 characters</p>
          )}
          {errors.title?.type === "maxLength" && (
            <p>Title should not exceed 100 characters</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Author:
          </label>
          <input
            type="text"
            id="author"
            className="form-control"
            {...register("author", {
              required: true,
              pattern: /^[A-Za-z\s]+$/,
            })}
          />
          {errors.author?.type === "required" && <p>Field cannot be empty</p>}
          {errors.author?.type === "pattern" && (
            <p>Only letters and spaces allowed</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category:
          </label>
          <select
            id="category"
            className="form-control"
            {...register("category", {
              required: true,
            })}
          >
            <option value="">Choose category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category?.type === "required" && <p>Field cannot be empty</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Price:
          </label>
          <input
            type="text"
            id="price"
            className="form-control"
            {...register("price", {
              required: true,
              pattern: /^[1-9][0-9]*$/,
            })}
          />
          {errors.price?.type === "required" && <p>Field cannot be empty</p>}
          {errors.price?.type === "pattern" && (
            <p>Price should be greater than 0</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Cover URL:
          </label>
          <input
            type="text"
            id="cover"
            className="form-control"
            {...register("cover", {
              required: true,
              pattern:
                /^(https?:\/\/)?([\da-z-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
            })}
          />
          {errors.cover?.type === "required" && <p>Field cannot be empty</p>}
          {errors.cover?.type === "pattern" && <p>Must be in URL format</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
