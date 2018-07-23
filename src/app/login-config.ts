import {AuthServiceConfig, FacebookLoginProvider} from 'angular-6-social-login-v2';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('2169742296374057')
        }
      ]
  );
  return config;
}
