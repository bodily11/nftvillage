import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import extjs from "../ic/extjs.js";
import _c from '../ic/collections.js';
import getNri from "../ic/nftv.js";
import getGenes from "./CronicStats.js";
import { styled, withStyles } from '@material-ui/styles';
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
import Paper from '@material-ui/core/Paper';
const api = extjs.connect("https://boundary.ic0.app/");

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

export default function Token(props) {
  const queryParams = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [collection, setCollection] = React.useState(false);
  const [index, setIndex] = React.useState(false);
  const [tokenId, setTokenId] = React.useState(false);
  const [token, setToken] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [sales, setSales] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);

  const genes = (collection.canister !== "e3izy-jiaaa-aaaah-qacbq-cai") || token === false ? "" : getGenes(token[1].nonfungible.metadata[0]);

  const backgrounds_details = ['Hexagon', 'Snowflake', 'Diamond', 'Multi-point star', 'Circle', 'Star'];
  const patterns_details = ['Arrows', 'Diamond Up / Arrow Diag', 'Arrow Circles', 'Circle Up / Arrow Diag', 'Diamonds', 'Star Circles', 'Circle Up / Line Diag', 'Arrow Up / Circle Diag', 'Arrow Circle Up / Line Diag', 'Flower Petals'];
  const faces_details = ['Circle', 'Horizontal Hexagon #1', 'Pentagon', 'Snowflake', 'Horizontal Hexagon #2', 'Bumpy', 'Vertical Hexagon', 'Heart', 'Octagon', 'Hexastar'];
  const eyes_details = ['Sunglasses', 'Hearts', 'Glasses', 'Cyclops', 'Eyepatch', 'Eyeglass', 'Normal', 'Eyelashes', 'Wink', 'Blue Sunglasses'];

  const colors_details = [["#9ef6c9","#85e48f","#ebd4c7","#48a7c6","#9716b8","#6acc47","#4b147b","#d13b92","#46f2b5","#712553","#276e6c","#9bfb6f","#12c58e","#db3065","#78fa45","#3f6cba","#e46f68","#49f5b7","#7fa8e9","#8395ef","#1322a2","#ad8893","#31d6fe","#858361"],
  ["#d56b53","#5fc76b","#14468f","#18b50d","#51720b","#390a2e","#dff616","#51ceb7","#d87248","#a8edd7","#ebf3e7","#adca25","#772cd5","#bcb5cb","#c61314","#baed05","#77e184","#e1aedb","#b9fbfb","#eb6fc1","#3092f2","#c67f9b","#b795fc","#a05b1b"],
  ["#a46d75","#94ad0b","#11f807","#cbe4c8","#b3c7b1","#9784f9","#2ce19a","#4b5c04","#41589e","#be898c","#4f4632","#e0d0f3","#f34ba5","#63268a","#5b1d4c","#e985f8","#c56125","#6aecb4","#2e6b6d","#c89231","#1bb81e","#3a70b9","#591567","#b647d0"],
  ["#44ed18","#c15c78","#8da85b","#14355a","#7efdea","#318c21","#63dbfd","#c2e002","#a7f51d","#bd2b9f","#2eaa6e","#7090d7","#b79c34","#d5319f","#eadd7a","#d337a8","#bfec24","#bfed81","#82039d","#845d25","#28f345","#1d5fed","#35c7be","#a2bb61"],
  ["#2f29d5","#9e9e62","#81cc99","#b4f052","#946d28","#1777ce","#e3f467","#cabb4d","#ae0dcc","#b61664","#b54f20","#d1efae","#2a0e80","#beb023","#2c31b9","#f9b2ed","#3dfa1b","#2c9043","#a017c4","#33ce0f","#2c80e7","#a2a1fa","#20a853","#3b6f7d"]];

  const colors = {"#11f807":"Green","#12c58e":"Mountain Meadow","#1322a2":"Torea Bay","#14468f":"Tory Blue","#18b50d":"La Palma",
    "#1bb81e":"American Green","#276e6c":"Paradiso","#2ce19a":"Shamrock","#2e6b6d":"Casal","#3092f2":"Dodger Blue","#31d6fe":"Cyan",
	"#390a2e":"Loulou","#3a70b9":"Indigo","#3f6cba":"San Marino Light","#41589e":"San Marino Dark","#46f2b5":"Bright Turquoise Blue",
	"#48a7c6":"Pelorous","#49f5b7":"Aquamarine","#4b147b":"Persian Indigo","#4b5c04":"Verdun Green","#4f4632":"Judge Gray","#51720b":"Green Leaf",
    "#51ceb7":"Puerto Rico","#591567":"Scarlet Gum","#5b1d4c":"Wine Berry","#5fc76b":"Emerald","#63268a":"Daisy Bush","#6acc47":"Mantis",
    "#6aecb4":"Dull Turquoise Blue","#712553":"Tawny Port","#772cd5":"Purple Heart","#77e184":"Dark Pastel Green","#78fa45":"Screamin Green",
    "#7fa8e9":"Light Portage","#8395ef":"Dark Portage","#858361":"Clay Creek","#85e48f":"Light Pastel Green","#94ad0b":"Pistachio",
	"#9716b8":"Seance","#9784f9":"Light Purple","#9bfb6f":"Mint Green","#9ef6c9":"Bright Magic Mint","#a05b1b":"Hawaiian Tan","#a46d75":"Coral Tree",
    "#a8edd7":"Dull Magic Mint","#ad8893":"Bouquet","#adca25":"Key Lime Pie","#b3c7b1":"Clay Ash","#b647d0":"Amethyst","#b795fc":"Mauve",
    "#b9fbfb":"Charlotte","#baed05":"Lime","#bcb5cb":"Chatelle","#be898c":"Brandy Rose","#c56125":"Piper","#c61314":"Thunderbird","#c67f9b":"Puce",
    "#c89231":"Marigold","#cbe4c8":"Surf Crest","#d13b92":"Cerise","#d56b53":"Japonica","#d87248":"Red Damask","#db3065":"Cerise Red",
	"#dff616":"Chartreuse Yellow","#e0d0f3":"Moon Raker","#e1aedb":"Light Orchid","#e46f68":"Sunglo","#e985f8":"Heliotrope","#eb6fc1":"Carissma",
    "#ebd4c7":"Stark White","#ebf3e7":"Willow Brook","#f34ba5":"Brilliant Rose"};

  const initToken = (qp) => {
      if (qp === null) {
        props.loader(false);
        history.push("/home");
      } else {
        try {
          var tk = extjs.decodeTokenId(qp);
          var c = getCollection(tk['canister'])
          setCollection(c);
          var i = tk['index'];
          setIndex(i);
          var id = tk['token'];
          setTokenId(id);
          if (c) {
            getToken(c, i, id);
          } else {
            props.loader(false);
            history.push("/home");
          }
        } catch (e) {
          props.loader(false);
          history.push("/home");
        }
      }
  };

  const _isCanister = c => {
    return c.length == 27 && c.split("-").length == 5;
  };

  const getToken = async (c, i, t) => {
      if (!_isCanister(c.canister)) return setToken(null);
      try {
        var transactions = await api.canister(c.canister).transactions();
        if (c.canister === "e3izy-jiaaa-aaaah-qacbq-cai") {
          transactions = transactions.slice(82)
        }
        transactions = transactions.filter(
          (_t) => _t.token === t
        );
        var listings = await api.canister(c.canister).listings();
        listings = listings.filter(
          (_l) => _l[0] === i
        );
        var tks = await api.canister(c.canister).getTokens();
        tks = tks.filter(
          (_tk) => _tk[0] === i
        );
        getFullToken(tks, listings, transactions);

        if (transactions.length > sales.length) {
          var volume = 0;
          var data = [];
          setSales(transactions);
          transactions.forEach(t => {
            volume += Number(_showListingPrice(t.price));
            data.push(JSON.parse('{"date":"' + _showDate(t.time) + '","price":' + _showListingPrice(t.price) + ',"averagePrice":' + (volume / (transactions.indexOf(t) + 1)) + '}'));
          });
          setChartData(data);
        }
        props.loader(false);
      } catch(e) {

      };
  };

  const getFullToken = (tks, ls, trxs) => {
    var tk = tks[0];
    ls.forEach(_l => {
      tk.push(_l);
    });
    trxs.forEach(_t => {
      if (typeof tk[2] === 'undefined') {
        tk.push([]);
      }
      if (typeof tk[3] === 'undefined') {
        tk.push([]);
      }
      tk[3].push(_t);
    });
    if (typeof tk[2] === 'undefined') {
      tk.push([]);
    }
    if (typeof tk[3] === 'undefined') {
      tk.push([]);
    }
    setToken(tk);
  };

  const getCollection = c => {
    return _c.find(e => e.canister === c);
  };

  const _showListingPrice = (n) => {
    n = Number(n) / 100000000;
    return n.toFixed(8).replace(/0{1,6}$/, "");
  };

  const _showDate = (t) => {
    return new Date(Number(t/1000000n)).toLocaleDateString();
  };

  const styles = {
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

  const nftImg = () => {
    if (collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return (
        "https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/" +
        tokenId
      );
    if (collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return (
        "https://d3ttm-qaaaa-aaaai-qam4a-cai.raw.ic0.app?tokenId=" +
        tokenId
      );
    if (collection.canister === "q6hjz-kyaaa-aaaah-qcama-cai")
      return icpbunnyimg(tokenId)
    return (
      "https://" +
      collection.canister +
      ".raw.ic0.app/?cc=0&type=thumbnail&tokenid=" +
      tokenId
    );
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

  React.useEffect(() => {
    initToken(queryParams.get('tokenid'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token === false) {
    return (
      <>
      {props.loader(true)}
      </>
    );
  }

  return (
    <>
    <Grid style={{fontWeight:"bold"}} container spacing={1}>
      <img
        alt={tokenId}
        style={{
          ...styles.avatarImg,
          display: imgLoaded ? "block" : "none",
          position : "relative",
          width: "20%",
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
        {(getNri(collection.canister, index) * 100).toFixed(1)}%
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
        { token[2].length !== 0 ? (
          <>
          Price :
          </>
        ) : token[3].length !== 0 ? (
          <>
            Last Price :
          </>
          ) : ("")
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
        { token[2].length !== 0 ? (
          <>
          {_showListingPrice(token[2][1].price)} ICP
          </>
        ) : token[3].length !== 0 ? (
          <>
            {_showListingPrice(token[3][token[3].length-1].price)} ICP
          </>
          ) : ("")
        }
      </Typography>
    </div>
    <div style={{ marginTop: "40px"}}>
    {collection.canister === "e3izy-jiaaa-aaaah-qacbq-cai" ? (
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
              <Grid item xs={6}><strong>Background</strong><br />{backgrounds_details[genes.visual.background.dominant-1]} ({backgrounds_details[genes.visual.background.recessive-1]})</Grid>
              <Grid item xs={6}><strong>Pattern</strong><br />{patterns_details[genes.visual.pattern.dominant-1]} ({patterns_details[genes.visual.pattern.recessive-1]})</Grid>
              <Grid item xs={6}><strong>Face</strong><br />{faces_details[genes.visual.face.dominant-1]} ({faces_details[genes.visual.face.recessive-1]})</Grid>
              <Grid item xs={6}><strong>Eyes</strong><br />{eyes_details[genes.visual.eyes.dominant-1]} ({eyes_details[genes.visual.eyes.recessive-1]})</Grid>
            </Grid>
            <br/>
            <Typography><strong>Color</strong></Typography>
            <br/>
            <Grid style={{textAlign:"center"}} container spacing={1}>
              <Grid item xs={6}><strong>Background</strong><br />{colors[colors_details[0][genes.color.background.dominant-1]]} ({colors[colors_details[0][genes.color.background.recessive-1]]})</Grid>
              <Grid item xs={6}><strong>Pattern</strong><br />{colors[colors_details[1][genes.color.pattern.dominant-1]]} ({colors[colors_details[1][genes.color.pattern.recessive-1]]})</Grid>
              <Grid item xs={6}><strong>Face</strong><br />{colors[colors_details[2][genes.color.face.dominant-1]]} ({colors[colors_details[2][genes.color.face.recessive-1]]})</Grid>
              <Grid item xs={6}><strong>Eyes</strong><br />{colors[colors_details[0][genes.color.eyes.dominant-1]]} ({colors[colors_details[0][genes.color.eyes.recessive-1]]})</Grid>
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>) : ("")
    }
    {typeof collection.data !== 'undefined' ? (
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <Typography><strong>Properties</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{display : "flex", flexDirection : "column", width: "100%"}}>
            <Grid style={{textAlign:"center"}} container spacing={1}>
              {collection.data.characteristics.map((characteristic, i) => {
                return (
                  <Grid item xs={4}>
                    <strong>{characteristic}</strong>
                    <br />
                    {collection.data.values[i][collection.data.tokens[token[0]][i]]}
                    <br />
                    <Typography variant="body2" color="textSecondary" component="p">
                    {Math.round(collection.data.counts[i][collection.data.tokens[token[0]][i]] / collection.data.supply * 100 * 100) / 100 }% have this trait
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
    </>
  );
}
