import {
  useInitData,
  WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import Router from "../router/Router";
import StoreProvider from "../store-provider/StoreProvider";

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

const Main = () => {
  const [initDataUnsafe] = useInitData();
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = initDataUnsafe?.user?.language_code;
    if (lang) i18n.changeLanguage(lang);
    else i18n.changeLanguage("en");
  }, [initDataUnsafe]);

  return (
    <I18nextProvider i18n={i18next}>
      <WebAppProvider>
        <StoreProvider>
          <Router />
        </StoreProvider>
      </WebAppProvider>
    </I18nextProvider>
  );
};

export default Main;
