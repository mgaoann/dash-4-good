import 'dotenv/config';
console.log('CONFIG sees key len:', (process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '').length);

export default {
  expo: {
    ios: { config: { googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY } },
    android: { config: { googleMaps: { apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY } } },
    extra: { GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY },
  },
};
