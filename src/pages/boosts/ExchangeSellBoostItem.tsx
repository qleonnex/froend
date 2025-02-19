import { useNavigate } from "react-router-dom";
import taxiIcon from "../../assets/taxi-icon.png";
import OptionalButton from "../../components/optional-button/OptionalButton";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../services/UIService.ts";
import taxiTaxiIcon from "../../assets/taxitaxi.jpeg";
import questionIcon from "./assets/question.svg";
import { useState } from "react";

interface BoostItemProps {
  header: string;
  description: string;
  price: string;
  link: string;
  active?: boolean;
  image?: string;
  orderLeft: number;
  ordersAboveLeft: number;
}

interface PopupProps {
  show: boolean;
  onClose: () => void;
  orderLeft: number;
  ordersAboveLeft: number;
}

const Popup = ({ show, onClose, orderLeft, ordersAboveLeft }: PopupProps) => {
  const { t } = useTranslation();
  return show ? (
    <>
      <div
        className="absolute left-0 top-0 z-30 min-h-screen w-screen overflow-hidden bg-deepgray opacity-80"
        onClick={onClose}
      ></div>
      <div className="absolute left-0 top-0 z-30 flex min-h-screen w-screen justify-center overflow-hidden">
        <div className="mt-[30vh] flex h-max w-[300px] flex-col items-center space-y-3 rounded-xl bg-[#19191a] p-4">
          <div className="text-cente flex w-full items-center justify-between rounded-xl">
            <p className="">{t("pages.boosts.holding.tosell")}</p>
            <div className="flex items-center">
              <p className="">{formatNumber(orderLeft)}</p>
              <img
                src={taxiTaxiIcon}
                className="ml-1 inline h-[15px] w-[15px] rounded-[3px]"
              />
            </div>
          </div>
          <div className="text-cente flex w-full items-center justify-between rounded-xl">
            <p className="">{t("pages.boosts.holding.tillsell")}</p>
            <div className="flex items-center">
              <p className="">{formatNumber(ordersAboveLeft)}</p>
              <img
                src={taxiTaxiIcon}
                className="ml-1 inline h-[15px] w-[15px] rounded-[3px]"
              />
            </div>
          </div>
          <button
            className="h-10 w-full rounded-xl bg-purple text-white"
            onClick={onClose}
          >
            {t("pages.boosts.holding.gotit")}
          </button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

const ExchangeSellBoostItem = ({
  header,
  description,
  price,
  link,
  active,
  image,
  orderLeft,
  ordersAboveLeft,
}: BoostItemProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="border-b-thin flex h-[120px] w-full flex-row items-center pb-3">
      {image ? (
        <img src={image} className="mr-2 h-[120px] w-[120px] rounded-xl" />
      ) : (
        ""
      )}
      <Popup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        orderLeft={orderLeft}
        ordersAboveLeft={ordersAboveLeft}
      />
      <div className="flex h-[120px] w-full flex-col justify-between pl-1 pr-1 text-left text-xs leading-[133%]">
        <div className="flex w-full justify-between">
          <h3 className="font-bold text-white">{header}</h3>
          <div
            className="flex w-max items-center"
            onClick={() => setShowPopup(true)}
          >
            <p>
              {t("pages.boosts.holding.mine")}: {formatNumber(orderLeft)}
            </p>
            <img
              src={taxiTaxiIcon}
              className="ml-1 inline h-[15px] w-[15px] rounded-[3px]"
            />

            <img src={questionIcon} className="ml-1.5 h-[13px] w-[13px]" />
          </div>
        </div>
        <p>{description}</p>
        <div className="flex flex-row items-end justify-between">
          <div className="text-white">
            <img
              src={taxiIcon}
              className="mb-1 mr-1 inline h-[15px] w-[15px] rounded-[3px]"
            />
            {price}
          </div>
          <OptionalButton
            text={t("pages.boosts.goto")}
            onClick={() => navigate(link)}
            active={active}
            className="h-[24px] pb-[4px] pl-[12px] pr-[12px] pt-[4px] text-xs font-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeSellBoostItem;
