import gift from "./assets/gift.png";
import taxiIcon from "../../assets/taxi-icon.png";
import FriendsCounter from "./FriendsCounter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../services/UIService";
import UserInfoStore from "../../stores/UserInfoStore";
import { observer } from "mobx-react-lite";
import { useStore } from "../../components/store-provider/StoreProvider";

interface FriendsPageProps {
  store: UserInfoStore;
}

const CopyLinkButton = observer(({ store }: FriendsPageProps) => {
  const { t } = useTranslation();
  return (
    <button
      className="taxi-gradient h-12 w-full rounded-xl text-center text-xs font-semibold text-white active:bg-darkgray active:bg-none"
      onClick={() => navigator.clipboard.writeText(store.referalLink)}
    >
      {t("pages.friends.copyLink")}
    </button>
  );
});

const PremiumCount = observer(({ store }: FriendsPageProps) => {
  const { t } = useTranslation();
  return (
    <FriendsCounter
      count={store.referalStats.premium_count}
      name={t("pages.friends.friendsInvited.premium")}
    />
  );
});

const BasicCount = observer(({ store }: FriendsPageProps) => {
  const { t } = useTranslation();
  return (
    <FriendsCounter
      count={store.referalStats.basic_count}
      name={t("pages.friends.friendsInvited.basic")}
    />
  );
});

const EarnedTokensText = observer(({ store }: FriendsPageProps) => {
  return (
    <p className="text-sm font-bold text-white">
      {formatNumber(store.referalStats.earned_tokens)}
    </p>
  );
});

const FriendsPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { userStore } = useStore();

  useEffect(() => {
    userStore.fetchReferalStats();
  }, []);

  return (
    <div className="flex w-screen flex-col items-center space-y-3 p-4 pt-3">
      <div className="flex flex-col items-center space-y-3 rounded-[15px] bg-dimgray p-4">
        <img src={gift} className="mb-1 h-20 w-20" />
        <p className="text-left text-[20px] font-extrabold leading-6 text-white">
          {t("pages.friends.inviteText.part1")}{" "}
          <img
            src={taxiIcon}
            className="mb-[4.5px] inline-block h-5 w-5 rounded-full"
          />{" "}
          {t("pages.friends.inviteText.part2")}
        </p>
        <p className="text-sm font-normal">
          {t("pages.friends.inviteText.part3")}
        </p>
        <CopyLinkButton store={userStore} />
      </div>
      <div
        className="flex h-[90px] w-full flex-row items-center justify-between rounded-[15px] bg-dimgray p-4"
        onClick={() => navigate("/friends/list")}
      >
        <p className="min-w-[102px] text-balance font-semibold text-white">
          {t("pages.friends.friendsInvited.1")} <br />
          {t("pages.friends.friendsInvited.2")}:
        </p>
        <div className="flex w-[190px] flex-row items-center justify-end space-x-3 mobile-s:w-[145px]">
          <PremiumCount store={userStore} />
          <BasicCount store={userStore} />
        </div>
      </div>

      <div className="flex h-[90px] w-full flex-row items-center justify-between rounded-[15px] bg-dimgray p-4">
        <p className="min-w-[83px] text-balance font-semibold text-white">
          {t("pages.friends.friendsBonus.1")} <br />
          {t("pages.friends.friendsBonus.2")}:
        </p>
        <div className="flex h-[61px] min-w-[190px] flex-row items-center justify-center space-x-2 rounded-[10px] bg-black mobile-s:min-w-[145px]">
          <EarnedTokensText store={userStore} />
          <img src={taxiIcon} className="inline-block h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
