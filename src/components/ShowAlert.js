import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Alert from "./Alert";
import { store } from "../redux";
import { showAlert } from "../redux/actions/app";
import { clearUserData } from "../redux/actions/user";

export default () => {
  const dispatch = useDispatch();
  const {
    showAlert: { error, alert, alertImg, alertText, alertTitle, callBack },
  } = useSelector(state => state.app);

  const alertClose = () => {
    store.dispatch(showAlert());
  };

  const callBackFuntion = () => {
    dispatch(clearUserData());
    dispatch(showAlert());
  };

  return (
    <Alert
      error={error}
      alert={alert}
      btnText={"OK"}
      img={alertImg}
      text={alertText}
      title={alertTitle}
      onBtnPress={callBack ? callBackFuntion : alertClose}
    />
  );
};
