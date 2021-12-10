import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";

export default function Navbar(props) {
  const history = useHistory();
  const [route, setRoute] = useState("");
  const classes = useStyles();

  const handleClick = () => {
    const temp = history.location.pathname.split("/")[1];
    setRoute(temp);
  };
  const goTo = page => {
    history.push(page)
    handleClick();
  };

  React.useEffect(() => {
    const temp = history.location.pathname.split("/")[1];
    setRoute(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{zIndex: 1400, background: "black" }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <a onClick={() => goTo("/home")}><img
              alt="IC Rarity"
              src="/nft_village_logo.jpeg"
              style={{ height: 64, cursor: "pointer" }}
            /></a>
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>

    </>
  );
}

const useStyles = makeStyles((theme) => ({
  hidden: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  smNav: {
    position: "absolute",
    top: 20,
    width: "250px",
    display: "flex",
    right: 0,
    backgroundColor: "white",
    height: "100vh",
    justifyContent: "flex-start",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },

  toolbar: theme.mixins.toolbar,
  toolbarButtons: {
    marginLeft: "auto",
  },
  content: {
    flexGrow: 1,
  },

}));
