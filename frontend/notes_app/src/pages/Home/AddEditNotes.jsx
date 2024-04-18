import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  //노트 추가하기
  const addNewNote = async () => {};

  // 노트 제거하기
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("제목을 입력하시오.");
      return;
    }

    if (!content) {
      setError("컨텐츠를 입력하시오.");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400"></MdClose>
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="운동 가기"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags}></TagInput>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn_primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNotes;
