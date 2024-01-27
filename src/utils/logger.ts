import Error from "next/error";

/**
 * Logger to print statment on console
 */
const LOGGER = {
  info: (msg: string) => {
    console.info(msg);
  },
  error: (msg: string, err: any) => {
    console.error(msg, err);
  },
};

export default LOGGER;
