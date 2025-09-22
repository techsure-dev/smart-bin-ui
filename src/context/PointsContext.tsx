import { createContext, useContext, useEffect, useState, type ReactNode} from "react";

type ApiResult = {
  item_th: string;
  item_en: string;
  type_th: string;
  type_en: string;
  weight_g: number;
  point_map: string;
};

type PointsContextType = {
  results: ApiResult[];
  addResults: (newResults: ApiResult[]) => void;
  resetResults: () => void;
  totalPoints: number;
  listOfPoints: [string, number][];
};

const pointTable: Record<string, number> = {
  "RDF Waste": 10,
  "Clear PET Bottle (label & cap separated)": 120,
  "Clear PET Bottle (label not removed)": 80,
  "Mixed-color Plastic": 40,
  "Black-and-White Paper": 40,
  "Colored Paper": 10,
  "Steel": 40,
  "Aluminium can": 400,
  "Glass Bottle": 10,
  "Polypropylene - PP (no.5)": 50,
};

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<ApiResult[]>([]);

  const addResults = (newResults: ApiResult[]) => {
    setResults((prev) => [...prev, ...newResults]);
  };

  const resetResults = () => setResults([]);

  const totalPoints = results.reduce((acc, item) => {
    const count = item.weight_g / 100;
    const pointPerUnit = pointTable[item.point_map] || 0;
    return acc + pointPerUnit * count;
  }, 0);

  const listOfPoints: [string, number][] = results.map((item) => {
    const count = item.weight_g / 100;
    return [item.point_map, count] as [string, number];
  });

   useEffect(() => {
    console.log("Current results:", results);
    console.log("Total points:", totalPoints);
    console.log("list Of points:", listOfPoints);
  }, [results, totalPoints]);

  return (
    <PointsContext.Provider
      value={{ results, addResults, resetResults, totalPoints, listOfPoints }}
    >
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) throw new Error("usePoints must be used within PointsProvider");
  return context;
};
