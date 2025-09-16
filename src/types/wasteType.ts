
import rdf from "../assets/images/IconWaste/RDF.png";
import general from "../assets/images/IconWaste/General Waste.png";
import plastic from "../assets/images/IconWaste/Plastic Bottle.png";
import glass from "../assets/images/IconWaste/Glass-Can-Metal-Aluminium.png";
import hazardous from "../assets/images/IconWaste/Hazardous Waste.png";

import rdfBin from "../assets/images/Bin/rdf.png"
import generalBin from "../assets/images/Bin/general.png";
import plasticBin from "../assets/images/Bin/plastic.png";
import glassBin from "../assets/images/Bin/glass.png";
import hazardousBin from "../assets/images/Bin/hazardous-waste.png";

import rdfThSound from "../assets/sound/11-ขยะกำพร้า.mp3"
import rdfEnSound from "../assets/sound/6-RefusedDer.mp3"

import generalThSound from "../assets/sound/12-ขยะทั่วไป.mp3"
import generalEnSound from "../assets/sound/7-GeneralWas.mp3"

import plasticThSound from "../assets/sound/13-ขวดพลาสติก.mp3"
import plasticEnSound from "../assets/sound/8-PlasticBot.mp3"

import glassThSound from "../assets/sound/13-ขวดพลาสติก.mp3"
import glassEnSound from "../assets/sound/9-GlassCan.mp3"

import hazardousThSound from "../assets/sound/14-ขยะอันตราย.mp3"
import hazardousEnSound from "../assets/sound/10-HazardousW.mp3"

export interface WasteType {
  image: string;
  binImage: string;
  bgColor: string;
  textColor: string;
  iconColor?: string;
  description: string;
  soundTh?: string;
  soundEn?: string;
}

export type WasteCategory =
  | "ขยะกำพร้า"
  | "ขยะทั่วไป"
  | "ขวดพลาสติก"
  | "ขวดแก้ว กระป๋อง โลหะ อะลูมิเนียม"
  | "ขยะอันตราย"
  

export const wasteMap: Record<string, WasteType> = {
  "ขยะกำพร้า": {
    image: rdf,
    binImage: rdfBin,
    bgColor: "#838383",
    textColor: "#FEEFE9",
    iconColor: "#A2ABB5",
    description: "Refused Derived Fuel (RDF)",
    soundTh: rdfThSound,
    soundEn: rdfEnSound,
  },
  "ขยะทั่วไป": {
    image: general,
    binImage: generalBin,
    bgColor: "#235B90",
    textColor: "#FEEFE9",
    iconColor: "#235B90",
    description: "General Waste",
    soundTh: generalThSound,
    soundEn: generalEnSound,
  },
  "ขวดพลาสติก": {
    image: plastic,
    binImage: plasticBin,
    bgColor: "#F6B31E",
    textColor: "#000000",
    iconColor: "#F5BE0C",
    description: "Plastic Bottle",
    soundTh: plasticThSound,
    soundEn: plasticEnSound,
  },
  "ขวดแก้ว กระป๋อง โลหะ อะลูมิเนียม": {
    image: glass,
    binImage: glassBin,
    bgColor: "#F6B31E",
    textColor: "#000000",
    iconColor: "#F5BE0C",
    description: "Glass / Can / Metal / Aluminium",
    soundTh: glassThSound,
    soundEn: glassEnSound,
  },
  "ขยะอันตราย": {
    image: hazardous,
    binImage: hazardousBin,
    bgColor: "#E32526",
    textColor: "#FEEFE9",
    iconColor: "#E32526",
    description: "Hazardous Waste",
    soundTh: hazardousThSound,
    soundEn: hazardousEnSound,
  },
};