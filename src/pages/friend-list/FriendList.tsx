import { UserLevel } from "../../components/user-profile/UserProfile";
import FriendStats from "./FriendStats";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useStore } from "../../components/store-provider/StoreProvider";

interface FriendStats {
  name: string;
  userLevel: UserLevel;
  income: number;
  profilePhoto: string;
}

const ReferaButton = observer(() => {
  const { userStore } = useStore();
  const { t } = useTranslation();
  return (
    <button
      className="taxi-gradient h-12 w-full rounded-xl text-center text-xs font-semibold text-white active:bg-darkgray active:bg-none"
      onClick={() => navigator.clipboard.writeText(userStore.referalLink)}
    >
      {t("pages.friends.copyLink")}
    </button>
  );
});

const ReferalItemsList = observer(() => {
  const { t } = useTranslation();
  const { friendStore } = useStore();
  return (
    <>
      {friendStore.items.length > 0 ? (
        friendStore.items.map((e, idx) => (
          <FriendStats
            key={idx}
            name={e.name}
            userLevel={UserLevel.Novice}
            income={e.earned}
            userId={e.id}
          />
        ))
      ) : (
        <>
          <p className="text-center text-white">
            {t("pages.friendList.empty")} :(
          </p>
          <ReferaButton />
        </>
      )}
    </>
  );
});

const FriendList = observer(() => {
  const { t } = useTranslation();
  const observerTarget = useRef(null);
  const { friendStore } = useStore();

  useEffect(() => {
    if (friendStore.loading || !friendStore.hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("triggered");
          friendStore.fetchNewItems();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [friendStore]);

  return (
    <div className="w-screen p-4 pt-2.5">
      <div className="w-full rounded-xl bg-deepgray p-4">
        <div className="border-b-[0.5px] border-darkgray">
          <p className="mb-4 w-max rounded-full bg-[#896CFE] pb-1 pl-2 pr-2 pt-1 text-[14px] font-normal leading-[143%] text-white">
            {t("pages.friendList.invitedFriends")}
          </p>
        </div>
        <div className="flex flex-col space-y-6 pt-5">
          <ReferalItemsList />
        </div>
        <div ref={observerTarget}></div>
      </div>
    </div>
  );
});

export default FriendList;
