import { message } from "antd";
import { db } from "./fireBaseConfig";

export const addRow = async (Model, values) => {
  console.log(values);
  // e.preventDefault()
  try {
    await db
      .collection(Model)
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        return { id: ref.id, data: ref.data() };
      });
  } catch (err) {
    message.error("some thing wrong");
  }
};

export const deleteRow = async (Model, id) => {
  // e.preventDefault()
  try {
    await db.collection(Model).doc(id).delete();
  } catch (err) {
    message.error("some thing wrong");
  }
};

export const getRows = async (Model) => {
  db.collection(Model).onSnapshot((snapshot) => {
    const listItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return listItems;
  });
};
