import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/Store/userSlice";
import { LANGUAGE, LOGO_URL } from "../Utils/constants/constants";
import { toggleGptSearchView } from "../Utils/Store/gptSlice";
import { changeLanguage } from "../Utils/Store/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/errorPgae");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browser");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => subscribe();
  }, []);

  return (
    <div className="absolute w-screen p-8 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img src={LOGO_URL} alt="netflix-logo" className="w-56" />
      {user && (
        <div>
          {showGptSearch && (
            <select
              className="p-4 m-4 bg-gray-800 text-white font-bold"
              onChange={handleLanguageChange}
            >
              {LANGUAGE.map((lang) => (
                <option key={lang.key} value={lang.key}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white font-bold p-4 m-4 bg-purple-800"
            onClick={handleGptSearch}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <button
            className="bg-red-500 font-bold text-white p-4 m-4"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
