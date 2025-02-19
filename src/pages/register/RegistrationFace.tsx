import { useCallback, useEffect, useRef, useState } from "react";
import FaceDetector, { IdentificationState } from "../../components/face-detector/FaceDetector";
import { updateVerificationPhoto } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useInitData, useShowPopup } from "@vkruglikov/react-telegram-web-app";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function textForState(identificationState: IdentificationState) {
  switch (identificationState) {
    case IdentificationState.POSITIONING:
      return i18next.t("pages.registration.scannerStates.positioning");
    case IdentificationState.PENDING:
      return i18next.t("pages.registration.scannerStates.pending");
    case IdentificationState.SUCCESS:
      return i18next.t("pages.registration.scannerStates.success");
    case IdentificationState.ERROR:
      return i18next.t("pages.registration.scannerStates.error");
  }
}

function RegistrationFace() {
  const [, initData] = useInitData();
  const navigate = useNavigate();
  const register = useCallback(
    async (photo: string) => {
      if (initData) {
        const res = (await updateVerificationPhoto(initData, photo)) !== null;
        setTimeout(() => navigate("/mining-ways/detector?face=true"), 7000);
        return res;
      } else return false;
    },
    [initData]
  );

  const showPopup = useShowPopup();
  const streamRef = useRef<MediaStream>();
  const [streamReady, setStreamReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    navigator.mediaDevices;
    const st = navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 300 },
          height: { ideal: 300 },
          facingMode: "user"
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

  return (
    <div className="mt-4 flex w-full flex-col items-center pt-10">
      {streamReady ? (
        <FaceDetector
          tryProcessFaceData={register}
          externalStream={streamRef.current}
          textForState={textForState}
          detectFace
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default RegistrationFace;
