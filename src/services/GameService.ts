import { SERVER_DATA } from "../constants/serverData.ts";

const basePath = (path: string) => SERVER_DATA.getBaseUrl("base", "/dice", path);

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

