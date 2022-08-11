import React, { useEffect, useState } from "react";
import { createAccountStyle } from "./style";
import {
  Breadcrumbs,
  Link,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/index";
import authService from "../../service/auth.service";
import { StatusCode } from "./../../constant/constant";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUserModel } from "../../models/AuthModel";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Register: React.FC = () => {
  const classes = createAccountStyle();
  const materialClasses = materialCommonStyles();
  const history = useHistory();
  const initialValues: CreateUserModel = new CreateUserModel();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().length(10,"Mobile must be 10 digits").required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  const onSubmit = (data: CreateUserModel): void => {
    authService.create(data).then((res) => {
      history.push("/login");
      toast.success("Successfully registered");
    });
  };
  return (
    <div className={classes.createAccountWrapper}>
      <div className="create-account-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Create an Account</Typography>
          </Breadcrumbs>

          <p className="display-2 text-center">Create new Account</p>
          <div className="create-account-row">
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
                            id="name"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Name *"
                          autoComplete="off"
                          variant="outlined"
                          inputProps={{ className: "small" }}
                        />
                        <ValidationErrorMessage
                          message={errors.name}
                          touched={touched.name}
                        />
                      </div>
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
                          Register
                        </button>
                  </form>
                  </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
