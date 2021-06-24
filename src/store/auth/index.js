import React from "react";
import jwt_decode from "jwt-decode";
import { useSubscription } from "@apollo/client";
import { useRouter } from "next/router";

const AuthContext = React.createContext();

import * as utils from "../../utils";
import { USER } from "../../graphql";
import { Loader } from "../../components";

const reducers = (state, { type, payload }) => {
  switch (type) {
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: {
          name: "",
          email: "",
          organization: {
            id: "",
            url: "",
          },
        },
        onboard: {
          step: 1,
        },
      };
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          name: `${payload?.firstName || ""} ${payload?.lastName || ""}`,
          ...payload,
        },
        authenticated: true,
      };
    case "CHANGE_STEP":
      return {
        ...state,
        onboard: { ...state.onboard, step: payload },
      };
    default:
      return state;
  }
};

function Redirect({ to }) {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to]);
  return null
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(reducers, {
    authenticated: false,
    user: {
      email: "",
      organization: {
        id: null,
      },
    },
    onboard: {
      step: 1,
    },
  });

  const { loading, data: { admins = [] } = {} } = useSubscription(USER, {
    skip: !state?.user?.email,
    variables: { where: { email: { _eq: state?.user?.email } } },
  });

  React.useEffect(() => {
    if (!loading) {
      if (Array.isArray(admins) && admins.length) {
        const [admin] = admins;
        dispatch({ type: "SET_USER", payload: admin });
        const { onboardStatus: status = "" } = admin.organization;
        if (status) {
          switch (status) {
            case "COMPANY":
              <Redirect to="/signup/company" />
              break;
            case "ABOUT_YOURSELF":
              <Redirect to="/signup/about-yourself" />
              break;
            case "HOSTING":
              <Redirect to="/signup/hosting" />
              break;
            case "SUPPORT":
              <Redirect to="/signup/support" />
              break;
            case "IMPORT":
              <Redirect to="/signup/import" />
              break;
            case "SETUP_DOMAIN":
              <Redirect to="/signup/finish-setup" />
              break;
            case "FINISH_SETUP":
              <Redirect to="/signup/finish-setup" />
              break;
            case "ONBOARDED":
              <Redirect to="/" />
              break;
            default:
              break;
          }
        }
      }
    }
  }, [loading, admins]);

  React.useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const profile = jwt_decode(token);
        if (profile?.email) {
          dispatch({ type: "SET_USER", payload: { email: profile.email } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  function Redirect({ to }) {
    const router = useRouter();
    React.useEffect(() => {
      router.push(to);
    }, [to]);
    return null
  }

  const logout = React.useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    <Redirect to="/login" />
  }, []);

  React.useEffect(() => {
    switch (router.pathname) {
      case "/signup": {
        dispatch({ type: "CHANGE_STEP", payload: 1 });
        break;
      }
      case "/signup/company": {
        dispatch({ type: "CHANGE_STEP", payload: 2 });
        break;
      }
      case "/signup/about-yourself": {
        dispatch({ type: "CHANGE_STEP", payload: 3 });
        break;
      }
      case "/signup/hosting": {
        dispatch({ type: "CHANGE_STEP", payload: 4 });
        break;
      }
      case "/signup/support": {
        dispatch({ type: "CHANGE_STEP", payload: 5 });
        break;
      }
      case "/signup/import": {
        dispatch({ type: "CHANGE_STEP", payload: 6 });
        break;
      }
      case "/signup/finish-setup": {
        dispatch({ type: "CHANGE_STEP", payload: 7 });
        break;
      }
    }
  }, [router.pathname]);

  const login = async ({ email, password }) => {
    try {
      const profile = await utils.login({ email, password });
      if (profile?.email) {
        dispatch({ type: "SET_USER", payload: { email: profile.email } });
      }
      return profile;
    } catch (error) {
      throw error;
    }
  };

  if (loading) return <Loader />;
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        dispatch,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
