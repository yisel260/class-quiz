import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function TeacherLogin({onLogin}) {


  const formSchema= yup.object().shape(
    {
      username: yup.string().email("Invalid email").required("Must enter email")
    })

  const formik = useFormik({
    initialValues: {
      username: "",
    },
      validationSchema: formSchema,
      onSubmit: (values) => {
        console.log(values)
      fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values.username),
    }).then((r) => {
      if (r.ok) {
        console.log("Response status:", r.status);
        r.json().then((user) => onLogin(user));
      }
      else console.log("response not ok")
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
          /><br/><br/>
      <button type="submit" className="action-button">Login</button>
    </form>
    </>
  );
}

export default TeacherLogin;