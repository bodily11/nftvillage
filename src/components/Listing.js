import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { styled, withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MuiTooltip from "@material-ui/core/Tooltip";
import getGenes from "./CronicStats.js";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Timestamp from "react-timestamp";
import extjs from "../ic/extjs.js";
import cronics from "../ic/Cronics.js";
import { useHistory } from "react-router-dom";
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
const _showListingPrice = (n) => {
  n = Number(n) / 100000000;
  return n.toFixed(8).replace(/0{1,6}$/, "");
};
const _showDate = (t) => {
  return new Date(Number(t/1000000n)).toLocaleDateString();
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const TableHead = withStyles((theme) => ({
  root: {
    backgroundColor: "#00d092"
  }
}))(MuiTableHead);

const TableHeaderCell = withStyles((theme) => ({
  root: {
    color: "black",
    "font-weight": "bold"
  }
}))(TableCell);

export default function Listing(props) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [sales, setSales] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const genes = props.collection.canister !== "e3izy-jiaaa-aaaah-qacbq-cai" ? "" : props.showing === "all" ? getGenes(props.listing[1].nonfungible.metadata[0]) : getGenes(props.listing[2].nonfungible.metadata[0]);

  const history = useHistory();
  const tokenid = extjs.encodeTokenId(props.collection.canister, props.listing[0]);

  const handlePopupOpen = () => {
    props.onListingDialogChange(true);
    var saleTransactions = props.transactions.filter(
      (_t) => extjs.encodeTokenId(props.collection.canister, mintNumber()-1) === _t.token);
    if (saleTransactions.length > sales.length) {
      var volume = 0;
      var data = [];
      setSales(saleTransactions);
      saleTransactions.forEach(t => {
        volume += Number(_showListingPrice(t.price));
        data.push(JSON.parse('{"date":"' + _showDate(t.time) + '","price":' + _showListingPrice(t.price) + ',"averagePrice":' + (volume / (saleTransactions.indexOf(t) + 1)) + '}'));
      });
      setChartData(data);
    }
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    props.onListingDialogChange(false);
    setPopupOpen(false);
  };

  const styles = {
    avatarSkeletonContainer: {
      height: 0,
      overflow: "hidden",
      paddingTop: "100%",
      position: "relative",
    },
    avatarLoader: {
      position: "absolute",
      top: "15%",
      left: "15%",
      width: "70%",
      height: "70%",
      margin: "0 auto",
    },
    avatarImg: {
      position: "absolute",
      top: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      margin: "0 auto",
      objectFit: "contain",
    },
  };
  const _isLocked = (listing) => {
    if (listing.locked.length === 0) return false;
    if (Date.now() >= Number(listing.locked[0] / 1000000n)) return false;
    return true;
  };

  const mintNumber = () => {
    if (props.collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return props.listing[0];
    if (props.collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return props.listing[0];
    if (props.collection.canister === "q6hjz-kyaaa-aaaah-qcama-cai")
      return props.listing[0];
    else return props.listing[0] + 1;
  };
  const icpbunnyimg = i => {
    const icbstorage = ['efqhu-yqaaa-aaaaf-qaeda-cai',
    'ecrba-viaaa-aaaaf-qaedq-cai',
    'fp7fo-2aaaa-aaaaf-qaeea-cai',
    'fi6d2-xyaaa-aaaaf-qaeeq-cai',
    'fb5ig-bqaaa-aaaaf-qaefa-cai',
    'fg4os-miaaa-aaaaf-qaefq-cai',
    'ft377-naaaa-aaaaf-qaega-cai',
    'fu2zl-ayaaa-aaaaf-qaegq-cai',
    'f5zsx-wqaaa-aaaaf-qaeha-cai',
    'f2yud-3iaaa-aaaaf-qaehq-cai']

    return "https://" +icbstorage[i % 10]+".raw.ic0.app/Token/"+i;
  };

  const nftImg = () => {
    if (props.collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return (
        "https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/" +
        props.listing[0]
      );
    if (props.collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return (
        "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app?tokenId=" +
        props.listing[0]
      );
    if (props.collection.canister === "q6hjz-kyaaa-aaaah-qcama-cai")
      return icpbunnyimg(props.listing[0])
    return (
      "https://" +
      props.collection.canister +
      ".raw.ic0.app/?cc=0&type=thumbnail&tokenid=" +
      tokenid
    );
  };
  const nftLink = () => {
    if (props.collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return (
        "https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/" +
        props.listing[0]
      );
    if (props.collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return (
        "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app?tokenId=" +
        props.listing[0]
      );
    if (props.collection.canister === "q6hjz-kyaaa-aaaah-qcama-cai")
      return icpbunnyimg(props.listing[0])
    return "https://" + props.collection.canister + ".raw.ic0.app/?tokenid=" + tokenid;
  };

  const nriLink = () => {
    if (props.collection === "bxdf4-baaaa-aaaah-qaruq-cai") return "https://nntkg-vqaaa-aaaad-qamfa-cai.ic.fleek.co/?collection=punks&tokenid=" + props.listing[0];
    if (props.collection === "3db6u-aiaaa-aaaah-qbjbq-cai") return "https://nntkg-vqaaa-aaaad-qamfa-cai.ic.fleek.co/?collection=drips&tokenid=" + props.listing[0];
    if (props.collection === "q6hjz-kyaaa-aaaah-qcama-cai") return "https://nntkg-vqaaa-aaaad-qamfa-cai.ic.fleek.co/?collection=bunnies&tokenid=" + props.listing[0];
    return "https://nntkg-vqaaa-aaaad-qamfa-cai.ic.fleek.co/?tokenid=" + tokenid;
  };
  var t = ["Common","Uncommon","Rare","Epic","Legendary","Mythic"];
  const showNri = () => {
    if (props.collection.canister == "poyn6-dyaaa-aaaah-qcfzq-cai") {
      return (<Grid item md={6} sm={6} xs={6}>
        <Typography style={{fontSize: 11, textAlign:"right", fontWeight:"bold"}} color={"inherit"} gutterBottom>
          {(props.listing[2].nonfungible.metadata[0][0] === 0 ? "Pack" : "#" + props.listing[2].nonfungible.metadata[0][0] + " - " + t[props.listing[2].nonfungible.metadata[0][1]])}
        </Typography>
      </Grid>);
    };
    if (props.collection.nftv) {
      return (
        <Grid item md={6} sm={6} xs={6}>
          <Typography
            style={{ fontSize: 11, textAlign: "right", fontWeight: "bold" }}
            color={"inherit"}
            gutterBottom
          >
            <span
              style={{ color: "black", textDecoration: "none" }}
            >
              NRI: {(props.gri * 100).toFixed(1)}%{" "}
            </span>
          </Typography>
        </Grid>
      );
    } else return "";
  };

  return (
    <Grid style={{ height: "100%" }} item md={3} sm={4} xs={4}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={6} sm={6} xs={6}>
              <Typography
                style={{
                  fontSize: 11,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
                color={"inherit"}
                gutterBottom
              >
                <MuiTooltip title="View in browser">
                  <a href={nftLink()} style={{ color: "black", textDecoration: "none" }} rel="noreferrer" target="_blank">
                    <span>
                      {"#" + mintNumber()}
                    </span>
                  </a>
                </MuiTooltip>
              </Typography>
            </Grid>
            {showNri()}
          </Grid>
            <div style={{ ...styles.avatarSkeletonContainer }}>
              <img alt={tokenid} style={{ ...styles.avatarImg, display: imgLoaded ? "block" : "none", }} src={nftImg()} onLoad={() => setImgLoaded(true)} onClick={handlePopupOpen} />
              <BootstrapDialog
                onClose={handlePopupClose}
                open={popupOpen} maxWidth="md" fullWidth={true}
                style={{zIndex:1500}}
              >
                <BootstrapDialogTitle onClose={handlePopupClose}>
                  {"#" + mintNumber()}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <div style={{ width : "100%", height : "100%"}}>
                  <Grid style={{fontWeight:"bold"}} container spacing={1}>
                    <img
                      alt={tokenid}
                      style={{
                        ...styles.avatarImg,
                        display: imgLoaded ? "block" : "none",
                        position : "relative",
                        width: "30%",
                        left: "0%"
                      }}
                      src={nftImg()}
                      onLoad={() => setImgLoaded(true)}
                    />
                  </Grid>
                  <div style={{ marginTop: "20px"}}>
                    <Typography style={{ fontSize: 14, textAlign: "center" }} color={"inherit"} gutterBottom>
                      NRI:
                    </Typography>
                    <Typography
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                      color={"inherit"}
                      gutterBottom
                    >
                      {(props.gri * 100).toFixed(1)}%{" "}
                    </Typography>
                  </div>
                  <div style={{ marginTop: "20px"}}>
                    <Typography
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                      }}
                      color={"inherit"}
                      gutterBottom
                    >
                    { props.showing === "all" ? (
                      <>
                      { props.listing[2].length !== 0 ? (
                        <>
                        Price :
                        </>
                      ) : props.listing[3].length !== 0 ? (
                        <>
                          Last Price :
                        </>
                        ) : ("")
                      }
                      </>
                    ) : (
                      <>
                      Price :
                      </>
                    )
                    }
                    </Typography>
                    <Typography
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                      color={"inherit"}
                      gutterBottom
                    >
                    { props.showing === "all" ? (
                      <>
                      { props.listing[2].length !== 0 ? (
                        <>
                        {_showListingPrice(props.listing[2][1].price)} ICP
                        </>
                      ) : props.listing[3].length !== 0 ? (
                        <>
                          {_showListingPrice(props.listing[3][props.listing[3].length-1].price)} ICP
                        </>
                        ) : ("")
                      }
                      </>
                    ) : (
                      <>
                      {_showListingPrice(props.listing[1].price)} ICP
                      </>
                    )
                    }
                    </Typography>
                  </div>
                  <div style={{ marginTop: "40px"}}>
				          {props.collection.canister === "e3izy-jiaaa-aaaah-qacbq-cai" ? (
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary>
                        <Typography><strong>Battle Stats</strong></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid style={{textAlign:"center"}} container spacing={1}>
                          <Grid item xs={4}><strong>Attack</strong><br />{genes.battle.attack.dominant} ({genes.battle.attack.recessive})</Grid>
                          <Grid item xs={4}><strong>Magic</strong><br />{genes.battle.magic.dominant} ({genes.battle.magic.recessive})</Grid>
                          <Grid item xs={4}><strong>Range</strong><br />{genes.battle.range.dominant} ({genes.battle.range.recessive})</Grid>
                          <Grid item xs={4}><strong>Health</strong><br />{genes.battle.health.dominant} ({genes.battle.health.recessive})</Grid>
                          <Grid item xs={4}><strong>Defense</strong><br />{genes.battle.defense.dominant} ({genes.battle.defense.recessive})</Grid>
                          <Grid item xs={4}><strong>Resistance</strong><br />{genes.battle.resistance.dominant} ({genes.battle.resistance.recessive})</Grid>
                          <Grid item xs={4}><strong>Base</strong><br />{genes.battle.base.dominant} ({genes.battle.base.recessive})</Grid>
                          <Grid item xs={4}><strong>Speed</strong><br />{genes.battle.speed.dominant} ({genes.battle.speed.recessive})</Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>) : ("")
                  }
                  {props.collection.canister === "e3izy-jiaaa-aaaah-qacbq-cai" ? (
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary>
                        <Typography><strong>Properties</strong></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{display : "flex", flexDirection : "column", width: "100%"}}>
                          <Typography><strong>Visual</strong></Typography>
                          <br/>
                          <Grid style={{textAlign:"center"}} container spacing={1}>
                            <Grid item xs={6}><strong>Background</strong><br />{cronics.backgrounds_details[genes.visual.background.dominant-1]} ({cronics.backgrounds_details[genes.visual.background.recessive-1]})</Grid>
                            <Grid item xs={6}><strong>Pattern</strong><br />{cronics.patterns_details[genes.visual.pattern.dominant-1]} ({cronics.patterns_details[genes.visual.pattern.recessive-1]})</Grid>
                            <Grid item xs={6}><strong>Face</strong><br />{cronics.faces_details[genes.visual.face.dominant-1]} ({cronics.faces_details[genes.visual.face.recessive-1]})</Grid>
                            <Grid item xs={6}><strong>Eyes</strong><br />{cronics.eyes_details[genes.visual.eyes.dominant-1]} ({cronics.eyes_details[genes.visual.eyes.recessive-1]})</Grid>
                          </Grid>
                          <br/>
                          <Typography><strong>Color</strong></Typography>
                          <br/>
                          <Grid style={{textAlign:"center"}} container spacing={1}>
                            <Grid item xs={6}><strong>Background</strong><br />{cronics.colors[cronics.colors_details[0][genes.color.background.dominant-1]]} ({cronics.colors[cronics.colors_details[0][genes.color.background.recessive-1]]})</Grid>
                            <Grid item xs={6}><strong>Pattern</strong><br />{cronics.colors[cronics.colors_details[1][genes.color.pattern.dominant-1]]} ({cronics.colors[cronics.colors_details[1][genes.color.pattern.recessive-1]]})</Grid>
                            <Grid item xs={6}><strong>Face</strong><br />{cronics.colors[cronics.colors_details[2][genes.color.face.dominant-1]]} ({cronics.colors[cronics.colors_details[2][genes.color.face.recessive-1]]})</Grid>
                            <Grid item xs={6}><strong>Eyes</strong><br />{cronics.colors[cronics.colors_details[0][genes.color.eyes.dominant-1]]} ({cronics.colors[cronics.colors_details[0][genes.color.eyes.recessive-1]]})</Grid>
                          </Grid>
                        </div>
                      </AccordionDetails>
                    </Accordion>) : ("")
                  }
                  {typeof props.collection.data !== 'undefined' ? (
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary>
                        <Typography><strong>Properties</strong></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{display : "flex", flexDirection : "column", width: "100%"}}>
                          <Grid style={{textAlign:"center"}} container spacing={1}>
                            {props.collection.data.characteristics.map((characteristic, i) => {
                              return (
                                <Grid item xs={4}>
                                  <strong>{characteristic}</strong>
                                  <br />
                                  {props.collection.data.values[i][props.collection.data.tokens[mintNumber()-1][i]]}
                                  <br />
                                  <Typography variant="body2" color="textSecondary" component="p">
                                  {Math.round(props.collection.data.counts[i][props.collection.data.tokens[mintNumber()-1][i]] / props.collection.data.supply * 100 * 100) / 100 }% have this trait
                                  </Typography>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                      </AccordionDetails>
                    </Accordion>) : ("")
                  }
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary>
                      <Typography><strong>Price History</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ResponsiveContainer height={300}>
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line name="Price" type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line name="Average Price" type="monotone" dataKey="averagePrice" stroke="#00d092" />
                      </LineChart>
                    </ResponsiveContainer>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary>
                      <Typography><strong>Transaction History</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell align="left">Event</TableHeaderCell>
                            <TableHeaderCell align="left">Price</TableHeaderCell>
                            <TableHeaderCell align="left">Buyer</TableHeaderCell>
                            <TableHeaderCell align="left">Date</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                          { sales.length > 0 ? (
                            <TableBody>
                              {sales.map((row) => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    Sale
                                  </TableCell>
                                  <TableCell>{_showListingPrice(row.price)} ICP</TableCell>
                                  <TableCell>
                                    <a href={"https://ic.rocks/account/" + row.buyer} target="_blank">
                                      {row.buyer}
                                    </a>
                                  </TableCell>
                                  <TableCell>{_showDate(row.time)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          ) : ("")
                          }
                      </Table>
                    </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </div>
                </div>
                </DialogContent>
              </BootstrapDialog>
              <Skeleton
                style={{
                  ...styles.avatarLoader,
                  display: imgLoaded ? "none" : "block",
                }}
                variant="rect"
              />
          </div>
          { props.showing === "all" ? (
            <>
            { props.listing[2].length !== 0 ? (
              <Typography
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                color={"inherit"}
                gutterBottom
              >
              {_showListingPrice(props.listing[2][1].price)} ICP
              </Typography>
            ) : props.listing[3].length !== 0 ? (
              <>
                <Typography style={{fontSize: 12, textAlign:"right", fontWeight:"bold"}} color={"inherit"} gutterBottom>
                  <small>Last Price</small><br/>
                  {_showListingPrice(props.listing[3][props.listing[3].length-1].price)} ICP
                  </Typography>
                </>
              ) : (
                <>
                <br/><br/>
                </>
              )
            }
            </>
          ) : (
            <Typography
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "bold",
              }}
              color={"inherit"}
              gutterBottom
            >
            {_showListingPrice(props.listing[1].price)} ICP
            </Typography>
          )
          }
          {props.loggedIn && (props.showing !== "all" || props.listing[2].length !== 0) ? (
            <Typography
              style={{ fontSize: 12, textAlign: "center" }}
              color={"inherit"}
              gutterBottom
            >
            </Typography>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
