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

export const Getfood = () => (dispatch) => {
  var usersRef = db.collection("/leads");

  usersRef
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

export const Createfood = (creds) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  // let { dateTime } = creds;
  // dateTime = new Date(dateTime._d);
  // creds.dateTime = dateTime;
  db.collection("/leads")
    .add(creds)
    .then((ref) => {
      console.log("Added document with ID: ", ref);
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

export const Updatefood = ({ id, ...creds }) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  const form = new FormData();
  form.append("name", creds.name);
  form.append("path", creds.path);
  form.append("description", creds.description);
  form.append("price", creds.price);
  if (creds.photo) form.append("photo", creds.photo);
  const token = localStorage.getItem("token");
  baseUrl
    .patch("api/food/" + id, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(food_update({ id, updatedfood: res.data.food }));
        message.success("successfully updated");
      }
    })
    .catch((err) => {
      message.error(err.message);
      console.log(err);
    });
};
