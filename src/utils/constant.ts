export const BASE_URL = process.env.BASE_URL;
export const BASE_URL_CLIENT = 'http://localhost'
export const CRISPY_READ_CORE_BASE_URL = 'http://localhost'
export const POST_PER_PAGE = 6;
export const POST_PER_PAGE_HOME_PAGE = 12;
export const categoryList = [
  "News",
  "Entertainment",
  "Coding",
  "Sports",
  "Automobile",
  "Technology",
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

export const blogTitleAndDescription = {
  news: {
    title:
      "Latest News, Breaking News and Political News | Crispy Read",
    description:
      "Explore the latest updates and breaking news in Bollywood, sports, business, and politics. Stay informed with our comprehensive coverage of current affairs on CrispyRead",
  },
  entertainment: {
    title: "Latest News on Bollywood, Hollywood, and Television | Crispy Read",
    description:
      "Dive into the latest buzz in Bollywood, Hollywood, and television. Stay in the know with our real-time updates on the entertainment world. 🎬🌟 #EntertainmentNews",
  },
  coding: {
    title: "Learn Data Structure and Web Development | Crispy Read",
    description:
      "Mastering Data Structures and Web Development. A Comprehensive Guide to Boost Your Programming and Development Skills at Crispy Read",
  },
  sports: {
    title: "Latest Sport News, Videos and Updates | Crispy Read",
    description:
      "Explore the Latest in Sports - Breaking News, Highlight Videos, and Real-time Updates for Every Enthusiast! Get Daily Update on IPL, Olympics and other worldwide sporting events",
  },
  automobile: {
    title: "Get latest news on Automobile and  Electric Vehicle | Crispy Read",
    description: "Get latest news on Automobile and  Electric Vehicle at Crispy Read",
  },
  finance: {
    title:
      "Latest Business News India, Latest Finance News | Crispy Read",
    description:
      "Find here latest business news and finance news, share market updates, live stock market news, IPO update, banking and insurance sector updates. Check out for business news today in india, and live BSE/NSE stock price updates",
  },
};
