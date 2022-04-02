import { setup } from "axios-cache-adapter";
import { Clockodo } from "../clockodo.js";
import { axiosClient } from "../lib/symbols.js";

/**
 * @deprecated We're planing to move away from axios to fetch()
 */
export const cachePlugin =
  (config: { cacheTime: number }) => (clockodo: Clockodo) => {
    if (typeof config.cacheTime !== "number") {
      throw new Error(
        "Clockodo cacheTime expected to be a number, is typeof: " +
          typeof config.cacheTime
      );
    }
    clockodo.api[axiosClient] = setup({
      baseURL: clockodo.api[axiosClient].defaults.baseURL,
      headers: clockodo.api[axiosClient].defaults.headers,
      cache: {
        maxAge: config.cacheTime,
        exclude: { query: false },
      },
    });
  };