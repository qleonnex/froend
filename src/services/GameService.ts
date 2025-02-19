import { SERVER_DATA } from "../constants/serverData.ts";

const basePath = (path: string) => SERVER_DATA.getBaseUrl("base", "/dice", path);

interface GameStatusContract {
  total_users: number;
  total_balance: number;
}

export async function getGameStatus(initData: string): Promise<GameStatusContract> {
  const resp = await fetch("/api/game/status", {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  return await (resp.json() as Promise<GameStatusContract>);
}

export async function getBalance() {
  const response = await fetch(
    basePath("/balance"),
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
  )
  
  return await response.json();
}