import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import UserProfilePopup from "../profile/UserProfilePopup";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import OtherPostItem from "../post/OtherPostItem";
import { useAuth } from "../../context/auth";

const DetailRightContent = ({
  currentUserProfile,
  otherPosts,
  userId,
  display,
  m,
  trandingOnDevCommunity,
}) => {
  const navigate = useNavigate();
  const user = useAuth();

  const cardColor = useColorModeValue(
    "light.cardSecondaryBg",
    "dark.cardSecondaryBg"
  );

  const nameColor = useColorModeValue(
    "light.headingHover",
    "dark.headingHover"
  );

  const postsToShow =
    otherPosts.length !== 0 ? otherPosts : trandingOnDevCommunity;

  return (
    <Box
      m={m}
      flex="1"
      ms={{ xl: "1rem" }}
      pos="sticky"
      top="4rem"
      display={display}
    >
      <UserProfilePopup
        w="100%"
        p="1rem"
        m={{ base: "0", md: "1px" }}
        borderRadius={{ base: "0", md: "5px" }}
        boxShadow={useColorModeValue(
          "0 0 0 1px rgb(23 23 23 / 10%)",
          "0 0 0 1px rgb(255 255 255 / 15%)"
        )}
        backgroundHeight="50px"
        background={currentUserProfile.background}
        profile={currentUserProfile.profile}
        name={currentUserProfile.name}
        username={currentUserProfile.username}
        bio={currentUserProfile.bio}
        work={currentUserProfile.work}
        location={currentUserProfile.location}
        education={currentUserProfile.education}
        joined={currentUserProfile.createdAt}
        id={userId}
        currentUserId={user?.userId}
        followers={currentUserProfile.followers || []}
      />

      <Box
        borderRadius={{ base: "0", md: "5px" }}
        className="shadow"
        mt="1rem"
        overflow="hidden"
        bg={cardColor}
        py=".5rem"
      >
        <Text fontSize="1.3rem" mb="1rem" fontWeight={600} ms="1rem">
          {otherPosts.length ? "More from" : "Trending on"}{" "}
          <Text
            as="span"
            color={nameColor}
            cursor="pointer"
            onClick={() =>
              otherPosts.length
                ? navigate(`/${currentUserProfile.username}`)
                : navigate("/")
            }
          >
            {otherPosts.length
              ? currentUserProfile.name
              : "DEV Community 👩‍💻👨‍💻🔥"}
          </Text>
        </Text>

        {postsToShow.map((postData, idx) => (
          <OtherPostItem
            key={nanoid()}
            username={postData.username}
            title={postData.title}
            tags={postData.tags}
            postId={postData.id}
            isLastElement={idx === postsToShow.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DetailRightContent;
