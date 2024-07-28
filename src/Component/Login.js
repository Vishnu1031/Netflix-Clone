import { useRef, useState } from "react";
import Header from "./Header";
import { ValidateFrom } from "../Utils/ValidateFrom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Store/userSlice";
import { background_Img } from "../Utils/constants/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = () => {
    const msg = ValidateFrom(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    // sign up logic
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browser");
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browser");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={background_Img}
          alt="background-img"
        />
      </div>
      <form
        className="absolute w-3/12 my-36 mx-auto p-14 right-0 left-0 text-white bg-black opacity-85"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="font-bold text-3xl my-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            className="p-4 my-2 w-full bg-slate-700"
            type="text"
            name="name"
            placeholder="Enter name"
            ref={name}
          />
        )}
        <input
          className="p-4 my-2 w-full bg-slate-700"
          type="email"
          name="email"
          placeholder="Enter email"
          ref={email}
        />
        <input
          className="p-4 my-2 w-full bg-slate-700"
          type="password"
          name="password"
          placeholder="Enter password"
          ref={password}
        />
        <p className="py-4 my-2 font-bold text-red-600">{errorMsg}</p>
        <button className="p-4 my-2 w-full bg-red-700" onClick={handleSubmit}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div className="py-4 my-4 cursor-pointer" onClick={handleSignUp}>
          {isSignIn
            ? "New User ? Sign up now."
            : "Already registered ? Sign In."}
        </div>
      </form>
    </div>
  );
};

export default Login;
