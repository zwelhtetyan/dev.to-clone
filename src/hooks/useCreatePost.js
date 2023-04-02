import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import {
  getItemFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../helper/localStorage";
import { createPost, deletePost, draftPost, editPost } from "../lib/api";
import { setTitleToStore } from "../store/post/postData";

const useCreatePost = (currentPostDataToEdit) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useAuth();

  //value from redux store
  const postDataFromStore = useSelector((state) => state.postData);

  const initialState = useMemo(
    () => ({
      cvImg: "",
      title: "",
      tags: [],
      MDEValue: "",
      userId: user?.userId,
    }),
    [user?.userId]
  );

  //states
  const [postData, setPostData] = useState(
    currentPostDataToEdit ||
      getItemFromLocalStorage("postDataToPublish") ||
      initialState
  );
  const [title, setTitle] = useState(postData?.title || "");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  //set title to store
  useEffect(() => {
    dispatch(setTitleToStore(title));
  }, [title, dispatch]);

  //set postData state everytime postData from store change
  useEffect(() => {
    const newData = {
      cvImg: postDataFromStore.cvImg,
      title: postDataFromStore.title,
      tags: postDataFromStore.tags,
      MDEValue: postDataFromStore.MDEValue,
      userId: user?.userId,
    };

    setPostData((prevData) => ({ ...prevData, ...newData }));
  }, [postDataFromStore, user?.userId]);

  //save to localStorage
  useEffect(() => {
    saveToLocalStorage(
      currentPostDataToEdit ? "postDataToManage" : "postDataToPublish",
      JSON.stringify(postData)
    );
  }, [postData, currentPostDataToEdit]);

  const publishPostHandler = () => {
    setPublishing(true);

    if (postData.draft) {
      deletePost(postData.id);
    }

    //if post is a draft , It will have an id but It will be replced with firebase auto generated id when fetch data in [useGetData.js] file

    createPost({ ...postData, draft: false })
      .then((_) => {
        setPublishing(false);
        navigate("/dashboard");
        removeFromLocalStorage("postDataToPublish");
        removeFromLocalStorage("postDataToManage");
        // console.log('created post successfully');
      })
      .catch((err) => {
        setPublishing(false);
        console.log(err);
      });
  };

  const draftPostHandler = () => {
    setSavingDraft(true);

    const route = postData.draft ? -1 : "/dashboard/drafts";

    draftPost({
      ...postData,
      draft: true,
      id: postData.id || nanoid().replaceAll("_", "-"), // underscore must not include in postId because i split post url with underscore to get specific postId
    })
      .then((_) => {
        setSavingDraft(false);
        navigate(route);
        removeFromLocalStorage("postDataToPublish");
        removeFromLocalStorage("postDataToManage");
        // console.log('drafted post successfully');
      })
      .catch((err) => {
        setSavingDraft(false);
        console.log(err);
      });
  };

  const eidtPostHandler = () => {
    setPublishing(true);

    editPost({ ...postData, updated: true })
      .then((_) => {
        setPublishing(false);
        navigate(-1);
        removeFromLocalStorage("postDataToManage");
        // console.log('edited post successfully');
      })
      .catch((err) => {
        setPublishing(false);
        console.log(err);
      });
  };

  return {
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
  };
};

export default useCreatePost;
