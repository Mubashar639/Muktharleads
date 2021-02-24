import {
  login_failed,
  login_loading,
  login_success,
} from "../Actions/authentication";

import { message } from "antd";
import axios from "axios";
import { baseUrl, verifyToken } from "../../shared";
import { auth } from "../../fireBaseConfig";

const LoginActionCreater = (creds) => (dispatch) => {
  const { email, password } = creds;
  console.log(creds);
  dispatch(login_loading());
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      var user = userCredential.user;
      console.log(user);
      dispatch(login_success(user));

      message.success("Hello ");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      message.error(errorMessage);
      dispatch(login_failed("Some thing went wrong"));
      console.log(errorMessage);
      // ..
    });
};

export default LoginActionCreater;
