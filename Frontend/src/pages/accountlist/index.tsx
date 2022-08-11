import React, { useCallback,useEffect,useRef, useMemo, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import { JsonToTable } from "react-json-to-table";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import prodcutImage from "../../assets/images/dummy-image.jpg";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useHistory,useLocation } from "react-router-dom";
import { RoutePaths } from "../../utils/enum";
import { Formik } from "formik";
import { CreateUserModel } from "../../models/AuthModel";
import authService from "../../service/auth.service";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Type } from "typescript";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";




const AccountList: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;
  const custid = state.params;
  const [states, setStates] = useState(Array);
  useEffect(() => {
    authService.getaccounts(custid).then((res) =>
    {
      setStates(res);
    });
},[]);
  
  const history = useHistory();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {field: 'id', filter: true,hide: true},
    {field: 'name',   filter:true},
    {field: 'mobile', filter:true},
    {field: 'email', filter:true},
    {field: 'address',filter:true}
  ]);

  const [accid,setAccid] = useState();
  const cellClickedListener = useCallback( event => {
    setAccid(event.data.id);
  }, []);
 
 
  const HandleClick = () => {
    
    history.push('/account',{params:custid})
    
 }
 const HandleClick2 = () => {
    
  history.push('/folderlist',{params:accid,customer:custid})
  
}
  console.log(states)

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <p className="display-2 text-center">Customer Page</p>
        <p className="display-4 text-center">Account List</p>
     
        <div className="d-flex justify-content-center">
     <div className="ag-theme-alpine" style={{width: 810, height: 500}}>

       <AgGridReact
           

           rowData={states} 

           columnDefs={columnDefs} 
           animateRows={true}
           rowSelection='multiple'

           onCellClicked={cellClickedListener}
           />
     </div>
   </div>
   <div className="d-flex justify-content-around">
        
        <button
          onClick={HandleClick} 
          className="btn btn-success btn-lg my-2">
          Create Account
        </button>
      

        <button 
          onClick={HandleClick2}
          className="btn btn-success btn-lg my-2">
          Get Folders
        </button>
      </div>
      </div>
      </div>
    
  );
};

export default AccountList;
