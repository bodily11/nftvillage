import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import TextField  from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Drawer from '@material-ui/core/Drawer';
import Collapse from "@material-ui/core/Collapse";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import InputLabel from "@material-ui/core/InputLabel";
import { Grid, makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import getGenes from "./CronicStats.js";
import cronics from "../ic/Cronics.js";
import extjs from "../ic/extjs.js";
import getNri from "../ic/nftv.js";
import { styled, useTheme } from "@material-ui/core/styles";
import Listing from "./Listing";
import Avatar from '@material-ui/core/Avatar';
import Sold from "./Sold";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import collections from '../ic/collections.js';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PropTypes from 'prop-types';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const api = extjs.connect("https://boundary.ic0.app/");
const perPage = 60;
const drawerWidth = 0;//300;

const _getRandomBytes = () => {
  var bs = [];
  for (var i = 0; i < 32; i++) {
    bs.push(Math.floor(Math.random() * 256));
  }
  return bs;
};
const _showListingPrice = (n) => {
  n = Number(n) / 100000000;
  return n.toFixed(8).replace(/0{1,6}$/, "");
};

const emptyListing = {
  pricing: "",
  img: "",
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
  overflow: 'scroll',
  maxHeight: '500px'
}));

export default function Listings(props) {
  const params = useParams();
  const classes = useStyles();
  const [stats, setStats] = React.useState(false);
  const [listings, setListings] = useState(false);
  const [allListings, setAllListings] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [tokens, setTokens] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("mint_number");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [characteristicsFilters, setCharacteristicsFilters] = useState([]);
  const [registry, setRegistry] = useState([]);
  const [healthDominantValue, setHealthDominantValue] = React.useState([0, 63]);
  const [healthRecessiveValue, setHealthRecessiveValue] = React.useState([0, 63]);
  const [speedDominantValue, setSpeedDominantValue] = React.useState([0, 63]);
  const [speedRecessiveValue, setSpeedRecessiveValue] = React.useState([0, 63]);
  const [attackDominantValue, setAttackDominantValue] = React.useState([0, 63]);
  const [attackRecessiveValue, setAttackRecessiveValue] = React.useState([0, 63]);
  const [rangeDominantValue, setRangeDominantValue] = React.useState([0, 63]);
  const [rangeRecessiveValue, setRangeRecessiveValue] = React.useState([0, 63]);
  const [magicDominantValue, setMagicDominantValue] = React.useState([0, 63]);
  const [magicRecessiveValue, setMagicRecessiveValue] = React.useState([0, 63]);
  const [defenseDominantValue, setDefenseDominantValue] = React.useState([0, 63]);
  const [defenseRecessiveValue, setDefenseRecessiveValue] = React.useState([0, 63]);
  const [resistanceDominantValue, setResistanceDominantValue] = React.useState([0, 63]);
  const [resistanceRecessiveValue, setResistanceRecessiveValue] = React.useState([0, 63]);
  const [basicDominantValue, setBasicDominantValue] = React.useState([0, 63]);
  const [basicRecessiveValue, setBasicRecessiveValue] = React.useState([0, 63]);
  const [specialDominantValue, setSpecialDominantValue] = React.useState([0, 63]);
  const [specialRecessiveValue, setSpecialRecessiveValue] = React.useState([0, 63]);
  const [baseDominantValue, setBaseDominantValue] = React.useState([0, 63]);
  const [baseRecessiveValue, setBaseRecessiveValue] = React.useState([0, 63]);
  const [showing, setShowing] = useState("all");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMint, setMinMint] = useState("");
  const [maxMint, setMaxMint] = useState("");
  const [minNri, setMinNri] = useState("");
  const [maxNri, setMaxNri] = useState("");
  const [counts, setCounts] = useState([]);
  const [wearableFilter, setWearableFilter] = useState("all");
  //const [collection, setCollection] = useState('nbg4r-saaaa-aaaah-qap7a-cai');
  const [collection, setCollection] = useState(collections.find(e => e.route === params?.route));
  const [listingDialogOpen, setListingDialogOpen] = useState(false);
  const history = useHistory();

  const changeWearableFilter = async (event) => {
    setPage(1);
    setWearableFilter(event.target.value);
  };
  useEffect(() => {
    if (props.collection) _changeCollection(props.collection);
  }, [props.collection]);
  React.useEffect(() => {
    _changeCollection(collections.find(e => e.route === params?.route));
  }, [params.route]);

  const _changeCollection = async c => {
    setWearableFilter("all");
    setSort("mint_number");
    setShowing("all");
    setCollection(c);
    setListings(false);
    setTransactions(false);
    setPage(1);
    await refresh("all", c.canister);
  };
  const changeSort = (event) => {
    setPage(1);
    setSort(event.target.value);
  };

  const changeListingDialogOpen = (dialogOpen) => {
    setListingDialogOpen(dialogOpen);
  };

  const handleHealthDominantValueChange = (event, newHealthDominantValue) => {
    setHealthDominantValue(newHealthDominantValue);
  };

  const handleHealthRecessiveValueChange = (event, newHealthRecessiveValue) => {
    setHealthRecessiveValue(newHealthRecessiveValue);
  };

  const handleSpeedDominantValueChange = (event, newSpeedDominantValue) => {
    setSpeedDominantValue(newSpeedDominantValue);
  };

  const handleSpeedRecessiveValueChange = (event, newSpeedRecessiveValue) => {
    setSpeedRecessiveValue(newSpeedRecessiveValue);
  };

  const handleAttackDominantValueChange = (event, newAttackDominantValue) => {
    setAttackDominantValue(newAttackDominantValue);
  };

  const handleAttackRecessiveValueChange = (event, newAttackRecessiveValue) => {
    setAttackRecessiveValue(newAttackRecessiveValue);
  };

  const handleRangeDominantValueChange = (event, newRangeDominantValue) => {
    setRangeDominantValue(newRangeDominantValue);
  };

  const handleRangeRecessiveValueChange = (event, newRangeRecessiveValue) => {
    setRangeRecessiveValue(newRangeRecessiveValue);
  };

  const handleMagicDominantValueChange = (event, newMagicDominantValue) => {
    setMagicDominantValue(newMagicDominantValue);
  };

  const handleMagicRecessiveValueChange = (event, newMagicRecessiveValue) => {
    setMagicRecessiveValue(newMagicRecessiveValue);
  };

  const handleDefenseDominantValueChange = (event, newDefenseDominantValue) => {
    setDefenseDominantValue(newDefenseDominantValue);
  };

  const handleDefenseRecessiveValueChange = (event, newDefenseRecessiveValue) => {
    setDefenseRecessiveValue(newDefenseRecessiveValue);
  };

  const handleResistanceDominantValueChange = (event, newResistanceDominantValue) => {
    setResistanceDominantValue(newResistanceDominantValue);
  };

  const handleResistanceRecessiveValueChange = (event, newResistanceRecessiveValue) => {
    setResistanceRecessiveValue(newResistanceRecessiveValue);
  };

  const handleBasicDominantValueChange = (event, newBasicDominantValue) => {
    setBasicDominantValue(newBasicDominantValue);
  };

  const handleBasicRecessiveValueChange = (event, newBasicRecessiveValue) => {
    setBasicRecessiveValue(newBasicRecessiveValue);
  };

  const handleSpecialDominantValueChange = (event, newSpecialDominantValue) => {
    setSpecialDominantValue(newSpecialDominantValue);
  };

  const handleSpecialRecessiveValueChange = (event, newSpecialRecessiveValue) => {
    setSpecialRecessiveValue(newSpecialRecessiveValue);
  };

  const handleBaseDominantValueChange = (event, newBaseDominantValue) => {
    setBaseDominantValue(newBaseDominantValue);
  };

  const handleBaseRecessiveValueChange = (event, newBaseRecessiveValue) => {
    setBaseRecessiveValue(newBaseRecessiveValue);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleMinMintChange = (event) => {
    setMinMint(event.target.value);
  };

  const handleMaxMintChange = (event) => {
    setMaxMint(event.target.value);
  };

  const handleMinNriChange = (event) => {
    setMinNri(event.target.value);
  };

  const handleMaxNriChange = (event) => {
    setMaxNri(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFiltersChange = async () => {
    props.loader(true);
    await refresh(showing, collection.canister);
    props.loader(false);
  };

  const handleFiltersReset = async () => {
    props.loader(true);
    setCharacteristicsFilters([]);
    await refresh(showing, collection.canister);
    props.loader(false);
  };

  const handleCheckboxChange = async (e, i, j) => {
    props.loader(true);
    var length;
    if (collection.data) {
      length = collection.data.characteristics.length;
    } else {
      length = 8;
    }
    if (characteristicsFilters.length === 0) {
      for (var k = 0; k < length; k++) {
        characteristicsFilters.push([]);
      }
    }
    if (e.target.checked) {
      characteristicsFilters[i].push(j);
    } else {
      for (var l = 0; l < characteristicsFilters[i].length; l++) {
        if (characteristicsFilters[i][l] === j) {
          characteristicsFilters[i].splice(l,1);
        }
      }
    }
    await refresh(showing, collection.canister);
    props.loader(false);
  };

  const mintNumber = (a) => {
    if (collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return a[0];
    if (collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return a[0];
    if (collection.canister === "q6hjz-kyaaa-aaaah-qcama-cai")
      return a[0];
    else return a[0] + 1;
  };

  const indexNumber = (a) => {
    if (collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai")
      return a[0] - 1;
    if (collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai")
      return a[0] - 1;
    else return a[0];
  };

  const applyAdvancedFilters = (a, s) => {
    a = a.filter(
      (_a) => {
        var result = true;
        for (var i = 0; i < characteristicsFilters.length; i++) {
          if (collection.canister === "e3izy-jiaaa-aaaah-qacbq-cai") {
            var genes = _a[1].nonfungible ? getGenes(_a[1].nonfungible.metadata[0]) : getGenes(_a[2].nonfungible.metadata[0]);
            if (i === 0) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.visual.background.dominant-1);
            }
            else if (i === 1) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.visual.pattern.dominant-1);
            }
            else if (i === 2) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.visual.face.dominant-1);
            }
            else if (i === 3) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(cronics.eyes_details[genes.visual.eyes.dominant-1]);
            }
            else if (i === 4) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.color.background.dominant-1);
            }
            else if (i === 5) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.color.pattern.dominant-1);
            }
            else if (i === 6) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.color.face.dominant-1);
            }
            else if (i === 7) {
              result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(genes.color.eyes.dominant-1);
            }
          } else {
            result = characteristicsFilters[i].length === 0 ? true : characteristicsFilters[i].includes(collection.data.tokens[indexNumber(_a)][i]);
          }
          if (!result) { break; }
        }
        if (!result) {
          return false;
        }
        var price = null;
        if (_a.length > 3) {
          price = getTokenPrice(_a);
        } else {
          price = _a[1].price;
        }
        if (minPrice !== "" && (price === null || Number(price) / 100000000 < Number(minPrice))
        || maxPrice !== "" && (price === null || Number(price) / 100000000 > Number(maxPrice))) {
          return false;
        }
        if (address !== "" && ( typeof registry[registry.findIndex(r => r[0] === _a[0])] === 'undefined' || address !== registry[registry.findIndex(r => r[0] === _a[0])][1])) {
          return false;
        }
        else if (minMint !== "" && mintNumber(_a) < Number(minMint)
        || maxMint !== "" && mintNumber(_a) > Number(maxMint)) {
          return false;
        } else if (minNri !== "" && Number(getNri(collection?.canister, _a[0])) * 100 < Number(minNri)
        || maxNri !== "" && Number(getNri(collection?.canister, _a[0])) * 100 > Number(maxNri)) {
          return false;
        }
        return result;
            }
          );
      if (counts.length > 0) {
        for (var i = 0; i < counts.length; i++) {
          counts[i] =[];
          for (var j = 0; j < collection.data.values[i].length; j++) {
            counts[i][j] = 0;
          }
        }
        a.forEach(_a => {
          for (var tk in collection.data.tokens[indexNumber(_a)]) {
            counts[tk][collection.data.tokens[indexNumber(_a)][tk]] = counts[tk][collection.data.tokens[indexNumber(_a)][tk]] + 1;
          }
        });
      }
      if(collection.canister === "e3izy-jiaaa-aaaah-qacbq-cai") {
        var nonfungibleIndex = 1;
        if (a.length > 0 && typeof a[0][2].nonfungible !== 'undefined') {
          nonfungibleIndex = 2;
        }
        return a.filter(
        (_a) => healthDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.health.dominant
                && healthDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.health.dominant
                && healthRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.health.recessive
                && healthRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.health.recessive
                && speedDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.speed.dominant
                && speedDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.speed.dominant
                && speedRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.speed.recessive
                && speedRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.speed.recessive
                && attackDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.attack.dominant
                && attackDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.attack.dominant
                && attackRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.attack.recessive
                && attackRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.attack.recessive
                && rangeDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.range.dominant
                && rangeDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.range.dominant
                && rangeRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.range.recessive
                && rangeRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.range.recessive
                && magicDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.magic.dominant
                && magicDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.magic.dominant
                && magicRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.magic.recessive
                && magicRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.magic.recessive
                && defenseDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.defense.dominant
                && defenseDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.defense.dominant
                && defenseRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.defense.recessive
                && defenseRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.defense.recessive
                && resistanceDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.resistance.dominant
                && resistanceDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.resistance.dominant
                && resistanceRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.resistance.recessive
                && resistanceRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.resistance.recessive
                && basicDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.basic.dominant
                && basicDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.basic.dominant
                && basicRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.basic.recessive
                && basicRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.basic.recessive
                && specialDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.special.dominant
                && specialDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.special.dominant
                && specialRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.special.recessive
                && specialRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.special.recessive
                && baseDominantValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.base.dominant
                && baseDominantValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.base.dominant
                && baseRecessiveValue[0] <= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.base.recessive
                && baseRecessiveValue[1] >= getGenes(_a[nonfungibleIndex].nonfungible.metadata[0]).battle.base.recessive
              )
          }
        return a;
  };

  const changeShowing = async (event) => {
    props.loader(true);
    setWearableFilter("all");
    setPage(1);
    setShowing(event.target.value);
    if (event.target.value === "all" || event.target.value === "current") {
      setSort("mint_number");
    } else {
      setSort("recent");
    }
    await refresh(event.target.value);
    props.loader(false);
  };

  const applyFilters = (a, s, c) => {
    if (
      c === "tde7l-3qaaa-aaaah-qansa-cai" &&
      wearableFilter !== "all"
    ) {
      var map = ["accessories", "hats", "eyewear", "pets"];
      a = a.filter(
        (_a) => map[_a[2].nonfungible.metadata[0][0]] === wearableFilter
      );
    } else if (s !== "sold") {
      a = applyAdvancedFilters(a, s);
    }
    return a;
  };
  const _isCanister = c => {
    return c.length == 27 && c.split("-").length == 5;
  };
  const getAllTokens = (tks, ls, trxs, s, c) => {
    var length;
    if (collection.data) {
      length = collection.data.tokens.length;
    } else {
      length = tks.length;
    }
    var allTks = new Array(length);;
    tks.forEach(_tk => {
      allTks[_tk[0]] = _tk;
    });
    if (collection.canister === "bxdf4-baaaa-aaaah-qaruq-cai" || collection.canister === "3db6u-aiaaa-aaaah-qbjbq-cai"){
      for (var i = 1; i <= length; i++) {
        if (typeof allTks[i] === 'undefined') {
          allTks[i] = [i, tks[0][1]];
        }
      }
    } else {
      for (var i = 0; i < length; i++) {
        if (typeof allTks[i] === 'undefined') {
          allTks[i] = [i, tks[0][1]];
        }
      }
    }
    tks = allTks;
    ls.forEach(_l => {
      tks[_l[0]].push(_l);
    });
    trxs.forEach(_t => {
      var tokenid = extjs.decodeTokenId(_t.token).index;
      if (typeof tks[tokenid][2] === 'undefined') {
        tks[tokenid].push([]);
      }
      if (typeof tks[tokenid][3] === 'undefined') {
        tks[tokenid].push([]);
      }
      tks[tokenid][3].push(_t);
    });
    tks.forEach(tk => {
      if (typeof tk[2] === 'undefined') {
        tk.push([]);
      }
      if (typeof tk[3] === 'undefined') {
        tk.push([]);
      }
    });

    setTokens(applyFilters(tks, s, c));
  };

  const getTokenPrice = (tk) => {
    if (tk[2].length > 0) {
      return tk[2][1].price;
    } else if (tk[3].length > 0) {
      return tk[3][tk[3].length-1].price;
    } else return null;
  } ;
  const refresh = async (s, c) => {
      s = s ?? showing;
      c = c ?? collection?.canister;
      if (!_isCanister(c)) return setListings([]);
      if (!collection.market) return setListings([]);
      if (collection.data) {
        setCounts(collection.data.counts);
      }
      try {
        var r = await api.token(collection.canister).stats();
        setStats(r);
      } catch (e) {
        setStats(null);
      };
      try {
        var transactions = await api.canister(c).transactions();
        if (s === "sold") {
          var nt = transactions;
          if (c === "e3izy-jiaaa-aaaah-qacbq-cai") {
            nt = transactions.slice(82);
          }
          setTransactions(nt);
        } else {
          if (c === "e3izy-jiaaa-aaaah-qacbq-cai") {
            transactions = transactions.slice(82)
          }
          setTransactions(transactions);
          var listings = await api.canister(c).listings();
          setAllListings(listings);
          listings = applyFilters(listings, s, c);
          setListings(listings);
          var rgtry = await api.canister(c).getRegistry();
          setRegistry(rgtry);
          if (s === "all") {
            var tks = await api.canister(c).getTokens();
            getAllTokens(tks, listings, transactions, s, c);
          }
        }
      } catch(e) {
        console.log(e);
      };
  };
  const theme = useTheme();
  const styles = {
    empty: {
      maxWidth: 1200,
      margin: "0 auto",
      textAlign: "center",
    },
    details: {
      textAlign: "center",
      paddingBottom:50,
      marginBottom:50,
    },
    grid: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  };

  /*React.useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wearableFilter]);*/
  return (//maxWidth:1200, margin:"0 auto",
    <div style={{ display: "flex"}}>
    {_isCanister(collection.canister) && collection.market && showing !== "sold" && typeof collection.data !== 'undefined' && counts.length > 0 ? (
      <div style={{ width: "25%" }}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography><strong>Constraints</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "block"}}>
              <div>
                <strong>Address:</strong>
                <div>
                  <TextField style={{ width: "100%"}} value={address} onChange={handleAddressChange} label="Address" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>Price:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 0} }} value={minPrice} onChange={handleMinPriceChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 0} }} value={maxPrice} onChange={handleMaxPriceChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>Minting #:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 1, max: 10000} }} value={minMint} onChange={handleMinMintChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 1, max: 10000} }} value={maxMint} onChange={handleMaxMintChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>NRI:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 0, max: 100} }} value={minNri} onChange={handleMinNriChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 0, max: 100} }} value={maxNri} onChange={handleMaxNriChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ display: "flex", "align-items": "center", "justify-content": "center", background: "white" }}>
                <Button variant="contained"
                color="primary"
                style={{ marginTop: "30px", marginBottom: "20px", backgroundColor: "#003240", color: "white" }}
                  onClick={handleFiltersChange}>
                  Apply
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        {collection.data.characteristics.map((characteristic, i) => {
          return (
            <Accordion>
              <AccordionSummary>
                <Typography><strong>{characteristic}</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup row={true}>
                  {collection.data.values[i].map((value, j) => {
                  if (counts[i][j]) {
                    return (
                      <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[i] !== 'undefined' && characteristicsFilters[i].includes(j)} onChange={(e) => handleCheckboxChange(e, i, j)} />} label={value + " [" + counts[i][j] + "]"} />
                      );
                  }
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    ) : (
      ""
    )}
    {_isCanister(collection.canister) && collection.market && showing !== "sold" && ["e3izy-jiaaa-aaaah-qacbq-cai"].indexOf(collection?.canister) >= 0 ? (
      <div style={{ width: "25%" }}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography><strong>Constraints</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "block"}}>
              <div>
                <strong>Address:</strong>
                <div>
                  <TextField style={{ width: "100%"}} value={address} onChange={handleAddressChange} label="Address" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>Price:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 0} }} value={minPrice} onChange={handleMinPriceChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 0} }} value={maxPrice} onChange={handleMaxPriceChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>Minting #:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 1, max: 10000} }} value={minMint} onChange={handleMinMintChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 1, max: 10000} }} value={maxMint} onChange={handleMaxMintChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                <strong>NRI:</strong>
                <div style={{ display: "flex"}}>
                  <TextField style={{ width: "40%"}} InputProps={{ inputProps: { min: 0, max: 100} }} value={minNri} onChange={handleMinNriChange} label="Min" type="number" variant="standard" />
                  <TextField style={{ width: "40%", marginLeft: 40}} InputProps={{ inputProps: { min: 0, max: 100} }} value={maxNri} onChange={handleMaxNriChange} type="number" label="Max" variant="standard" />
                </div>
              </div>
              <div style={{ display: "flex", "align-items": "center", "justify-content": "center", background: "white" }}>
                <Button variant="contained"
                color="primary"
                style={{ marginTop: "30px", marginBottom: "20px", backgroundColor: "#003240", color: "white" }}
                  onClick={handleFiltersChange}>
                  Apply
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Background</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.backgrounds_details.map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[0] !== 'undefined' && characteristicsFilters[0].includes(j)} onChange={(e) => handleCheckboxChange(e, 0, j)} />} label={value} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Pattern</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.patterns_details.map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[1] !== 'undefined' && characteristicsFilters[1].includes(j)} onChange={(e) => handleCheckboxChange(e, 1, j)} />} label={value} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Face</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.faces_details.map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[2] !== 'undefined' && characteristicsFilters[2].includes(j)} onChange={(e) => handleCheckboxChange(e, 2, j)} />} label={value} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Eyes</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.eyes_details.map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[3] !== 'undefined' && characteristicsFilters[3].includes(j)} onChange={(e) => handleCheckboxChange(e, 3, j)} />} label={value} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Background Color</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.colors_details[0].map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[4] !== 'undefined' && characteristicsFilters[4].includes(j)} onChange={(e) => handleCheckboxChange(e, 4, j)} />} label={cronics.colors[cronics.colors_details[0][j]]} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Pattern Color</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.colors_details[1].map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[5] !== 'undefined' && characteristicsFilters[5].includes(j)} onChange={(e) => handleCheckboxChange(e, 5, j)} />} label={cronics.colors[cronics.colors_details[1][j]]} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Face Color</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.colors_details[2].map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[6] !== 'undefined' && characteristicsFilters[6].includes(j)} onChange={(e) => handleCheckboxChange(e, 6, j)} />} label={cronics.colors[cronics.colors_details[2][j]]} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography><strong>Eyes Color</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup row={true}>
              {cronics.colors_details[0].map((value, j) => {
              return (
                <FormControlLabel control={<Checkbox defaultChecked={typeof characteristicsFilters[7] !== 'undefined' && characteristicsFilters[7].includes(j)} onChange={(e) => handleCheckboxChange(e, 7, j)} />} label={cronics.colors[cronics.colors_details[0][j]]} />
                );
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    ) : (
      ""
    )}
      <div style={{marginLeft:drawerWidth, paddingBottom:100, width: "75%"}}>
        {_isCanister(collection.canister) && collection.market ?
        <div style={{marginLeft: "20px", backgroundColor: "white"}}>
          <div className={classes.filters} style={{marginLeft: "20px"}}>
          <FormControl style={{ marginRight: 20, marginTop: "20px" }}>
            <InputLabel>Showing</InputLabel>
            <Select value={showing} onChange={changeShowing}>
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"current"}>Current Listings</MenuItem>
              {/*<MenuItem value={"sold"}>Sold Listings</MenuItem>*/}
            </Select>
          </FormControl>

          <FormControl style={{ marginRight: 20, marginTop: "20px" }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sort} onChange={changeSort}>
              {/*showing === "all" ? <MenuItem value={"recent"}>Recently Listed</MenuItem> : ""*/}
              {showing === "sold" ? (
                <MenuItem value={"recent"}>Recently Sold</MenuItem>
              ) : (
                ""
              )}
              <MenuItem value={"mint_number"}>Minting #</MenuItem>
              {collection?.nftv ? (
                <MenuItem value={"gri"}>NFT Rarity Index</MenuItem>
              ) : (
                ""
              )}
              <MenuItem value={"price_asc"}>Price: Low to High</MenuItem>
              <MenuItem value={"price_desc"}>Price: High to Low</MenuItem>
              {/*<MenuItem value={"newest"}>Newest</MenuItem>*/}
              {showing !== "sold" &&
              [
                "e3izy-jiaaa-aaaah-qacbq-cai",
                "nbg4r-saaaa-aaaah-qap7a-cai",
              ].indexOf(collection?.canister) >= 0 ? (
                <MenuItem value={"type"}>Rare Type</MenuItem>
              ) : (
                ""
              )}
              {/*showing === "all" ? <MenuItem value={"oldest"}>Oldest</MenuItem> : ""*/}
              {showing === "sold" ? (
                <MenuItem value={"oldest"}>Oldest</MenuItem>
              ) : (
                ""
              )}
            </Select>
          </FormControl>
          {showing !== "sold" &&
          ["e3izy-jiaaa-aaaah-qacbq-cai"].indexOf(collection?.canister) >= 0 ? (
            <div style={{ display: "inline" }}>
              <Button style={{ marginTop: "10px" }}
                variant={"outlined"}
                onClick={() => setCollapseOpen(!collapseOpen)}
                aria-expanded={collapseOpen}>
                Advanced Filters
              </Button>
            </div>
          ) : (
            ""
          )}
          {showing !== "sold" &&
          ["e3izy-jiaaa-aaaah-qacbq-cai"].indexOf(collection?.canister) >= 0 ? (
            <div style={{ marginTop: "20px" }}>
              <Collapse in={collapseOpen}>
                <form style={{ "flex-flow": "row wrap", display: "flex" }}>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Base:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={baseDominantValue}
                        onChange={handleBaseDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={baseRecessiveValue}
                        onChange={handleBaseRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Health:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={healthDominantValue}
                        onChange={handleHealthDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={healthRecessiveValue}
                        onChange={handleHealthRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Speed:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={speedDominantValue}
                        onChange={handleSpeedDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={speedRecessiveValue}
                        onChange={handleSpeedRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Attack:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={attackDominantValue}
                        onChange={handleAttackDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={attackRecessiveValue}
                        onChange={handleAttackRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Range:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={rangeDominantValue}
                        onChange={handleRangeDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={rangeRecessiveValue}
                        onChange={handleRangeRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Magic:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={magicDominantValue}
                        onChange={handleMagicDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={magicRecessiveValue}
                        onChange={handleMagicRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Defense:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={defenseDominantValue}
                        onChange={handleDefenseDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={defenseRecessiveValue}
                        onChange={handleDefenseRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                  <div style={{ marginTop: "20px", marginLeft: "30px" }}>
                    <InputLabel style={{fontWeight:"bold"}}>Resistance:</InputLabel>
                    <br/>
                    <InputLabel>Dominant:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={resistanceDominantValue}
                        onChange={handleResistanceDominantValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                    <InputLabel>Recessive:</InputLabel>
                    <Box sx={{ width: 150 }}>
                      <Slider
                        value={resistanceRecessiveValue}
                        onChange={handleResistanceRecessiveValueChange}
                        min={0}
                        step={1}
                        max={63}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </div>
                </form>
                <div style={{ marginTop: "20px", display: "grid" }}>
                  <Button variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#003240", color: "white", margin: "auto" }}
                    onClick={handleFiltersChange}>
                    Apply
                  </Button>
                </div>
              </Collapse>
            </div>
          ) : (
            ""
          )}
          {showing !== "sold" &&
          ["tde7l-3qaaa-aaaah-qansa-cai"].indexOf(collection?.canister) >= 0 ? (
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Wearable Type</InputLabel>
              <Select value={wearableFilter} onChange={changeWearableFilter}>
                <MenuItem value={"all"}>All Wearables</MenuItem>
                <MenuItem value={"pets"}>Pets</MenuItem>
                <MenuItem value={"accessories"}>Accessories/Flags</MenuItem>
                <MenuItem value={"hats"}>Hats/Hair</MenuItem>
                <MenuItem value={"eyewear"}>Eyewear</MenuItem>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {showing === "all" ? (
            tokens.length > perPage ? (
              <Pagination
                className={classes.pagi}
                size="small"
                count={Math.ceil(tokens.length / perPage)}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            ) : (
              ""
            )
          ) : showing === "current" ? (
            listings.length > perPage ? (
              <Pagination
                className={classes.pagi}
                size="small"
                count={Math.ceil(listings.length / perPage)}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            ) : (
              ""
            )
          ) : transactions.length > perPage ? (
            <Pagination
              className={classes.pagi}
              size="small"
              count={Math.ceil(transactions.length / perPage)}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          ) : (
            ""
          )}
        </div>
        {showing === "all" ? (
          <>
            {tokens === false ? (
              <div style={styles.empty}>
                <Typography
                  paragraph
                  style={{ paddingTop: 20, fontWeight: "bold" }}
                  align="center"
                >
                  Loading...
                </Typography>
                <CircularProgress color="inherit" />
              </div>
            ) : (
                  <>
                    <div style={styles.grid}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {tokens
                          .slice()
                          .sort((a, b) => {
                            switch (sort) {
                              case "price_asc":
                                return getTokenPrice(a) === getTokenPrice(b) ? 0 : getTokenPrice(a) === null ? 1 : getTokenPrice(b) === null ? -1 : Number(getTokenPrice(a)) - Number(getTokenPrice(b));
                              case "price_desc":
                                return getTokenPrice(a) === getTokenPrice(b) ? 0 : getTokenPrice(a) === null ? 1 : getTokenPrice(b) === null ? -1 : Number(getTokenPrice(b)) - Number(getTokenPrice(a));
                              case "gri":
                                return (
                                  Number(getNri(collection?.canister, b[0])) * 100 -
                                  Number(getNri(collection?.canister, a[0])) * 100
                                );
                              case "mint_number":
                                return a[0] - b[0];
                              case "type":
                                var _a, _b, d;
                                if (
                                  collection?.canister === "nbg4r-saaaa-aaaah-qap7a-cai"
                                ) {
                                  _a = a[1].nonfungible.metadata[0][0];
                                  _b = b[1].nonfungible.metadata[0][0];
                                  d = _b - _a;
                                  if (d === 0) {
                                    return getTokenPrice(a) === getTokenPrice(b) ? 0 : getTokenPrice(a) === null ? 1 : getTokenPrice(b) === null ? -1 : Number(getTokenPrice(a)) - Number(getTokenPrice(b));
                                  }
                                  return d;
                                } else {
                                  _a = a[1].nonfungible.metadata[0][30] % 41;
                                  _b = b[1].nonfungible.metadata[0][30] % 41;
                                  if (_a === 2) _a = 1;
                                  if (_a > 1) _a = 2;
                                  if (_b === 2) _b = 1;
                                  if (_b > 1) _b = 2;
                                  d = _a - _b;
                                  if (d === 0) {
                                    return getTokenPrice(a) === getTokenPrice(b) ? 0 : getTokenPrice(a) === null ? 1 : getTokenPrice(b) === null ? -1 : Number(getTokenPrice(a)) - Number(getTokenPrice(b));
                                  }
                                  return d;
                                }
                              default:
                                return 0;
                            }
                          })
                          .filter(
                            (token, i) =>
                              i >= (page - 1) * perPage && i < page * perPage
                          )
                          .map((listing, i) => {
                            return (
                              <Listing
                                gri={getNri(collection?.canister, listing[0])}
                                collection={collection}
                                key={listing[0] + "-" + i}
                                listing={listing}
                                showing={showing}
                                transactions={transactions}
                                onListingDialogChange={changeListingDialogOpen}
                              />
                            );
                          })}
                      </Grid>
                    </div>
              </>
            )}
          </>
        ) : showing === "current" ? (
          <>
            {listings === false ? (
              <div style={styles.empty}>
                <Typography
                  paragraph
                  style={{ paddingTop: 20, fontWeight: "bold" }}
                  align="center"
                >
                  Loading...
                </Typography>
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <>
                {listings.length === 0 ? (
                  <div style={styles.empty}>
                    <Typography
                      paragraph
                      style={{ paddingTop: 20, fontWeight: "bold" }}
                      align="center"
                    >
                      There are currently no listings right now
                    </Typography>
                  </div>
                ) : (
                  <>
                    <div style={styles.grid}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {listings
                          .slice()
                          .sort((a, b) => {
                            switch (sort) {
                              case "price_asc":
                                return Number(a[1].price) - Number(b[1].price);
                              case "price_desc":
                                return Number(b[1].price) - Number(a[1].price);
                              case "gri":
                                return (
                                  Number(getNri(collection?.canister, b[0])) * 100 -
                                  Number(getNri(collection?.canister, a[0])) * 100
                                );
                              case "recent":
                                return 1;
                              case "oldest":
                                return -1;
                              case "mint_number":
                                return a[0] - b[0];
                              case "type":
                                var _a, _b, d;
                                if (
                                  collection?.canister === "nbg4r-saaaa-aaaah-qap7a-cai"
                                ) {
                                  _a = a[2].nonfungible.metadata[0][0];
                                  _b = b[2].nonfungible.metadata[0][0];
                                  d = _b - _a;
                                  if (d === 0) {
                                    if (Number(a[1].price) > Number(b[1].price))
                                      return 1;
                                    if (Number(a[1].price) < Number(b[1].price))
                                      return -1;
                                  }
                                  return d;
                                } else {
                                  _a = a[2].nonfungible.metadata[0][30] % 41;
                                  _b = b[2].nonfungible.metadata[0][30] % 41;
                                  if (_a === 2) _a = 1;
                                  if (_a > 1) _a = 2;
                                  if (_b === 2) _b = 1;
                                  if (_b > 1) _b = 2;
                                  d = _a - _b;
                                  if (d === 0) {
                                    if (Number(a[1].price) > Number(b[1].price))
                                      return 1;
                                    if (Number(a[1].price) < Number(b[1].price))
                                      return -1;
                                  }
                                  return d;
                                }
                              default:
                                return 0;
                            }
                          })
                          .filter(
                            (token, i) =>
                              i >= (page - 1) * perPage && i < page * perPage
                          )
                          .map((listing, i) => {
                            return (
                              <Listing
                                gri={getNri(collection?.canister, listing[0])}
                                collection={collection}
                                key={listing[0] + "-" + i}
                                listing={listing}
                                showing={showing}
                                transactions={transactions}
                                onListingDialogChange={changeListingDialogOpen}
                              />
                            );
                          })}
                      </Grid>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {transactions === false ? (
              <div style={styles.empty}>
                <Typography
                  paragraph
                  style={{ paddingTop: 20, fontWeight: "bold" }}
                  align="center"
                >
                  Loading...
                </Typography>
              </div>
            ) : (
              <>
                {transactions.length === 0 ? (
                  <div style={styles.empty}>
                    <Typography
                      paragraph
                      style={{ paddingTop: 20, fontWeight: "bold" }}
                      align="center"
                    >
                      There are currently no sold transactions for this
                      collection
                    </Typography>
                  </div>
                ) : (
                  <>
                    <div style={styles.grid}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {transactions
                          .slice()
                          .sort((a, b) => {
                            switch (sort) {
                              case "price_asc":
                                return Number(a.price) - Number(b.price);
                              case "price_desc":
                                return Number(b.price) - Number(a.price);
                              case "gri":
                                return (
                                  Number(
                                    getNri(
                                      collection?.canister,
                                      extjs.decodeTokenId(b.token).index
                                    )
                                  ) *
                                    100 -
                                  Number(
                                    getNri(
                                      collection?.canister,
                                      extjs.decodeTokenId(a.token).index
                                    )
                                  ) *
                                    100
                                );
                              case "recent":
                                return -1;
                              case "oldest":
                                return 1;
                              case "mint_number":
                                return (
                                  extjs.decodeTokenId(a.token).index -
                                  extjs.decodeTokenId(b.token).index
                                );
                              default:
                                return 0;
                            }
                          })
                          .filter(
                            (token, i) =>
                              i >= (page - 1) * perPage && i < page * perPage
                          )
                          .map((transaction, i) => {
                            return (
                              <Sold
                                gri={getNri(
                                  collection?.canister,
                                  extjs.decodeTokenId(transaction.token).index
                                )}
                                key={transaction.token + i}
                                collection={collection?.canister}
                                transaction={transaction}
                              />
                            );
                          })}
                      </Grid>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {showing === "all" ? (
          tokens.length > perPage ? (
            <Pagination
              className={classes.pagi}
              size="small"
              count={Math.ceil(tokens.length / perPage)}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          ) : (
            ""
          )
        ) : showing === "current" ? (
          listings.length > perPage ? (
            <Pagination
              className={classes.pagi}
              size="small"
              count={Math.ceil(listings.length / perPage)}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          ) : (
            ""
          )
        ) : transactions.length > perPage ? (
          <Pagination
            className={classes.pagi}
            size="small"
            count={Math.ceil(transactions.length / perPage)}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        ) : (
          ""
        )}
      </div> : ""}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  socials: {
    padding:0,
    listStyle: "none",
    "& li" : {
      display:"inline-block",
      margin:"0 10px",
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1
  },
  filters: {
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
    },
  },
  stats: {
    marginTop:-70,
    minHeight:81,
    [theme.breakpoints.down("xs")]: {
      marginTop:0,
    },
  },
  pagi: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
    float: "right",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
}));
