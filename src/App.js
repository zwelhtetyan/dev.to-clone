import React, { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import useTransformData from "./hooks/useTransformData";
import LoginAlert from "./components/LoginAlert";
import FallbackSpinner from "./utils/FallbackSpinner";
import ConfigRoute from "./layout/ConfigRoute";
import "highlight.js/styles/tokyo-night-dark.css";

const App = () => {
  useTransformData();

  return (
    <Box>
      <Suspense fallback={<FallbackSpinner />}>
        <ConfigRoute />
      </Suspense>

      {/* modal alert */}
      <LoginAlert />
    </Box>
  );
};

export default App;
