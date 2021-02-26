import {
  // transport_failed,

  food_success,
  food_add,
  food_remove,
  food_update,
  // transport_create,
} from "../Actions/authentication";

import { message } from "antd";
import { baseUrl } from "../../shared";
import { db } from "../../fireBaseConfig";

export const Getfood = (key) => (dispatch) => {
  var usersRef = db.collection("/leads");

  usersRef
    .where("status", "==", key)
    .get()
    .then((usersSnap) => {
      const leads = [];

      usersSnap.forEach(function (childSnapshot) {
        console.log(childSnapshot);
        var id = childSnapshot.id;

        var data = childSnapshot.data();
        // ...

        leads.push({ id, ...data });
      });
      dispatch(food_success(leads));
      message.success("success");
      console.log(leads);
    })
    .catch((err) => {
      message.error("some thing wrong");
      console.log(err);
    });
};

export const Createfood = (creds, cb) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  // let { dateTime } = creds;
  // dateTime = new Date(dateTime._d);
  // creds.dateTime = dateTime;
  db.collection("/leads")
    .add(creds)
    .then((ref) => {
      console.log("Added document with ID: ", ref);
      cb();
      return { id: ref.id };
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Deletefood = (creds) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  const token = localStorage.getItem("token");
  baseUrl
    .delete("api/food/" + creds, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.status === 204) {
        dispatch(food_remove(creds));
        console.log(res.data);
        message.success("successfully Deleted");
      }
    })
    .catch((err) => {
      message.error(err.message);
      console.log(err);
    });
};

export const Updatefood = ({ id, ...creds }, fn) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  db.collection("/leads")
    .doc(id)
    .update(creds)
    .then((ref) => {
      console.log("edit document with ID: ", ref);
      fn();
      return { id: id };
    })
    .catch((err) => {
      message.error(err.message);
      console.log(err);
    });
};
