import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import * as icpuppies from "./ICPuppies.js";
import * as pokedbots from "./PokedBots.js";
import * as starverses from "./Starverses.js";
import * as astronauts from "./Astronauts.js";
import * as bulls from "./Bulls.js";
import * as ivc from "./IVC.js";
import * as icdrips from "./ICDrips.js";
import * as icpunks from "./ICPunks.js";
import * as hamsters from "./Hamsters.js";
import * as ictuts from "./ICTuts.js";
import * as icbunnies from "./ICBunnies.js";

var collections = [
  {
    canister: "bzsui-sqaaa-aaaah-qce2a-cai",
    priority : 98,
    name: "Poked bots",
    brief : "10,000 generated mutant Robots",
    description : "500 years from now humans have left earth and only the Robots remain. Robots have managed to create new identities based on relics they have found from earths past",
    keywords : "pokedstudio robot NFT dfinty icp collectable Solana etherium trade crypto market ",
    banner : "/collections/poked/banner.jpg",
    avatar : "/collections/poked/avatar.jpg",
    collection : "/collections/poked/collection.jpg",
    discord : "https://discord.gg/PokedStudioNFT",
    twitter : "https://twitter.com/pokedstudiouk",
    web : "https://www.pokedstudiobotsnft.co.uk",
    data : pokedbots,
    route: "poked",
    unit : "Bot",
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress: "ace16992dcde53c7c67b396b65924be0e19bed8704a2a68b9cc794d100c3cd17",
    blurb: (<><p>500 years from now humans have long left earth and only the Robots remain. Robots have managed to create new identities often based on relics they have found from earths past. This collection features 5 groups of Robots that exist in the eastern waste lands near former Delta city. The Battle bots, they are tough and are used to hard work, entertainment bots constructed from old video game and junk food toy parts found in the giant rubbish heaps of former Antarctica. Wild bots have become deranged after the giant solar flare of 2453AD. The god class has come to rule much of eastern earth, they have abilities beyond normal bots. The masters are a secret society of robots that have links to the off world colony of Europa base 7.</p></>),
  },
  {
    canister: "dknxi-2iaaa-aaaah-qceuq-cai",
    priority : 92,
    name: "Dfinity Bulls",
    unit : "Bull",
    brief : "8,888 Badass Bulls of the IC",
    description : "The Bulls of the IC -P2E game coming soon",
    keywords : "bulls dfinity GameFi",
    banner : "/collections/bulls/banner.png",
    avatar : "/collections/bulls/avatar.png",
    collection : "/collections/bulls/collection.png",
    discord : "https://discord.gg/GBSNhYeGxh",
    twitter : "https://twitter.com/DBulls_NFT",
    web : "https://twitter.com/DBulls_NFT",
    route: "dfinitybulls",
    data : bulls,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress: "ae5cf8b282013bffd28908f1c4afad389a07e474a02f9a8e48bcc07cc63b05b4",
    blurb: (<><p>8,888 Badass Bulls of the IC . Our NFT is not only just a collectible art but with utility too! We will be coming out with a P2E battle arena game with toniqlabs ! Stay tuned!</p></>),
  },
  {
    canister: "gyuaf-kqaaa-aaaah-qceka-cai",
    priority : 91,
    name: "Infernal Vampire Colony",
    unit : "Vampire",
    brief : "666 Bloodthirsty Infernal Vampires",
    description : "Infernal Vampires had been in the lair for a long time. They finally managed to get out. Time for them to suck some blood!",
    keywords : "Vampire, Vampires, Infernal, Colony, Blood, Bloodthirsty, 666, Lair",
    banner : "/collections/ivc/banner.jpg",
    avatar : "/collections/ivc/avatar.png",
    collection : "/collections/ivc/collection.jpg",
    discord : "https://discord.gg/mA5cXdAtwe",
    twitter : "https://twitter.com/IVCNFT",
    web : "https://www.infernalvampires.com",
    route: "ivc",
    data : ivc,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress: "7243722b9db43a26170b2bbc065b02f5ca2d1836ddaaee5ef05fc043a01f9ed9",
    blurb: (<><p>Infernal Vampires had been in the lair for a long time. They finally managed to get out. Time for them to suck some blood!</p></>),
  },
  /*{
    canister: "oeee4-qaaaa-aaaak-qaaeq-cai",
    priority : 97,
    brief : "10,000 Motokos dropped by DFINITY",
    name: "Motoko Day Drop",
    unit : "Motoko",
    keywords : "",
    banner : "/banner/motoko2.jpg",
    discord : "https://t.co/fD0VHKGaFu?amp=1",
    twitter : "https://twitter.com/pokedstudiouk",
    route: "motoko",
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress: "09b739076e074550862930ca17f662485076a6af60cc1b0e9a1f50b058d767c9",
    blurb: (<><p>On the Motoko programming language's 2nd birthday, the DFINITY Foundation distributed 10,000 Motoko ghosts designed by Jon Ball of Pokedstudios to the community.</p></>),
  },*/
  {
    canister: "e3izy-jiaaa-aaaah-qacbq-cai",
    priority : 100,
    name: "Cronic Critters",
    unit : "Cronic",
    brief : "The first IC NFT by Toniq",
    route: "cronics",
    banner:"https://cronic.toniqlabs.com/banner.png",
    twitter:"https://twitter.com/CronicsP2E",
    telegram:"https://t.me/cronic_talk",
    medium:"https://toniqlabs.medium.com/cronics-breeding-and-supply-604fa374776d",
    keywords : "",
    nftv : true,
    mature: false,
    market : true,
    commission: 0.025,
    comaddress:"c7e461041c0c5800a56b64bb7cefc247abc0bbbb99bd46ff71c64e92d9f5c2f9",
    blurb: (<>Cronics is a Play-to-earn NFT game being developed by ToniqLabs for the Internet Computer. Cronics incorporates breeding mechanics, wearable NFTs and a p2e minigame ecosystem and more.</>),
  },
  {
    canister: "bid2t-gyaaa-aaaah-qcdea-cai",
    priority : 88,
    name: "Haunted Hamsters",
    unit : "Hamster",
    brief : "3333 Haunted Hamsters ready to spook",
    route: "hauntedhamsters",
    banner : "/collections/hh/banner.jpg",
    avatar : "/collections/hh/avatar.jpg",
    collection : "/collections/hh/collection.jpg",
    description : "Haunted Hamsters are 3333 hamsters, who have been haunted on the hill of Hamsterville. They come merged from 10 spooky themed traits, and are now living on the ICP blockchain.",
    keywords : "",
    web : "https://www.hauntedhamsters.io",
    telegram : "https://t.me/joinchat/3KX8XkSEcREzYTMx",
    medium : "https://medium.com/@hauntedhamsters",
    discord : "https://discord.com/invite/rngMQQxa",
    twitter : "https://twitter.com/hauntedhamsters",
    data : hamsters,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress: "35b902472e845179b3d6ad9ff7079fee6bcadb4e0ca870230ba7a79757fa88fb",
    blurb: (<><p>Haunted Hamsters are 3333 hamsters, who have been haunted on the hill of Hamsterville. They come merged from 10 spooky themed traits, and are now living on the ICP blockchain.</p></>),
  },
  {
    canister: "ahl3d-xqaaa-aaaaj-qacca-cai",
    priority : 87,
    name: "ICTuTs",
    unit : "ICTuT",
    brief : "10,000 NFTs based on King TuT",
    route: "ictuts",
    banner : "/banner/ictuts.png",
    keywords : "",
    data : ictuts,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.025,
    comaddress:
      "b53a735c40994ddbc7bb4f6dbfbf9b2c67052842241f1c445f2255bdf4bd8982",
    blurb: false,
  },
  {
    canister: "sr4qi-vaaaa-aaaah-qcaaq-cai",
    priority : 93,
    name: "Internet Astronauts",
    unit : "Astronaut",
    brief : "10,000 Internet Astronauts given to top ICP users",
    description : "Internet Astronauts is a collection of 10,000 collectibles only found on the Internet Computer! Internet Astronauts can have small privileges on various dApps on ICP.",
    route: "interastrosc",
    keywords : "internet astronaut, astronaut nft, iasc, astronaut,",
    banner : "/collections/iasc/banner.jpg",
    avatar : "/collections/iasc/avatar.png",
    collection : "/collections/iasc/collection.jpg",
    discord : "https://discord.gg/cnEafbxb",
    twitter : "https://twitter.com/interastrosc",
    web : "",
    data : astronauts,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress:
      "2be01f5e8f081c6e8784b087fb1a88dac92fdd29203c1e456a6e90950c6e6e21",
    blurb: (<>Internet Astronauts given to top active users of ICP for zero cost.<br /><br/>Various dApps on IC agreed to collab on IASC for future perks. NFT authenticators will lead willing dApps can accept pre-existing NFT's and offer some benefits. However, at this point, IASC is the first of its kind and third-generation NFT set and cannot sure on future so think IASC as collectible art pieces!
</>),
  },
  {
    canister: "nbg4r-saaaa-aaaah-qap7a-cai",
    priority : 99,
    name: "Starverse",
    unit : "Star",
    brief : "The first free NFT airdrop",
    route: "starverse",
    keywords : "",
    data : starverses,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.025,
    comaddress:
      "c7e461041c0c5800a56b64bb7cefc247abc0bbbb99bd46ff71c64e92d9f5c2f9",
    blurb: false,
  },
  {
    canister: "njgly-uaaaa-aaaah-qb6pa-cai",
    priority : 96,
    name: "ICPuppies",
    unit : "ICPuppy",
    brief : "10,000 unique randomly generated 8-bit puppies",
    description : "ICPuppies is a randomly generated 8-bit puppy NFT collection. Half of the initial sale profits will be directed towards charities as well as a portion of all resale volume.",
    route: "icpuppies",
    keywords : "puppies icpuppies nft charity 8-bit pixel dog doge puppy",
    banner : "/collections/icpuppy/banner.jpg",
    avatar : "/collections/icpuppy/avatar.jpg",
    //collection : "/collections/iasc/collection.jpg",
    discord : "https://discord.gg/A3rmDSjBaJ",
    twitter : "https://twitter.com/ICPuppies",
    medium : "https://medium.com/@ICPuppies",
    web : "https://icpuppies.io",
    data : icpuppies,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress:
      "9f76290b181807c5fa3c7cfcfca2525d578a3770f40ae8b14a03a4a3530368e2",
    blurb: (
      <>ICPuppies was created with the idea of being a fun, easy-going collection that's very accessible to all newcomers to the Internet Computer NFT world. We're inspired by the retro 8-bit video game aesthetic as we feel it's appealing to people everywhere.<br /><br />Half of the initial launch profits are directed towards charities and on top of that, a portion of our resale volume goes to our partners at Infinite Charity Project, forever!
</>
    ),
  },
  {
    canister: "bxdf4-baaaa-aaaah-qaruq-cai",
    priority : 95,
    name: "ICPunks",
    unit : "ICPunk",
    brief : "10,000 ICPunks - 2nd NFT on the IC",
    route: "icpunks",
    keywords : "",
    data : icpunks,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.035,
    comaddress:
      "c47942416fa8e7151f679d57a6b2d2e01a92fecd5e6f9ac99f6db548ea4f37aa",
    blurb: (
      <>
        Are you down with the clown? Get your hands on the latest NFT to hit the
        Internet Computer! You can wrap and trade them on the Marketplace!{" "}
        <strong>
          Wrapped ICPunks are 1:1 wrapped versions of actual ICPunks
        </strong>{" "}
        - you can read more about how to wrap, unwrap, and how safe it is{" "}
        <a
          href="https://medium.com/@toniqlabs/wrapped-nfts-8c91fd3a4c1"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </>
    ),
  },
  {
    canister: "3db6u-aiaaa-aaaah-qbjbq-cai",
    priority : 90,
    name: "IC Drip",
    unit : "IC Drip",
    brief : "Drip on the IC",
    route: "icdrip",
    keywords : "",
    data : icdrips,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.025,
    comaddress:
      "c7e461041c0c5800a56b64bb7cefc247abc0bbbb99bd46ff71c64e92d9f5c2f9",
    blurb: (
      <>
        IC Drip are randomly generated meta-commerce shopping carts for outfits
        and personas stored on chain. Stats, images, and other functionality are
        intentionally omitted for others to interpret. Feel free to use IC Drip
        in any way you want.{" "}
        <a
          href="https://dvr6e-lqaaa-aaaai-qam5a-cai.raw.ic0.app/"
          target="_blank"
          rel="noreferrer"
        >
          IC Drip Website
        </a>
      </>
    ),
  },
  /*{
    canister: "k4qsa-4aaaa-aaaah-qbvnq-cai",
    priority : 93,
    name: "Faceted Meninas",
    unit : "NFT",
    brief : "Unique 3D Meninas",
    route: "faceted-meninas",
    keywords : "",
    nftv : false,
    mature: false,
    market : true,
    commission: 0.02,
    comaddress:
      "12692014390fbdbb2f0a1ecd440f02d29962601a782553b45bb1a744f167f13b",
    blurb: (
      <>
        Faceted Meninas is a creature species that holds the power of the
        universe to act as a magic pillar giving their allies the essence of
        outer worlds to maximize their powers.
      </>
    ),
  },*/
  {
    canister: "q6hjz-kyaaa-aaaah-qcama-cai",
    priority : 89,
    name: "ICPBunny",
    unit : "Bunny",
    brief : "10,000 ICBunnies on the IC",
    route: "icpbunny",
    data : icbunnies,
    nftv : true,
    mature: false,
    market : true,
    commission: 0.025,
    comaddress:
      "9f04077bd8ef834f7bcca5177f28fb655a7e68d8f2da9c1e6441c4f567f5dce7",
    blurb: false,
  },

];
export default collections;
