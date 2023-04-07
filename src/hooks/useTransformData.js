import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setTransformedData,
  setTransformedDataErr,
  setTransformedDataLoading,
} from "../store/data/transformedData";
import {
  setProfileData,
  setProfileDataErr,
  setProfileDataLoading,
} from "../store/user/profileData";
import useGetData from "./useGetData";

const useTransformData = () => {
  const dispatch = useDispatch();

  const {
    data: allPostData,
    loading: postLoading,
    err: postErr,
  } = useGetData("posts");

  const {
    data: userData,
    loading: userLoading,
    err: userErr,
  } = useGetData("users");

  const loading = postLoading || userLoading;
  const err = postErr || userErr;

  // transform data logic
  let modifiedPostData = null;

  if (allPostData && userData && !loading && !err) {
    const changedPostData = allPostData.map((postData) => {
      const userInfo = userData.find((data) => data.id === postData.userId);

      return {
        ...postData,
        name: userInfo?.name,
        username: userInfo.username,
        profile: userInfo?.profile,
      };
    });

    modifiedPostData = changedPostData;
  }
  // transform data logic end

  useEffect(() => {
    dispatch(setTransformedData(modifiedPostData));
    dispatch(setTransformedDataLoading(loading));
    dispatch(setTransformedDataErr(err));
  }, [dispatch, err, loading, modifiedPostData]);

  useEffect(() => {
    dispatch(setProfileData(userData));
    dispatch(setProfileDataLoading(userLoading));
    dispatch(setProfileDataErr(userErr));
  }, [dispatch, userData, userLoading, userErr]);
};

export default useTransformData;
