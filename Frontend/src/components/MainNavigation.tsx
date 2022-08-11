import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { RoutePaths } from "../utils/enum";

//component lazy loading
const Login = lazy(() => import("../pages/login/index"));
const Register = lazy(() => import("../pages/register/index"));
const Home = lazy(() => import("../pages/home/index"));
const CustomerPage = lazy(() => import("../pages/customer/index"));
const Account = lazy(() => import("../pages/account/index"));
const AccountList = lazy(() => import("../pages/accountlist/index"));
const FolderList = lazy(() => import("../pages/folderlist/index"));
const Folders = lazy(() => import("../pages/folders/index"));
const UploadFile = lazy(() => import("../pages/uploadfile/index"));
const ForgotPassword = lazy(() => import("../pages/forgotpassword/index"));


const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={RoutePaths.Login} component={Login} />
      <Route exact path={RoutePaths.Register} component={Register} />
      <Route exact path={RoutePaths.Home} component={Home} />
      <Route exact path={RoutePaths.Account} component={Account} />
      <Route exact path={RoutePaths.AccountList} component={AccountList} />
      <Route exact path={RoutePaths.FolderList} component={FolderList} />
      <Route exact path={RoutePaths.CustomerPage} component={CustomerPage} />
      <Route exact path={RoutePaths.Folders} component={Folders} />
      <Route exact path={RoutePaths.UploadFile} component={UploadFile} />
      <Route exact path={RoutePaths.ForgotPassword} component={ForgotPassword} />
    </Switch>
  );
};

export default AppRoutes;
