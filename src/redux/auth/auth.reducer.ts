import moment from "moment";
import AuthActionTypes from "./auth.types";
import { UserI } from "_interfaces/auth-api.interfaces";

interface AuthState {
  token: string | null;
  expiredDate?: string;
  failure: boolean;
  user?: UserI;
}

const INITIAL_STATE: AuthState = {
  token: null,
  failure: false,
  user: undefined,
};

const AuthReducer = (state = INITIAL_STATE, action: any): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        failure: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      const expiredDate = moment().add(7, "days").format("YYYY-MM-DD");
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        expiredDate: expiredDate,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        failure: true,
      };
    case AuthActionTypes.RESET_PASSWORD:
      return {
        ...state,
        failure: false,
      };
    case AuthActionTypes.RESET_PASSWORD_SUCCESS:
      const expdDate = moment().add(7, "days").format("YYYY-MM-DD");
      return {
        ...state,
        token: action.payload,
        expiredDate: expdDate,
      };
    case AuthActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        failure: true,
      };
    case AuthActionTypes.REGISTER:
      return {
        ...state,
        failure: false,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      const expDate = moment().add(7, "days").format("YYYY-MM-DD");
      return {
        ...state,
        token: action.payload,
        expiredDate: expDate,
      };
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        failure: true,
      };
    case AuthActionTypes.LOGOUT:
      return {
        failure: false,
        token: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
