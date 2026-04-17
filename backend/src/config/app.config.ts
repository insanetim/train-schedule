export const appConfig = () => ({
  app: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
  },
});
