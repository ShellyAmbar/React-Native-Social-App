import axios from "axios";
import { authRutes } from "../../routes";
import types from "../actionsTypes";
import { AsyncStorage } from "react-native";

export default Login = (email, password) => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");
    fetch(authRutes.login_user, {
      method: "POST",

      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(respond => {
        if (respond.status === 200 && respond.ok === true) {
          return respond.json();
        } else {
          throw Error("error");
        }
      })
      .then(respond => {
        console.log(respond);
        dispatch({
          type: types.login,
          payload: respond.data
        });
        localStorage.setItem("TOKEN", respond.data.token);
        localStorage.setItem("USER_ID", respond.data.user_id);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.login_error,
          payload: "Error, email or password are wrong, try again."
        });
      });
  };
};
