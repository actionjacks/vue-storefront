import { setup } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';
// import { setup as checkoutSetup } from '@vue-storefront/checkout-com';

const CT_TOKEN_COOKIE_NAME = 'vsf-commercetools-token';

export default ({ app }) => {
  const currentToken = app.$cookies.get(CT_TOKEN_COOKIE_NAME);

  const onTokenChange = (token) => {
    try {
      if (!process.server) {
        app.$cookies.set(CT_TOKEN_COOKIE_NAME, token);
        setup({ currentToken: token });
      }
    } catch (e) {
      // Cookies on is set after request has sent.
    }
  };

  const onTokenRemove = () => {
    app.$cookies.remove(CT_TOKEN_COOKIE_NAME);
    setup({ currentToken: null, forceToken: true });
  };

  // checkoutSetup({
  //   publicKey: 'pk_test_8638c4e2-e44a-407f-a5f3-594a8503bcd0'
  // });

  setup({
    ...config,
    locale: app.$cookies.get(config.cookies.localeCookieName) || config.locale,
    currency: app.$cookies.get(config.cookies.currencyCookieName) || config.currency,
    country: app.$cookies.get(config.cookies.countryCookieName) || config.country,
    currentToken,
    auth: {
      onTokenChange,
      onTokenRemove
    }
  });
};
