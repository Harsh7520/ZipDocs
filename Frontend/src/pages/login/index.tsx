import React from "react";
import { loginStyle } from "./style";
import {
  Breadcrumbs,
  Link,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { LoginModel } from "../../models/AuthModel";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const classes = loginStyle();
  const history = useHistory();
  const initialValues: LoginModel = new LoginModel();

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .length(10,"Mobile must be 10 digits")
      .required("Mobile is required"),
    password: Yup.string()
      .length(8,"Password must be 8 characters")
      .required("Password is required"),
  });

  const onSubmit = (values: LoginModel): void => {
    authService.login(values).then((res) => {
        localStorage.setItem("token",res);
        history.push("/");
        toast.success("Successfully logged in");
    });
  };
  return (
    <div className={classes.loginWrapper}>
      <div className="login-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Login</Typography>
          </Breadcrumbs>
          <p className="display-2 text-center">Login or Create an Account</p>
          
           
            
              <h2 className="display-6 my-3 text-center">Registered Consultants</h2>
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <div className="login-row d-flex align-center">
                  <form onSubmit={handleSubmit}>
                      <div className="form-row-wrapper">
                      <div className="form-col my-2">
                          <TextField
                            id="mobile"
                            name="mobile"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Mobile *"
                          autoComplete="off"
                          variant="outlined"
                          inputProps={{ className: "small" }}
                        />
                        <ValidationErrorMessage
                          message={errors.mobile}
                          touched={touched.mobile}
                        />
                      </div>
                      <div className="form-col my-2">
                        <TextField
                          id="password"
                          name="password"
                          label="Password *"
                          type="password"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{ className: "small" }}
                          autoComplete="off"
                        />
                        <ValidationErrorMessage
                          message={errors.password}
                          touched={touched.password}
                        />
                      </div>
                      <Link href="/forgotpassword">Forgot Password?</Link>
                    </div>
                    <button
                          className="btn btn-success btn-lg my-2"
                          type="submit"
                          color="primary"
                        >
                          Login
                        </button>
                        <button
                  className="btn btn-success btn-lg my-5 mx-3"
                  color="primary"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Create an Account
                </button>
                  </form>
                  </div>
                )}
              </Formik>
            </div>
          
        </div>
      </div>
    
  );
};

export default Login;
