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
import { Link, useHistory } from "react-router-dom";
import { RoutePaths } from "../../utils/enum";
import { Formik } from "formik";
import { CreateUserModel } from "../../models/AuthModel";
import authService from "../../service/auth.service";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import AccountList from "../accountlist";


const Home: React.FC = () => {

  const [state, setState] = useState(Array);
  useEffect(() => {
    authService.getcustomers().then((res) =>
    {
      setState(res);
    });
}, []);
  
  const history = useHistory();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  
   // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 const [custid, setCustid] = useState();

 
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: 'id', filter: true,hide: true},
    {field: 'name',   filter:true},
    {field: 'mobile', filter:true},
    {field: 'email', filter:true},
    {field: 'address', filter:true}
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    setCustid(event.data.id);
  }, []);
 
 
 const HandleClick = () => {
    
    history.push('/accountlist',{params:custid})
    
 }

 const HandleClick2 = () => {
    
  history.push('/customer')
  
}
  
  console.log(state)

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <p className="display-2 text-center">Consultant Page</p>
        <p className="display-4 text-center">Customers</p>
        <div className="d-flex justify-content-center">
        <div className="ag-theme-alpine" style={{width: 810, height: 500}}>
         <AgGridReact
           rowData={state}
           columnDefs={columnDefs} 
           animateRows={true}
           rowSelection='multiple' 
           onCellClicked={cellClickedListener}
           />
        </div>
      </div>
        <div className="d-flex justify-content-around">
        
                        <button
                          onClick={HandleClick2} 
                          className="btn btn-success btn-lg my-2">
                          Create Customer
                        </button>
                        <button 
                          onClick={HandleClick}
                          className="btn btn-success btn-lg my-2">
                          Get Accounts
                        </button>
                      </div>
      </div>
    </div>
  );
};

export default Home;
