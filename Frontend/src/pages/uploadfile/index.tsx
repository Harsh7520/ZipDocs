import React, { useEffect, useState } from "react";

import { Typography, Button, Link, Tooltip, FormControl, TextField } from "@material-ui/core";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import prodcutImage from "../../assets/images/dummy-image.jpg";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { CreateAccountModel, CreateFolderModel, CreateUserModel, UploadFileModel } from "../../models/AuthModel";
import * as Yup from "yup";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { createAccountStyle } from "../register/style";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const UploadFile = () => {
  const location = useLocation();
  const state = location.state as any;
  const foldid = state.folderid;
  const custid = state.customer;
  const accid = state.account;
  console.log(custid);

  const initialValues: UploadFileModel = new UploadFileModel();
  initialValues.folderid=foldid;
  initialValues.customerid = custid;
  initialValues.accountId = accid;
  console.log(initialValues);
  const validationSchema = Yup.object().shape({
    
    name: Yup.string().required("Name is required")
   
  });

  const onSubmit = (data: UploadFileModel): void => {
    data.filebytesbase64 =base64val;
    authService.uploadfile(data).then((res) => {
      console.log(res)
      history.push("/folderlist",{params:accid,customer:custid});
      toast.success("Successfully Uploaded File");
    });
  }
  
  const history = useHistory();
  const classes = createAccountStyle();

  
  const [base64val,setBase64Val] = useState("");
  const [fileState,setFileState] = useState({file: null,
    base64URL: ""});

    const getBase64 = file => {
      return new Promise(resolve => {
        let fileInfo;
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          let baseURL = reader.result;
          let new_string = reader.result.toString();
          let arr = new_string.split(",");
          setBase64Val(arr[1]);
          resolve(baseURL);
        };
      });
    };

    const handleFileInputChange = e => {
      let { file } = fileState;
  
      file = e.target.files[0];
  
      getBase64(file)
        .then(result => {
          // file["base64"] = result;
          setFileState({
            base64URL: "result",
            file
          });
        })
        .catch(err => {
          console.log(err);
        });
  
      setFileState({
        file: e.target.files[0],
        base64URL : ""
      });
    };


  
  return (
    <div className={classes.createAccountWrapper}>
    <div className="create-account-page-wrapper">
      <div className="container">
        <p className="display-2 text-center">Upload File</p>
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
                    <div className="form-col my-2">
                        <input className="form-control" type="file" name="file" onChange={handleFileInputChange} />
                        </div> 
                  
                  <button
                        className="btn btn-success btn-lg my-3"
                        type="submit"
                        color="primary"
                      >
                        Upload File
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
 
export default UploadFile;
