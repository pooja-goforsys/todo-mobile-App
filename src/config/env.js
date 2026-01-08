import Config from 'react-native-config';

export const ENV = {
  APP_NAME: Config.APP_NAME,
  API_BASE_URL: Config.API_BASE_URL,
  TIMEOUT: Number(Config.TIMEOUT),
  DEBUG: Config.DEBUG === 'true',
};
