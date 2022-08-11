import React, { useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { headerStyle } from "./style";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import ListItem from "@material-ui/core/ListItem";
import siteLogo from "../../assets/images/zipdocslogo.png";
import crossIcon from "../../assets/images/cross.svg";
import cartIcon from "../../assets/images/cart.png";
import flagIcon from "../../assets/images/flag.png";
import searchIcon from "../../assets/images/search.png";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { RoutePaths } from "../../utils/enum";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Nav,Navbar,Container} from "react-bootstrap";

const Header: React.FC = () => {
  const classes = headerStyle();
  const materialClasses = materialCommonStyles();
    return (
      <Navbar bg="light"  variant = "light">

    <Navbar.Brand href="/">
      <img
        src={siteLogo}
        width="150"
        height="150"
        className="d-inline-block align-left"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
      <Nav>
        <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
      </Nav>
  </Navbar>
  );
};

export default Header;
