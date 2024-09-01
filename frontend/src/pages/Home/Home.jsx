import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../../public/add-file_3142885.png";
import NoDataImg from "../../../public/paper_13693725.png";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isDisplayNote, setIsDisplayNote] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const Navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  const handleDelete = async (noteDetails) => {
    const noteId = noteDetails._id;
    try {
      await axiosInstance.delete(`/notes/delete-note/${noteId}`).then(() => {
        getAllNotes();
        showToastMessage("Note Deleted Successfully", "delete");
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An Unexpected Error Occurred. Please try again");
      }
    }
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type: type,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        Navigate("/login");
      }
    }
  };
  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setAllNotes(response.data.notes);
    } catch (error) {
      console.log("Error");
    }
  };

  //update IsPinned
  const updateIspinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.post(
        `/notes/update-note-pinned/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showToastMessage(
          !noteData.isPinned
            ? "Note Pinned Successfully!"
            : "Note UnPinned Successfully!"
        );
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //search a notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto py-10">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item)}
                onPinNote={() => updateIspinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "Oops! No Notes found matching your search."
                : 'Start Creating your first Note.Click "Add" button to create a Note.'
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" onClick={handleDelete} />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
