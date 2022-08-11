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
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { ForgotPasswordModel, LoginModel } from "../../models/AuthModel";
const ForgotPassword: React.FC = () => {
  const classes = loginStyle();
  const history = useHistory();
  const initialValues: ForgotPasswordModel = new ForgotPasswordModel();

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .length(10,"Mobile must be 10 digits")
      .required("Mobile is required"),
    email: Yup.string()
      .email("Invalid Email format")
      .required("Password is required"),
  });

  const onSubmit = (values: ForgotPasswordModel): void => {
    authService.forgotpassword(values).then((res) => {
      console.log(res);
        history.push("/login");
        toast.success("Password Reset Successfully. Check Mail for new Password");
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
            <Typography color="textPrimary">Forgot Password</Typography>
          </Breadcrumbs>
          <p className="display-2 text-center">Forgot Password</p>
          <div className="login-row">
            
            <div className="form-block">
              
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
                          id="email"
                          name="email"
                          label="Email *"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{ className: "small" }}
                          autoComplete="off"
                        />
                        <ValidationErrorMessage
                          message={errors.email}
                          touched={touched.email}
                        />
                      </div>
                      
                    </div>
                    <button
                          className="btn btn-success btn-lg my-2"
                          type="submit"
                          color="primary"
                        >
                          Submit
                        </button>
                        
                  </form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
