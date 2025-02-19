import { getRequestToken } from "../../../services/TokenService.ts";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGetRequestToken() {
  const [_, initData] = useInitData();
  
  const { mutate } = useMutation({
    mutationKey: ["request-token"],
    mutationFn: async (initData: string) => {
      return await getRequestToken(initData)
    },
    onSuccess: async (data) => {
      console.log("@data", data);
    }
  })
  
  useEffect(() => {
    if (!initData) return;
    mutate(initData)
  }, [initData])
}