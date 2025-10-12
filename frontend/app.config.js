module.exports = ({ config }) => {
    const KEY = process.env.GOOGLE_MAPS_API_KEY || "";
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        ["react-native-maps", { config: { googleMapsApiKey: KEY } }],
      ],
      extra: {
        ...(config.extra || {}),
        GOOGLE_MAPS_API_KEY: KEY,
      },
    };
  };