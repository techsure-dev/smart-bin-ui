
import rdf from "../assets/images/rdf.png";
import general from "../assets/images/general_waste.png";
import plastic from "../assets/images/plastic_bottle.png";
import glass from "../assets/images/glass_can.png";
import food from "../assets/images/food_waste.png";

import redBin from "../assets/images/rdf_bin.png"
import generalBin from "../assets/images/general_bin.png";
import plasticBin from "../assets/images/plastic_bin.png";
import glassBin from "../assets/images/glass_bin.png";
import foodBin from "../assets/images/food_bin.png";

export interface WasteType {
  image: string;
  binImage: string;
  bgColor: string;
  textColor: string;
  iconColor?: string;
  description: string;
}

export type WasteCategory =
  | "เชื้อเพลิงขยะ"
  | "ขยะทั่วไป"
  | "ขวดพลาสติก"
  | "แก้ว โลหะ อะลูมิเนียม"
  | "ขยะอาหาร"
  

export const wasteMap: Record<string, WasteType> = {
  "เชื้อเพลิงขยะ": {
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
  "ขยะอาหาร": {
    image: food,
    binImage: foodBin,
    bgColor: "#00712C",
    textColor: "#FEEFE9",
    iconColor: "#00712C",
    description: "Food Waste",
  },
};
