import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchquery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchquery) {
      onSearchNote(searchquery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // if (!searchquery) {
  //   handleClearSearch();
  // }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-shadow fixed top-0 left-0 right-0">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchquery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      {userInfo && <ProfileInfo onLogout={onLogout} userInfo={userInfo} />}
    </div>
  );
};

export default Navbar;
