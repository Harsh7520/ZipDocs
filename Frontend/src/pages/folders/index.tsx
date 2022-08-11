import React, { useEffect, useState } from "react";

import { Typography, Button, Link, Tooltip, FormControl, TextField } from "@material-ui/core";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import prodcutImage from "../../assets/images/dummy-image.jpg";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { CreateAccountModel, CreateFolderModel, CreateUserModel } from "../../models/AuthModel";
import * as Yup from "yup";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { createAccountStyle } from "../register/style";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Folders: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;
  const foldid = state.params;
  const custid = state.customer;
  const accid = state.account;
  console.log(custid);

  const initialValues: CreateFolderModel = new CreateFolderModel();
  initialValues.parentid=foldid;
  initialValues.customerid = custid;
  initialValues.accountId = accid;
  console.log(initialValues);
  const validationSchema = Yup.object().shape({
    
    name: Yup.string().required("Name is required")
   
  });

  const onSubmit = (data: CreateFolderModel): void => {
    
    authService.createfolder(data).then((res) => {
      console.log(res)
      history.push("/folderlist",{params:accid,customer:custid});
      toast.success("Successfully Created Account");
    });
  }


  const history = useHistory();
  const classes = createAccountStyle();


  

  return (
    <div className={classes.createAccountWrapper}>
    <div className="create-account-page-wrapper">
      <div className="container">
        <p className="display-2 text-center">Create new Folder</p>
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
                    
                    <div className="form-col my-3">
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
                  
                  <button
                        className="btn btn-success btn-lg my-3"
                        type="submit"
                        color="primary"
                      >
                        Create Folder
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

export default Folders;
