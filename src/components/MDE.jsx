import React, { useEffect, useState } from "react";
import ReactMde from "react-mde";
import { useDispatch } from "react-redux";
import { getDefaultToolbarCommands } from "react-mde";
import { Box } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { uploadImage } from "../lib/api";
import converter from "../helper/converter";
import MDEToolbarImgIcon from "../utils/MDEToolbarImgIcon";
import { setMDEValueToStore } from "../store/post/postData";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../styles/customizeMDE.scss";
import { BsCodeSquare } from "react-icons/bs";

const customToolbarCommands = () => {
  const commands = getDefaultToolbarCommands();
  commands[1].splice(3, 1, "code-block", "img_url");
  return commands;
};

const codeBlock = {
  name: "code-block",
  icon: () => <BsCodeSquare size={18} style={{ position: "absolute" }} />,
  execute: (opts) => {
    opts.textApi.replaceSelection("```\n Enter code here... \n```");
  },
};

const MDE = ({ MDEValue, setMDEValue, isSubmitting, setUploadingImg }) => {
  const [value, setValue] = useState(MDEValue || "");
  const [selectedTab, setSelectedTab] = useState("write");

  const dispatch = useDispatch();

  useEffect(() => {
    if (setMDEValue) {
      setMDEValue(value); //for comment
    } else {
      dispatch(setMDEValueToStore(value)); //for postData to publish or edit
    }
  }, [value, dispatch, setMDEValue]);

  useEffect(() => {
    if (!MDEValue) {
      setValue(MDEValue);
    } // setting MDEValue to useState doesn't trigger again after initial render so I set empty string to value if it's empty
  }, [MDEValue]);

  useEffect(() => {
    if (isSubmitting) {
      document.querySelector(".mde-text").disabled = true;
    } else {
      document.querySelector(".mde-text").disabled = false;
    }
  }, [isSubmitting]);

  const mdeImgUploadHandler = (e) => {
    const image = e.target.files[0];

    if (image) {
      document.querySelector(".mde-text").disabled = true;
      setUploadingImg(true);
      setValue((prevVal) =>
        prevVal.replace("![](img_url)", "![](uploading...)")
      );

      const selectedImgPath = `images/${img.name}${nanoid()}`;

      uploadImage(image, selectedImgPath)
        .then((url) => {
          document.querySelector(".mde-text").disabled = false;

          setValue((prevVal) =>
            prevVal.replace("![](uploading...)", `![](${url})`)
          );

          setUploadingImg(false);
        })
        .catch((err) => console.log(err));

      e.target.value = ""; // otherwise input event doesn't trigger again when user add the same file
    }
  };

  const img = {
    name: "image_url",
    icon: () => <MDEToolbarImgIcon onChange={mdeImgUploadHandler} />,
    execute: (opts) => {
      opts.textApi.replaceSelection("![](img_url)");
    },
  };

  return (
    <Box w="100%" fontFamily="monospace">
      <ReactMde
        commands={{
          "code-block": codeBlock,
          img_url: img,
        }}
        loadingPreview="loading..."
        toolbarCommands={customToolbarCommands()}
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter().makeHtml(markdown))
        }
      />
    </Box>
  );
};

export default React.memo(MDE);
