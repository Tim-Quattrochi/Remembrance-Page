import { ENV } from "../utils.js/constants";

/**
 * @description - a helper function to only log errors in development.
 * @param {*} error - The error to log.
 */
export const logError = (error) => {
  if (ENV === "development") {
    console.log(error);
  }
};
