import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CreatePostForm from "../components/post/CreatePostForm";
import { useAuth } from "../context/auth";
import useCreatePost from "../hooks/useCreatePost";

const CreatePost = ({ currentPostDataToEdit }) => {
  //scroll top
  useEffect(() => window.scrollTo(0, 0), []);

  const user = useAuth();

  const {
    postData,
    title,
    setTitle,
    publishing,
    savingDraft,
    uploadingImg,
    setUploadingImg,
    publishPostHandler,
    draftPostHandler,
    eidtPostHandler,
  } = useCreatePost(currentPostDataToEdit);

  if (!user) {
    return <Navigate to="/create-account" replace />;
  }

  return (
    <CreatePostForm
      publishPostHandler={publishPostHandler}
      draftPostHandler={draftPostHandler}
      eidtPostHandler={eidtPostHandler}
      setPostTitle={setTitle}
      postTitle={title}
      postData={postData}
      pageTitle={currentPostDataToEdit ? "Edit" : "Create"}
      publishing={publishing}
      savingDraft={savingDraft}
      uploadingImg={uploadingImg}
      setUploadingImg={setUploadingImg}
      toEdit={currentPostDataToEdit ? true : false}
    />
  );
};

export default CreatePost;
