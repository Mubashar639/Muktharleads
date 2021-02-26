import {
  facility_failed,
  facility_loading,
  facility_success,
  facility_add,
  facility_remove,
  facility_update,
  // facility_create,
} from "../Actions/authentication";

import { message } from "antd";
import { baseUrl } from "../../shared";
import { db, auth } from "../../fireBaseConfig";
import { addRow, getRows } from "../../fireBaseOpration";

export const GetFacilities = () => (dispatch) => {
  dispatch(facility_loading());
  var usersRef = db.collection("/client");

  usersRef
    .get()
    .then((usersSnap) => {
      const users = [];

      usersSnap.forEach(function (childSnapshot) {
        console.log(childSnapshot);
        var id = childSnapshot.id;

        var data = childSnapshot.data();
        // ...

        users.push({ id, ...data });
      });
      dispatch(facility_success(users));
      message.success("success");
      console.log(users);
    })
    .catch((err) => {
      message.error("some thing wrong");
      dispatch(facility_failed("Some thing went wrong"));
      console.log(err);
    });

  // console.log(res)
};

export const CreateFacilities = (creds, fn) => (dispatch) => {
  debugger;
  const { email_id, password } = creds;
  // dispatch(login_loading());
  // const
  auth
    .createUserWithEmailAndPassword(email_id, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      var user = userCredential.user;
      console.log(user);
      db.collection("/client")
        .add(creds)
        .then((ref) => {
          console.log("Added document with ID: ", ref);
          fn();
          return { id: ref.id };
        });
      // dispatch(login_success(user));

      // message.success("Hello ");
      // ...
    })
    .catch((err) => {
      message.error(err.message);
      console.log(err);
    });
};

export const DeleteFacilities = (creds) => (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  const token = localStorage.getItem("token");
  baseUrl
    .delete("api/facility/" + creds, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.status === 204) {
        dispatch(facility_remove(creds));
        console.log(res.data);
        message.success("successfully Deleted");
      }
    })
    .catch((err) => {
      message.error(err.message);
      console.log(err);
    });
};

export const UpdateFacilities = ({ id, ...creds }, fn) => async (dispatch) => {
  // const {email,password}=creds
  // dispatch(login_loading());
  // debugger;

  // const emailCred = await auth.EmailAuthProvider.credential(
  //   auth.currentUser,
  //   creds.prepassword
  // );
  // auth.currentUser
  //   .reauthenticateWithCredential(emailCred)
  //   .then(() => {
  //     // User successfully reauthenticated.
  //     auth.currentUser.updatePassword(creds.password);

  db.collection("/client")
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
  // })
  // .catch((error) => {
  //   // Handle error.
  //   console.log(error);
  // });
};
