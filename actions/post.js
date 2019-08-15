import firebase from "firebase";
import "@firebase/firestore";
import uuid from "uuid";

export const updateDescription = text => {
  return { type: "UPDATE_DESCRIPTION", payload: text };
};

export const updatePhoto = url => {
  return { type: "UPDATE_PHOTO", payload: url };
};

export const updateLocation = location => {
  return { type: "UPDATE_LOCATION", payload: location };
};

export const uploadPost = () => async (dispatch, getState) => {
  const db = firebase.firestore();
  console.log(getState());
  const { post, auth } = getState();
  const id = uuid.v4();
  try {
    const upload = {
      id: id,
      postPhoto: post.photo,
      userId: auth.userId,
      postDescription: post.description,
      postLocation: post.location,
      photo: auth.photo,
      username: auth.username,
      likes: []
    };
    const ref = await db
      .collection("posts")
      .doc(id)
      .set(upload);
    dispatch(getPost());
  } catch (err) {
    alert(err);
  }
};

export const getPost = () => async (dispatch, getState) => {
  const db = firebase.firestore();

  try {
    const res = await db.collection("posts").get();

    const array = [];
    res.forEach(post => {
      array.push(post.data());
    });
    console.log(array);
    dispatch({ type: "GET_POST", payload: array });
  } catch (err) {
    alert(err);
  }
};

export const likePost = post => async (dispatch, getState) => {
  const db = firebase.firestore();
  const { userId, username, photo } = getState().auth;
  console.log(getState())
  try {
    await db
      .collection("posts")
      .doc(post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId)
      });
    await db
      .collection("activity")
      .doc()
      .set({
        postId: post.id,
        postPhoto: post.postPhoto,
        likerPhoto: photo,
        likerId: userId,
        likerName: username,
        uid: post.userId,
        date: new Date().getTime(),
        type: "Like"
      });
    dispatch(getPost());
  } catch (err) {
    console.error(err);
  }
};

export const unlikePost = post => async (dispatch, getState) => {
  const db = firebase.firestore();
  const { userId } = getState().auth;
  console.log("post", post);
  try {
    await db
      .collection("posts")
      .doc(post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId)
      });

    const query = await db.collection("activity").where("postId", "==", post.id).where("likerId", "==", userId).get()
    query.forEach(res => {
      res.ref.delete()
    })
    dispatch(getPost());
  } catch (err) {
    console.error(err);
  }
};
