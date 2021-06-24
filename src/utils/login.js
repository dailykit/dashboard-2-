import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    const params = {
      scope: 'openid',
      grant_type: 'password',
      username: email.trim(),
      password: password.trim(),
      client_id: window._env_.KEYCLOAK_CLIENT,
    };
    const searchParams = Object.keys(params)
      .map((key) => {
        const value = encodeURIComponent(params[key]);
        return encodeURIComponent(key) + '=' + value;
      })
      .join('&');

    const response = await axios({
      method: 'POST',
      url: `${window._env_.KEYCLOAK_URL}/realms/accounts/protocol/openid-connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: searchParams,
    });
    if (response.status === 200) {
      console.log('🐱‍🚀 login component after axios');
      localStorage.setItem('token', response.data.access_token);
      const token = jwt_decode(response.data.access_token);
      return token;
    }
    return { '🤷‍♀️': 'status not 200' };
  } catch (error) {
    console.log(`🤦‍♀️ login component after axios-> ${error}`);
    if (error?.message.includes('401')) {
      throw { code: 401, message: 'Email or password is incorrect!' };
    }
  }
};
