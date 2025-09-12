
import rdf from "../assets/images/IconWaste/RDF.png";
import general from "../assets/images/IconWaste/General Waste.png";
import plastic from "../assets/images/IconWaste/Plastic Bottle.png";
import glass from "../assets/images/IconWaste/Glass-Can-Metal-Aluminium.png";
import hazardous from "../assets/images/IconWaste/Hazardous Waste.png";

import redBin from "../assets/images/Bin/rdf.png"
import generalBin from "../assets/images/Bin/general.png";
import plasticBin from "../assets/images/Bin/plastic.png";
import glassBin from "../assets/images/Bin/glass.png";
import hazardousBin from "../assets/images/Bin/hazardous-waste.png";

export interface WasteType {
  image: string;
  binImage: string;
  bgColor: string;
  textColor: string;
  iconColor?: string;
  description: string;
}

export type WasteCategory =
  | "ขยะกำพร้า"
  | "ขยะทั่วไป"
  | "ขวดพลาสติก"
  | "แก้ว โลหะ อะลูมิเนียม"
  | "ขยะอันตราย"
  

export const wasteMap: Record<string, WasteType> = {
  "ขยะกำพร้า": {
    image: rdf,
    binImage: redBin,
    bgColor: "#838383",
    textColor: "#FEEFE9",
    iconColor: "#A2ABB5",
    description: "Refused Derived Fuel (RDF)",
  },
  "ขยะทั่วไป": {
    image: general,
    binImage: generalBin,
    bgColor: "#235B90",
    textColor: "#FEEFE9",
    iconColor: "#235B90",
    description: "General Waste",
  },
  "ขวดพลาสติก": {
    image: plastic,
    binImage: plasticBin,
    bgColor: "#F6B31E",
    textColor: "#000000",
    iconColor: "#F5BE0C",
    description: "Plastic Bottle",
  },
  "แก้ว โลหะ อะลูมิเนียม": {
    image: glass,
    binImage: glassBin,
    bgColor: "#F6B31E",
    textColor: "#000000",
    iconColor: "#F5BE0C",
    description: "Glass / Can / Metal / Aluminium",
  },
  "ขยะอันตราย": {
    image: hazardous,
    binImage: hazardousBin,
    bgColor: "#E32526",
    textColor: "#FEEFE9",
    iconColor: "#E32526",
    description: "Hazardous Waste",
  },
};
