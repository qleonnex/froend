import { useInitData } from "@vkruglikov/react-telegram-web-app";
import taxiIcon from "../../assets/taxi-icon.png";
import { getGameStatus } from "../../services/GameService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../services/UIService";

function GameStatus() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [, initData] = useInitData();
  useEffect(() => {
    getGameStatus(initData!).then((s) => {
      setTotalUsers(s.total_users);
      setTotalBalance(s.total_balance);
    });
  }, []);
  const { t } = useTranslation();
  return (
    <div className="flex h-11 min-w-max flex-col items-end justify-around">
      <p>
        {t("components.gameStatus.players")}: {totalUsers.toLocaleString("de")}
      </p>
      <div className="flex flex-row">
        <img src={taxiIcon} className="small-icon-size mr-1.5 rounded-[3px]" />
        <p>{formatNumber(totalBalance)} $mDICE</p>
      </div>
    </div>
  );
}
export default GameStatus;
