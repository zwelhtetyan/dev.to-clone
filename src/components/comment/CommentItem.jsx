import React, { useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ReactionButton } from "../../utils/Buttons";
import {
  HeartIcon,
  RedHeart,
  CommentIcon,
  AuthorIcon,
} from "../../assets/icons";
import { dateFormat, showEditedDate } from "../../helper/calcTimestamp";
import { htmlToJsx } from "../../helper/htmlToJsx";
import converter from "../../helper/converter";
import CustomAvatar from "../../utils/CustomAvatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DiscussionBox from "../discussion/DiscussionBox";
import useClickLikeToComment from "../../hooks/useClickLikeToComment";
import ManageComment from "./ManageComment";
import { FiCornerLeftUp } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setLoginAlert } from "../../store/loginAlert";

const CommentItem = ({
  text,
  createdAt,
  currentUserProfile,
  userId,
  postId,
  commentId,
  comments,
  likes,
  authorId,
  currentUserId,
  ps,
  footerPs,
  avatarSize,
  edited,
  editedAt,
  reply,
  repliedUserName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDiscussionBox, setShowDiscussionbox] = useState(false);

  const { handleClickLike, updatingLike } = useClickLikeToComment(
    currentUserId,
    postId
  );

  const handleViewProfile = (username) => {
    navigate(`/${username}`);
  };

  const totalLike = likes.length;
  const alreadyLiked = likes.includes(currentUserId);

  const handleshowDiscussionBox = () => {
    if (!currentUserId) {
      dispatch(setLoginAlert(true));
      return;
    }

    setShowDiscussionbox((prev) => !prev);
  };

  // auto focus when click reply
  // give commentId for each comment item and when showDiscussionBox is true , select editor inside this specific id and focus it
  useEffect(() => {
    if (showDiscussionBox) {
      document.querySelector(`#comment${commentId} .mde-text`).focus();
    }
  }, [showDiscussionBox, commentId]);

  const reactionIconColor = useColorModeValue("#3d3d3d", "#d6d6d7");
  const ghostColor = useColorModeValue("light.ghostColor", "dark.ghostColor");
  const colorHover = useColorModeValue("light.colorHover", "dark.colorHover");
  const colorTertiary = useColorModeValue(
    "light.colorTertiary",
    "dark.colorTertiary"
  );
  const replyToColor = useColorModeValue("#8f8f8f", "dark.colorTertiary");

  return (
    <VStack mb={[".7rem", "1rem"]} ps={ps} id={`comment${commentId}`}>
      <Flex align="flex-start" w="100%">
        <CustomAvatar
          size={avatarSize}
          profile={currentUserProfile?.profile}
          onClick={() => handleViewProfile(currentUserProfile.username)}
        />

        <Box
          boxShadow={useColorModeValue(
            "0 0 0 1px rgb(23 23 23 / 13%)",
            "0 0 0 1px rgb(255 255 255 / 15%)"
          )}
          p={{ base: ".5rem .7rem", sm: ".5rem 1rem" }}
          borderRadius="5px"
          _hover={{
            ".more-icon": { fill: reactionIconColor },
            ".arrow-up": { color: reactionIconColor },
          }}
          w="100%"
          flex="1"
          ms=".5rem"
          overflow="hidden"
        >
          <Flex justify="space-between" mb={2}>
            <HStack align="center" spacing="2px">
              <Text
                fontSize="15px"
                fontWeight="900"
                cursor="pointer"
                color={ghostColor}
                _hover={{ color: colorHover }}
                onClick={() => handleViewProfile(currentUserProfile.username)}
              >
                {currentUserProfile.name}
              </Text>

              {authorId === userId && <AuthorIcon fill={reactionIconColor} />}

              {/* show Date */}
              <Text fontSize="12px" color={colorTertiary}>
                {" "}
                • {dateFormat(createdAt)}{" "}
                {edited && (
                  <Text as="span">
                    {showEditedDate(createdAt, editedAt)
                      ? `• Edited on ${dateFormat(editedAt)}`
                      : "• Edited"}
                  </Text>
                )}
              </Text>
            </HStack>

            {/* option menu */}
            {currentUserId === userId && (
              <ManageComment
                commentId={commentId}
                postId={postId}
                comments={comments}
              />
            )}
          </Flex>

          <Box
            fontSize={{ base: "14px", sm: "16px" }}
            fontFamily="monospace"
            sx={{ p: { marginBottom: "5px !important" } }}
          >
            {reply && repliedUserName !== currentUserProfile.name && (
              <Text
                as="div"
                fontSize="13px"
                color={replyToColor}
                mt="-7px !important"
                mb=".5rem !important"
                fontFamily="sans-serif"
              >
                <FiCornerLeftUp
                  className="arrow-up"
                  style={{ display: "inline-block" }}
                />{" "}
                reply to {repliedUserName}
              </Text>
            )}

            <Box className="mde-preview-content">
              {htmlToJsx(converter().makeHtml(text))}
            </Box>
          </Box>
        </Box>
      </Flex>

      <Box w="100%" ps={footerPs} mt=".3rem !important">
        {!showDiscussionBox && (
          <HStack justify="flex-start">
            <ReactionButton
              value={totalLike < 1 ? "" : totalLike}
              text={totalLike < 1 ? "" : totalLike > 1 ? "likes" : "like"}
              disabled={updatingLike}
              onClick={() => handleClickLike(comments, commentId)}
            >
              {alreadyLiked ? (
                <RedHeart />
              ) : (
                <HeartIcon fill={reactionIconColor} />
              )}
            </ReactionButton>

            <ReactionButton text="reply" onClick={handleshowDiscussionBox}>
              <CommentIcon fill={reactionIconColor} />
            </ReactionButton>
          </HStack>
        )}

        {showDiscussionBox && (
          <DiscussionBox
            postId={postId}
            showDismiss={true}
            onDismiss={handleshowDiscussionBox}
            commentId={commentId}
            repliedUserId={userId}
          />
        )}
      </Box>
    </VStack>
  );
};

export default CommentItem;
