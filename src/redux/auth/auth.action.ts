import { batch } from "react-redux";
import { toast } from "react-toastify";
import AuthActionTypes from "./auth.types";
import { AuthServices } from "../../_services/auth-api.services";
import GlobalActionTypes from "../global/global.types";

export const loginRedux = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      batch(() => {
        dispatch({ type: AuthActionTypes.LOGIN });
        dispatch({ type: GlobalActionTypes.SHOW_LOADING });
      });

      const login = await AuthServices.login({
        email: email,
        password: password,
      });
      batch(() => {
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: login.data,
        });
        dispatch({ type: GlobalActionTypes.HIDE_LOADING });
        toast.success("Login Success");
      });
    } catch (error: any) {
      batch(() => {
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: error });
        dispatch({ type: GlobalActionTypes.HIDE_LOADING });
        toast.error("Login Failure. " + error.message);
      });
    }
  };
};

export const resetPassword = (password: string, token: string) => {
  return async (dispatch: any) => {
    dispatch({ type: AuthActionTypes.RESET_PASSWORD })
  }
};

export const logoutRedux = () => {
  return async (dispatch: any) => {
    dispatch({ type: AuthActionTypes.LOGOUT })
  }
};
