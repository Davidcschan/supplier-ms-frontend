const getServer = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return "http://localhost:4000";
    case "production":
      return "http://localhost:4000";
    default:
      return "http://localhost:4000";
  }
};

export const server = getServer();
