import React, { useEffect, useState } from "react";

import { Typography, Button, Link, Tooltip, FormControl, TextField } from "@material-ui/core";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import prodcutImage from "../../assets/images/dummy-image.jpg";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { CreateAccountModel, CreateUserModel } from "../../models/AuthModel";
import * as Yup from "yup";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { createAccountStyle } from "../register/style";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Account: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;
  const custid = state.params;
  const classes = createAccountStyle();
  const initialValues: CreateAccountModel = new CreateAccountModel();
  initialValues.customerId=custid;
  initialValues.accounttypeid = 1;
  const validationSchema = Yup.object().shape({
    
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().length(10,"Mobile must be 10 digits").required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
      address: Yup.string().min(5,"Address must be valid").required("Address is Required"),
  });

  const onSubmit = (data: CreateAccountModel): void => {
    
    authService.createaccount(data).then((res) => {
      console.log(res)
      history.push("/accountlist",{params:custid});
      toast.success("Successfully Created Account");
    });
  }



  const history = useHistory();
  return (
    <div className={classes.createAccountWrapper}>
    <div className="create-account-page-wrapper">
      <div className="container">
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
                    <div className="form-col my-2">
                      <TextField
                        id="address"
                        name="address"
                        label="Address *"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ className: "small" }}
                        autoComplete="off"
                      />
                      <ValidationErrorMessage
                        message={errors.address}
                        touched={touched.address}
                      />
                    </div>
                  </div>
                  <button
                        className="btn btn-success btn-lg my-2"
                        type="submit"
                        color="primary"
                      >
                        Create Account
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

export default Account;
