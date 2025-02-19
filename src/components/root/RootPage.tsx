import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile, registerUser, updateProfile } from "../../services/UserService.ts";
import LoadingScreen from "../loading-screen/LoadingScreen.tsx";


const RootPage = () => {
  const [isExpanded, expand] = useExpand();
  if (!isExpanded) expand();

  const [, initData] = useInitData();
  const [isLoading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Если нет данных Telegram, показываем страницу перенаправления
  useEffect(() => {
    if (!initData) return;

    // Начинаем с 0%
    setLoadingProgress(0);

    // Анимируем до 80% за 5 секунд
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + 2, 80));
    }, 125);

    getProfile(initData).then((res) => {
      if (!res) {
        registerUser(initData).then(() => {
          updateProfile(initData).then(() => {
            // Очищаем интервал
            clearInterval(progressInterval);
            // Анимируем до 100% за 1 секунду
            setLoadingProgress(100);
            setTimeout(() => setLoading(false), 1000);
          });
        });
      } else {
        updateProfile(initData).then(() => {
          // Очищаем интервал
          clearInterval(progressInterval);
          // Анимируем до 100% за 1 секунду
          setLoadingProgress(100);
          setTimeout(() => setLoading(false), 1000);
        });
      }
    });
  }, [initData]);


  return isLoading ? <LoadingScreen progress={loadingProgress} /> : <Navigate to={"/main"} replace />;
};

export default RootPage;
