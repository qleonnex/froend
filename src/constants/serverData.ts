export const SERVER_DATA = {
  baseUrl: "https://bot.bazoom.ru",
  exchangePath: "/exchange_api",
  basePath: "/api",
  getBaseUrl(path: "exchange" | "base", ...rest: string[]) {
    const pathCondition = path === "base" ? this.basePath : this.exchangePath;
    return this.baseUrl + pathCondition + rest.join("");
  }
}