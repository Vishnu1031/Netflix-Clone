import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/errorPgae");
      });
  };
  return (
    <div className="absolute w-screen p-8 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
        className="w-56"
      />
      {user && <button
        className="bg-red-500 font-bold text-white p-4 m-4"
        onClick={handleSignOut}
      >
        Sign out
      </button>}
    </div>
  );
};

export default Header;
