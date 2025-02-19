import { SERVER_DATA } from "../constants/serverData.ts";

export async function getRequestToken(initData: string) {
  const response = await fetch(
    SERVER_DATA.getBaseUrl("exchange", "/request_token", `?initData=${initData}`),
  )
  
  return await response.json();
}