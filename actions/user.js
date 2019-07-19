import firebase from "firebase";
import "@firebase/firestore";
import * as Facebook from "expo-facebook";

export const updateEmail = email => {
  return { type: "UPDATE_EMAIL", payload: email };
};
export const updatePassword = password => {
  return { type: "UPDATE_PASSWORD", payload: password };
};
export const updateUsername = username => {
  return { type: "UPDATE_USERNAME", payload: username };
};
export const updateBio = bio => {
  return { type: "UPDATE_BIO", payload: bio };
};

export const login = () => {
  return async (dispatch, getState) => {
    const { email, password } = getState().auth;
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(getUser(res.user.uid));
    } catch (err) {
      alert(err);
    }
  };
};

export const FacebookLogin = () => {
  return async (dispatch, getState) => {
    const db = firebase.firestore();

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "445278489357619"
      );
      if (type === "success") {
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );

        const res = await firebase.auth().signInWithCredential(credential);
        console.log("FB", res)
        if (res.additionalUserInfo.isNewUser) {
          const user = {
            email: res.user.email,
            username: res.user.displayName,
            bio: "",
            userId: res.user.uid,
            photo: res.user.photoURL,
            token: null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          };

          await db
            .collection("users")
            .doc(res.user.uid)
            .set(user);

          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch(getUser(res.user.uid));
        }
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const signup = () => async (dispatch, getState) => {
  try {
    const db = firebase.firestore();
    const { email, password, username, bio } = getState().auth;
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = {
      email: email,
      username: username,
      bio: bio,
      userId: response.user.uid,
      photo: "",
      token: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db
      .collection("users")
      .doc(response.user.uid)
      .set(user);

    dispatch({ type: "LOGIN", payload: user });
  } catch (err) {
    alert(err);
  }
};

export const getUser = uid => async (dispatch, getState) => {
  const db = firebase.firestore();

  try {
    const res = await db
      .collection("users")
      .doc(uid)
      .get();
    dispatch({ type: "LOGIN", payload: res.data() });
  } catch (err) {
    alert(err);
  }
};
