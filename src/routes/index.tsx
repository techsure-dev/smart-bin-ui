import MainPage from "../pages/main";
import ScanPage from "../pages/scan";
import PredictionPage from "../pages/prediction";
import SelectWastePage from "../pages/select-waste";
import OptionPage from "../pages/option";
import ScorePage from "../pages/score";
import LoadingPage from "../pages/loading";
import CorrectPage from "../pages/correct";
import Maintain from "../pages/maintain";

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
  {
    path: "/loading",
    element: <LoadingPage />,
  },
  {
    path: "/correct",
    element: <CorrectPage/>,
  },
  {
    path: "/maintain",
    element: <Maintain/>,
  },
];

export default routes;
