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
import { Link, useHistory, useLocation } from "react-router-dom";
import { RoutePaths } from "../../utils/enum";
import { Formik } from "formik";
import { CreateUserModel } from "../../models/AuthModel";
import authService from "../../service/auth.service";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Tree from 'react-custom-tree';
import DownloadLink from "react-download-link";
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import AccountList from "../accountlist";
import { resolve } from "path";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

var LTT = require('list-to-tree');
const FolderList: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;
  const accid = state.params;
  const custid = state.customer;
  console.log(custid);
  const [states, setStates] = useState(Array);
  useEffect(() => {
    authService.getfolders(accid).then((res) =>
    {
      var ltt = new LTT(res, {
        key_id: 'id',
        key_parent: 'parentID'
      });
      var tree = ltt.GetTree();
      setStates(tree);
    });
}, []);
  const history = useHistory();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'id', filter: true,hide: true},
    {field: 'name',   filter:true},
    
  ]);
  const [fileid,setFileid] = useState(0);
  const [filename,setFilename] = useState("");
  const cellClickedListener = useCallback( event => {
    setFileid(event.data.id);
    setFilename(event.data.name);
  }, []);
  console.log(fileid);
 
  console.log(states);
  
 
 const HandleClick = () => {
    
    history.push('/folders',{params:foldid,customer:custid,account:accid})
    
 } 
 const[foldid,setFoldId] = useState(0);
 const[files,setFiles] = useState(Array);
 const HandleClick2 = () => {
    authService.getfiles(foldid).then((res) =>
    {
      setFiles(res);
      console.log(files);
    
  })
 }
 const HandleClick3 = () => {
  authService.downloadfile(fileid)
  .then((blob) => {
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${filename}`,
    );
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  });
 }
 const HandleClick4 = () => {
  history.push('/uploadfile',{folderid:foldid,customer:custid,account:accid})

 }


  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <p className="display-2 text-center">Account Page</p>
        <p className="display-4 text-center">Folders</p>
        <div className="d-flex justify-content-around">
     <Tree
     data={states}
     onChidClick={(child) => setFoldId(child["id"])}
    />
     <div className="ag-theme-alpine" style={{width: 220, height: 500}}>

       <AgGridReact
           rowData={files}
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
                          Create Folder
                        </button>
                        <button 
                          onClick={HandleClick2}
                          className="btn btn-success btn-lg my-2">
                          Get Files
                        </button>
                      <button 
                          onClick={HandleClick3}
                          className="btn btn-success btn-lg my-2">
                          Download File
                        </button>
                        <button 
                          onClick={HandleClick4}
                          className="btn btn-success btn-lg my-2">
                          Upload File
                        </button>
                      </div>
      </div>
    </div>
  );
};
export default FolderList;
