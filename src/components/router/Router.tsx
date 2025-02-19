import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "../page-layout/PageLayout";
import BoostsBage from "../../pages/boosts/BoostsPage";
import FriendList from "../../pages/friend-list/FriendList";
import FriendsPage from "../../pages/friends/FriendsPage";
import MainPage from "../../pages/main/MainPage";
import VideosPage from "../../pages/videos/VideosPage";
import WorkInProgressPage from "../../pages/work-in-progress/WorkInProgressPage";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import UserInfoStore from "../../stores/UserInfoStore";
import RootPage from "../root/RootPage.tsx";
import BuyingBoost from "../../pages/boosts/buying";
import BuyBoostExchange from "../../pages/boosts/exchange";
import ExchangeVariants from "../../pages/boosts/exchange/variants";
import BuyBoostMarket from "../../pages/boosts/market";
import WaysOfMining from "../../pages/ways-mining";
import Detector from "../../pages/ways-mining/detector";
import History from "../../pages/history";
import RegistrationFace from "../../pages/register/RegistrationFace.tsx";

const Router = () => {
  const [, initData] = useInitData();

  useEffect(() => {
    const store = new UserInfoStore(initData!);
    store.fetchAll();
  }, [initData]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: "/", element: <RootPage /> },
        {
          element: <PageLayout />,
          children: [
            { path: "/main", element: <MainPage /> },
            { path: "/history", element: <History /> },
            { path: "/groups", element: <WorkInProgressPage /> },
            { path: "/wallet", element: <WorkInProgressPage /> },
            { path: "/friends", element: <FriendsPage /> },
            { path: "/friends/list", element: <FriendList /> },
            { path: "/boosts", element: <BoostsBage /> },
            { path: "/videos", element: <VideosPage /> },
            { path: "/boosts/buy", element: <BuyingBoost /> },
            { path: "/boosts/exchange", element: <BuyBoostExchange /> },
            { path: "/boosts/exchange/variants", element: <ExchangeVariants /> },
            { path: "/boosts/market", element: <BuyBoostMarket /> },
            { path: "/mining-ways", element: <WaysOfMining /> },
            { path: "/mining-ways/detector", element: <Detector /> },
            { path: "/register/face", element: <RegistrationFace /> }
          ]
        }
      ]),
    []
  );
  return <RouterProvider router={router} />;
};

export default Router;
