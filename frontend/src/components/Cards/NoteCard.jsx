import { React, useState } from "react";
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import Modal from "react-modal";

import DisplayNote from "/DisplayNote";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const [isDisplayNote, setIsDisplayNote] = useState(false);

  const handleDisplayNote = () => {
    setIsDisplayNote(true);
  };
  const onClose = () => {
    setIsDisplayNote(false);
  };
  return (
    <>
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {moment(date).format("Do MM YYYY")}
            </span>
          </div>
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            } `}
            onClick={onPinNote}
          />
        </div>
        <p
          className="text-sm text-slate-600 mt-2 max-h-28 overflow-y-auto"
          onClick={handleDisplayNote}
        >
          {content?.slice(0, 60)}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {tags.map((item, index) => `#${item}`)}
          </div>
          <div className="flex items-center gap-2 relative bottom-0">
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isDisplayNote}
        onRequestClose={() => {
          setIsDisplayNote(false);
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 mx-auto mt-14 p-5"
      >
        <DisplayNote
          title={title}
          date={date}
          content={content}
          tags={tags}
          isPinned={isPinned}
          onEdit={onEdit}
          onDelete={onDelete}
          onPinNote={onPinNote}
          onClose={onClose}
        />
      </Modal>
    </>
  );
};

export default NoteCard;
