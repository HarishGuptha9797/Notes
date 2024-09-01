import { React, useState } from "react";
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import Modal from "react-modal";

const DisplayNote = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onClose,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out overflow-auto max-h-96 relative">
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
      <p className="text-sm text-slate-600 my-2 ">{content}</p>
      <div className="flex items-center justify-between h-8 bg-white sticky left-0 right-0 -bottom-4 m-0">
        <div className="text-xs text-slate-500 ">
          {tags.map((item, index) => `#${item}`)}
        </div>
        <div className="flex items-center gap-2 ">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={() => {
              onClose();
              onEdit();
            }}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayNote;
