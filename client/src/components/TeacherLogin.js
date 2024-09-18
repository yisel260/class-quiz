import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import UserContext from "../UserContext";

function TeacherLogin({ onLogin }) {
  const context = useContext(UserContext);

  const formSchema = yup.object().shape({
    username: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().min(3, "Password must be at least 8 characters").required("Must enter password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch("/teacherlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.ok) {
          console.log("Response status:", r.status);
          r.json().then((user) => context.onLogin(user));
        } else {
          console.log("Response not ok");
        }
      });
    },
  });

  return (
    <>
      <h3>Login With Email</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <br /><br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <br /><br />
        <button type="submit" className="action-button">Login</button>
      </form>
    </>
  );
}

export default TeacherLogin;