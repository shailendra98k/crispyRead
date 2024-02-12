export const BASE_URL = "http://localhost";
export const BASE_URL_CLIENT = process.env.BASE_URL
export const POST_PER_PAGE = 6;
export const categoryList = [
  "News",
  "Entertainment",
  "Education",
  "Sports",
  "Automobile",
  "Food",
];
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const noCacheHeader = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
