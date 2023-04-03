import React, { useEffect, useState } from "react";
import { Box, HStack, Spinner, useColorModeValue } from "@chakra-ui/react";
import converter from "../../helper/converter";
import { PrimaryBtn, SecondaryBtn } from "../../utils/Buttons";
import MDE from "../MDE";
import "../../styles/customizeMDE.scss";
import { htmlToJsx } from "../../helper/htmlToJsx";
import { updateComment } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../context/auth";
import { nanoid } from "@reduxjs/toolkit";
import { removeFromLocalStorage } from "../../helper/localStorage";
import { setLoginAlert } from "../../store/loginAlert";
import hljs from "highlight.js";

const DiscussionBox = ({
  postId,
  commentId,
  showDismiss,
  onDismiss,
  valueToEdit,
  transformedComments,
  repliedUserId,
}) => {
  const user = useAuth();
  const dispatch = useDispatch();

  const { transformedData } = useSelector((state) => state.transformedData);

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [mdeTab, setMdeTab] = useState("write");
  const [MDEValue, setMDEValue] = useState(valueToEdit || "");

  const comments = transformedData?.find(
    (data) => data.id === postId
  )?.comments;

  const hasValue = MDEValue.trim();

  const mdeTabChangeHandler = () => {
    setMdeTab((prev) => (prev === "write" ? "preview" : "write"));
  };

  useEffect(() => {
    const textArea = document.querySelector(".mde-text");

    if (!user) {
      document.querySelector(".mde-header").style.display = "none";
      textArea.readOnly = true; // not allow cursor if not authenticated
    }

    const checkUser = () => {
      if (!user) {
        dispatch(setLoginAlert(true));
      }
    };

    textArea?.addEventListener("click", checkUser);

    return () => textArea?.removeEventListener("click", checkUser);
  }, [user, dispatch]); // hide mde-header if user is not authenticated

  // insert placeholder
  useEffect(() => {
    const textBoxes = [...document.querySelectorAll(".mde-text")];
    textBoxes.map((textbox, idx) =>
      idx === 0
        ? (textbox.placeholder = "Add to the discussion...")
        : (textbox.placeholder = "Reply...")
    );
  }, [mdeTab]);

  useEffect(() => {
    if (mdeTab === "preview") {
      hljs.highlightAll();
    }
  }, [mdeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const createdAt = Timestamp.now();
    const newComment = {
      value: MDEValue,
      replies: {},
      createdAt,
      userId: user.userId,
      commentId: nanoid(),
      likes: [],
    };

    let modifiedComments = [];

    if (valueToEdit) {
      modifiedComments = transformedComments(comments, MDEValue);
    } else if (commentId) {
      modifiedComments = comments.map((comment) =>
        comment.commentId === commentId ||
        Object.values(comment.replies).find(
          (cmt) => cmt.commentId === commentId
        )
          ? {
              ...comment,
              replies: {
                ...comment.replies,
                [nanoid()]: {
                  ...newComment,
                  repliedUserId,
                  repliedCommentId: commentId,
                },
              },
            }
          : comment
      );
    } else {
      modifiedComments = [...comments, newComment];
    }

    updateComment(modifiedComments, postId)
      .then((_) => {
        setSubmitting(false);
        setMDEValue("");
        // onDismiss && onDismiss(); => close discussionBox immediately without accepting new state value
        onDismiss && setTimeout(onDismiss, 100); // need new state value ('submitting = false') to disable || enable to MDE after state change
        setMdeTab("write");
        removeFromLocalStorage("commentItemToManage");
        // console.log('added comment successfully');
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
  };

  const shadow = useColorModeValue(
    "0 0 0 1px rgb(212 212 212)",
    "0 0 0 1px rgb(255 255 255 / 15%)"
  );

  const boxBoxShadow = useColorModeValue(
    "0 0 0 2px rgb(59 73 223)",
    "0 0 0 2px rgb(129 140 248) "
  );

  return (
    <Box className="mde-preview">
      {mdeTab === "write" && (
        <Box
          borderRadius="5px"
          _focusWithin={{
            boxShadow: user && boxBoxShadow,
          }}
          boxShadow={shadow}
          overflow="hidden"
          className="discussion-box mde-preview"
        >
          <MDE
            MDEValue={MDEValue}
            setMDEValue={setMDEValue}
            isSubmitting={submitting}
            setUploadingImg={setUploadingImg}
          />
        </Box>
      )}

      {mdeTab === "preview" && (
        <Box
          minH="192px"
          borderRadius="5px"
          padding="10px !important"
          className="mde-preview-content"
          boxShadow={shadow}
          fontSize={["1rem", "1.1rem"]}
          sx={{ p: { marginBottom: "5px !important" } }}
        >
          {htmlToJsx(converter().makeHtml(MDEValue))}
        </Box>
      )}

      {/* buttons */}
      <HStack justify="flex-end" w="100%" mt=".5rem">
        {showDismiss && (
          <SecondaryBtn
            onClick={onDismiss}
            disabled={uploadingImg || submitting}
          >
            Dismiss
          </SecondaryBtn>
        )}

        <SecondaryBtn
          disabled={
            (!hasValue && mdeTab === "write") || uploadingImg || submitting
          }
          onClick={mdeTabChangeHandler}
        >
          {mdeTab === "write" ? "Preview" : "Edit"}
        </SecondaryBtn>

        <PrimaryBtn
          onClick={handleSubmit}
          bg="light.primary"
          disabled={!hasValue || uploadingImg || submitting}
        >
          {submitting ? (
            <>
              <Spinner size="sm" mr="1" /> Submitting
            </>
          ) : (
            "Submit"
          )}
        </PrimaryBtn>
      </HStack>
    </Box>
  );
};

export default DiscussionBox;
