import React, { useEffect } from "react";
import extjs from "../ic/extjs.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Listings from "../components/Listings";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Navbar from "../components/Navbar.js";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from '@material-ui/core/TextField';
import collections from '../ic/collections.js';
const api = extjs.connect("https://boundary.ic0.app/");
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  heading: {
    textAlign: "center",
  },
  media: {
    cursor: "pointer",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));
export default function Home(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [query, setQuery] = React.useState("");
  const styles = {
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      marginLeft: 0,
    },
  };
  const handleClick = (a) => {
    history.push(a);
  };
  return (
    <>
      <div style={{ width: "100%", display: "block", position: "relative" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0px auto",
            minHeight:"calc(100vh - 221px)"
          }}
        >
          <h1 className={classes.heading}>All Collections</h1>
          <div style={{margin:"0 auto", textAlign:"center",maxWidth:500}}>
            <TextField placeholder="Search" style={{width:"100%", marginBottom:50}} value={query} onChange={e => setQuery(e.target.value)} variant="outlined" />
          </div>
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            spacing={2}
          >
            {
              collections.filter(a => (query == "" || [a.name, a.brief, a.keywords].join(" ").toLowerCase().indexOf(query.toLowerCase()) >= 0)).sort((a,b) => {
                return b.priority - a.priority;
              }).map((collection, i) => {
                return (<Grid key={i} item md={2} sm={4} style={{ width:"100%", marginBottom: 20 }}>
                  <Card style={{height:240,}} className={classes.root}>
                    <a onClick={() => handleClick("/collection/"+collection.route)}><CardMedia
                      className={classes.media}
                      image={collection.hasOwnProperty('collection') ? collection.collection : "/collections/"+collection.canister+".jpg"}
                      title={collection.name}
                    /></a>
                    <CardContent style={{textAlign:"center"}}>
                      <h4 style={{marginTop:0}}>{collection.name}</h4>
                      <Typography variant="body2" color="textSecondary" component="p">{collection.brief ? collection.brief : ""}</Typography>
                    </CardContent>
                  </Card>
                </Grid>);
              })
            }
          </Grid>
        </div>
      </div>
    </>
  );
}
