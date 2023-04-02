import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DetailSkeleton from "../skeletons/DetailSkeleton";
import SideReactionBar from "./SideReactionBar";
import ErrorMessage from "../../utils/ErrorMessage";
import DetailRightContent from "./DetailRightContent";
import MainContent from "./MainContent";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../styles/postdetail.scss";

const DetailElements = ({
  postDetail,
  currentUserProfile,
  loading,
  err,
  otherPosts,
  trandingOnDevCommunity,
}) => {
  return (
    <Box
      maxW="1280px"
      w="100%"
      py="0"
      px={{ base: "0", md: "1rem" }}
      mt={{ base: "-.5rem !important", md: "0 !important" }}
      mb={{ md: "2rem" }}
      flex="1"
    >
      {!postDetail && loading && <DetailSkeleton />}

      {!postDetail && !loading && !err && <ErrorMessage urlNotFound={true} />}

      {!postDetail && !loading && err && <ErrorMessage offline={true} />}

      {postDetail && (
        <Flex flex={2} align="flex-start">
          <SideReactionBar postDetail={postDetail} />

          <Box flex="2.1" overflow="hidden" pb="1px">
            <MainContent postDetail={postDetail} />

            <DetailRightContent
              currentUserProfile={currentUserProfile}
              otherPosts={otherPosts}
              userId={postDetail.userId}
              display={{ base: "block", xl: "none" }}
              m={{ base: "1.5rem 0", md: "1.5rem 1px 0" }}
              trandingOnDevCommunity={trandingOnDevCommunity}
            />
          </Box>

          <DetailRightContent
            currentUserProfile={currentUserProfile}
            otherPosts={otherPosts}
            userId={postDetail.userId}
            display={{ base: "none", xl: "block" }}
            trandingOnDevCommunity={trandingOnDevCommunity}
          />
        </Flex>
      )}
    </Box>
  );
};

export default DetailElements;
