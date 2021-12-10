/* global BigInt */
import React from "react";
import Navbar from "./components/Navbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import AlertDialog from "./components/AlertDialog";
import { Route, Switch } from "react-router-dom";
import Listings from "./components/Listings";
import Token from "./components/Token";
import Home from "./views/Home";
import Typography from "@material-ui/core/Typography";
import _c from './ic/collections.js';
var collections = _c;
const _isCanister = c => {
  return c.length == 27 && c.split("-").length == 5;
};
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1600,
    color: "#fff",
  },
  inner: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    marginTop: 73,
    paddingBottom:50,
    background: "grey",
  },
  footer: {
    textAlign: "center",
    bottom: 0,
    height: "100px !important",
    background: "black",
    color: "white",
    paddingTop: 30,
  },
}));
const emptyAlert = {
  title: "",
  message: "",
};
var collections = collections.filter(a => _isCanister(a.canister));
export default function App() {
  const classes = useStyles();
  const [loaderOpen, setLoaderOpen] = React.useState(false);
  const [loaderText, setLoaderText] = React.useState("");
  const [alertData, setAlertData] = React.useState(emptyAlert);
  const [showAlert, setShowAlert] = React.useState(false);

  //useInterval(_updates, 60 * 1000);
  const alert = (title, message, buttonLabel) => {
    return new Promise(async (resolve, reject) => {
      setAlertData({
        title: title,
        message: message,
        buttonLabel: buttonLabel,
        handler: () => {
          setShowAlert(false);
          resolve(true);
          setTimeout(() => setAlertData(emptyAlert), 100);
        },
      });
      setShowAlert(true);
    });
  };
  const error = (e) => {
    alert("There was an error", e);
  };
  const loader = (l, t) => {
    setLoaderText(t);
    setLoaderOpen(l);
    if (!l) {
      setLoaderText("");
    }
  };
  const footer = (
  <div className={classes.footer}>
    <Typography variant="body1">
      Developed by The NFT Village &copy; All rights reserved 2021
    </Typography>
  </div>);

  return (
    <>
      <Navbar view={""} loader={loader} collections={collections} collection={false} />
      <main className={classes.content}>
        <div className={classes.inner}>
          <Switch>
            <Route path="/collection/:route" exact>
              <Listings
                error={error}
                view={"listings"}
                alert={alert}
                loader={loader} collections={collections} collection={false}
              />
            </Route>
            <Route path="/home" exact>
              <Home
                error={error}
                view={"collections"}
                alert={alert}
                loader={loader} collections={collections} collection={false}
              />
            </Route>
            <Route path="/" exact>
              <Token
                error={error}
                view={"token"}
                alert={alert}
                loader={loader} collections={collections} collection={false}
              />
            </Route>
          </Switch>
        </div>
      </main>
      {footer}
      <Backdrop className={classes.backdrop} open={loaderOpen}>
        <CircularProgress color="inherit" />
        <h2 style={{ position: "absolute", marginTop: "120px" }}>
          {loaderText ?? "Loading..."}
        </h2>
      </Backdrop>
      <AlertDialog
        open={showAlert}
        title={alertData.title}
        message={alertData.message}
        buttonLabel={alertData.buttonLabel}
        handler={alertData.handler}
      />
    </>
  );
}
