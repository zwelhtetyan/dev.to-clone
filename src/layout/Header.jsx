import React, { useRef } from "react";
import logo from "../assets/images/logo.png";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Image, useColorModeValue } from "@chakra-ui/react";
import { PrimaryBtn, SecondaryBtn } from "../utils/Buttons";
import SideMenu from "../components/menu/SideMenu";
import { useAuth } from "../context/auth";
import MainMenu from "../components/menu/MainMenu";
import { useSelector } from "react-redux";
import SearchInput from "../components/search/SearchInput";
import useGetQuerySearchTerm from "../hooks/useGetQuerySearchTerm";
import { removeFromLocalStorage } from "../helper/localStorage";

const Header = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const searchInputRef = useRef();

  const querySearchTerm = useGetQuerySearchTerm("spq");

  const profileData = useSelector((state) => state.profileData.profileData);

  let currentUserProfile = null;

  if (user && profileData) {
    currentUserProfile = profileData.find((data) => data.id === user.userId);

    if (!currentUserProfile) {
      removeFromLocalStorage("user");
    }
  }

  return (
    <HStack
      className="header"
      as="header"
      bg={useColorModeValue("light.cardBg", "dark.cardBg")}
      w="100%"
      h="56px"
      pos="fixed"
      boxShadow={useColorModeValue(
        "0 1px 1px rgba(0, 0, 0, 0.1)",
        "0 1px 1px rgb(0, 0, 0)"
      )}
      zIndex={1000}
      top="0"
      left="0"
    >
      <HStack
        justify="space-between"
        width="100%"
        maxW="1280px"
        m="auto"
        px={{ base: ".5rem", md: "1rem" }}
      >
        <Box display="flex" alignItems="center">
          <SideMenu />

          <Image
            w="50px"
            h="40px"
            src={logo}
            alt="logo"
            ms={{ base: ".5rem", md: "0" }}
            onClick={() => navigate("/")}
            cursor="pointer"
          />

          <SearchInput
            ref={searchInputRef}
            querySearchTerm={querySearchTerm}
            w="400px"
            display={{ base: "none", md: "block" }}
            route="search"
          />
        </Box>

        <Flex>
          <Link to="/search">
            <SecondaryBtn
              name="search_icon"
              display={{ base: "block", md: "none" }}
              m="0 .5rem 0 0"
            >
              <FiSearch size={23} />
            </SecondaryBtn>
          </Link>

          {!user && (
            <>
              <Link to="/login">
                <SecondaryBtn
                  display={{ base: "none", md: "block" }}
                  m="0 .5rem 0 0"
                >
                  Log in
                </SecondaryBtn>
              </Link>

              <Link to="/create-account">
                <PrimaryBtn>Create Account</PrimaryBtn>
              </Link>
            </>
          )}

          {user && currentUserProfile && (
            <>
              <PrimaryBtn
                display={{ base: "none", md: "block" }}
                onClick={() => navigate("/create-post")}
                m="0 .5rem 0 0"
              >
                Creart Post
              </PrimaryBtn>

              <MainMenu currentUserProfile={currentUserProfile} />
            </>
          )}
        </Flex>
      </HStack>
    </HStack>
  );
};

export default Header;
