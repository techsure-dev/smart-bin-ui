import MainPage from "../pages/main";
import ScanPage from "../pages/scan";
import PredictionPage from "../pages/prediction";
import SelectWastePage from "../pages/select-waste";
import OptionPage from "../pages/option";
import ScorePage from "../pages/score";

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/scan",
    element: <ScanPage />,
  },
  {
    path: "/prediction",
    element: <PredictionPage />,
  },
  {
    path: "/select-waste",
    element: <SelectWastePage />,
  },
  {
    path: "/option",
    element: <OptionPage />,
  },
  {
    path: "/score",
    element: <ScorePage />,
  },
];

export default routes;
