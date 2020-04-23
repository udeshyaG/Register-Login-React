import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }

    if (authContext.error === "User already exists") {
      alertContext.setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [authContext.error, authContext.isAuthenticated, props.history]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || password2 === "") {
      alertContext.setAlert("Enter all fields", "danger");
    } else if (password !== password2) {
      alertContext.setAlert("Passwords do not match", "danger");
    } else {
      const formData = { name, email, password };

      authContext.register(formData);
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-primary">Account Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
