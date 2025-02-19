import { useInitData, useShowPopup } from "@vkruglikov/react-telegram-web-app";
import FaceDetector, { IdentificationState } from "../../../components/face-detector/FaceDetector";
import { useCallback, useEffect, useRef, useState } from "react";
import { submitPhoto } from "../../../services/PhotoService";
import { useTranslation } from "react-i18next";
import BalanceStatus from "../../../components/balanceStatus";
// import { useSearchParams } from "react-router-dom";
import { useStore } from "../../../components/store-provider/StoreProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import MiningPanel from "./MiningPanel.tsx";

const Detector = () => {
  const [isDetectingEnabled, setDetectingEnabled] = useState(true);
  const [, initData] = useInitData();
  const { t } = useTranslation();
  const { userStore } = useStore();
  const [streamReady, setStreamReady] = useState(false);
  const streamRef = useRef<MediaStream>();
  const showPopup = useShowPopup();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const detectFace = (JSON.parse(searchParams.get("face")!) as boolean);


  const updateBalance = useCallback(() => {
    userStore.fetchProfileInfo();
  }, []);

  useEffect(() => {
    updateBalance();
  }, [updateBalance]);

  const onFaceDetect = useCallback(
    async (photo: string) => {
      const res = await submitPhoto(initData!, photo, detectFace);
      if (res) {
        updateBalance();
        setTimeout(() => {
          setDetectingEnabled(false);
          setTimeout(() => {
            setDetectingEnabled(true);
          }, 4000);
        }, 7000);
      }
      return res;
    },
    [initData, updateBalance]
  );


  useEffect(() => {
    navigator.mediaDevices;
    const st = navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 300 },
          height: { ideal: 300 },
          facingMode: detectFace
            ? "user"
            : "environment"
        }
      })
      .then((stream) => {
        streamRef.current = stream;
        setStreamReady(true);
        return stream;
      })
      .catch(() => {
        if (window.location.pathname !== "/register")
          showPopup({
            message: t("pages.main.scannerStates.cameraIsNotAllowed"),
            buttons: [{ text: t("pages.main.scannerStates.inviteFriend") }]
          }).then(() => navigate("/friends"));
        else
          showPopup({
            message: t("pages.register.cameraIsNotAllowedReg")
          }).then(() => window.location.reload());
        return undefined;
      });
    return () => {
      st.then((s) => s?.getTracks().forEach((t) => t.stop()));
    };
  }, []);


  function textForState(identificationState: IdentificationState) {
    switch (identificationState) {
      case IdentificationState.POSITIONING:
        return t("pages.main.scannerStates.positioning");
      case IdentificationState.PENDING:
        return t("pages.main.scannerStates.pending");
      case IdentificationState.SUCCESS:
        // updateBalance();
        return t("pages.main.scannerStates.success");
      case IdentificationState.ERROR:
        return t("pages.main.scannerStates.error");
    }
  }

  function textForStateUnverified(
    identificationState: IdentificationState
  ): string {
    switch (identificationState) {
      case IdentificationState.POSITIONING:
        return t("pages.main.scannerStates.positioningWithout");
      case IdentificationState.PENDING:
        return t("pages.main.scannerStates.pendingWithout");
      case IdentificationState.SUCCESS:
        // updateBalance();
        return t("pages.main.scannerStates.successWithout");
      case IdentificationState.ERROR:
        return t("pages.main.scannerStates.errorWithout");
    }
  }


  return (
    <section>
      <div className="max-container !mt-[20px]">
        {isDetectingEnabled && streamReady ? (
          <FaceDetector
            tryProcessFaceData={onFaceDetect}
            textForState={detectFace ? textForState : textForStateUnverified}
            detectFace={detectFace}
            externalStream={streamRef.current}
          />) : <MiningPanel />}
        <BalanceStatus store={userStore} />
      </div>
    </section>
  );
};

export default Detector;