import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="col-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          {...register("name", {
            required: true,
            pattern: /^[A-Z][a-z]+$/,
            minLength: 2,
            maxLength: 80,
          })}
        />
        {errors.name?.type === "required" && <p>Name field cannot be empty</p>}
        {errors.name?.type === "pattern" && (
          <p>Name must start with an uppercase letter</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Due date:
        </label>
        <input
          type="date"
          id="dueDate"
          className="form-control"
          {...register("dueDate", {
            required: true,
            min: "",
            max: "",
          })}
        />
        {errors.dueDate?.type === "required" && (
          <p>Date field cannot be empty</p>
        )}
        {errors.dueDate?.type === "min" && (
          <p>Date shouldn't be older than today</p>
        )}
        {errors.dueDate?.type === "max" && <p>Date shouldn't exceed 1 year</p>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
