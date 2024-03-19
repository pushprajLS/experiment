import heic2any from "heic2any";
import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { addWaterMark } from "../helpers/helper-methods";

const HeicHandler = (props) => {
  console.log(props);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const _uploadFiles = () => {
    if (!filesToUpload.length) {
      console.error("Please select atleast one file.");
      return;
    }
  };

  const userData = {
    waterMark: "Pushpraj",
  };

  const _handleHeicImg = (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!file.previewBlob) return;

        let blobRes = await fetch(file.previewBlob);

        // convert response to blob
        let blob = await blobRes.blob();

        // convert to PNG - response is blob
        let conversionResult = await heic2any({ blob, toType: "image/jpeg" });

        resolve(conversionResult);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const _handleFileChange = async (e) => {
    try {
      const newFilesToUpload = [...filesToUpload];
      const files = Array.from(e.target.files);

      for (let i = 0; i < files.length; i++) {
        if (!files[i]?.type?.includes("image")) {
          continue;
        }

        let imageFile = files[i];
        imageFile.previewBlob = URL.createObjectURL(files[i]);

        if (
          files[i]?.type?.includes("heif") ||
          files[i]?.type?.includes("heic")
        ) {
          imageFile = await _handleHeicImg(files[i]);
        }

        if (userData?.waterMark) {
          const markedImage = await addWaterMark(
            imageFile,
            userData?.waterMark
          );

          imageFile = {
            previewBlob: markedImage.url,
            uploadData: markedImage.blob,
            type: imageFile.type,
          };
        } else {
          imageFile.uploadData = files[i];
        }

        console.log(imageFile);
        newFilesToUpload.push(imageFile);
      }

      setFilesToUpload(newFilesToUpload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Input
        type="file"
        accept="image/*,video/*, .heic,.heif"
        onChange={(e) => _handleFileChange(e)}
        multiple={true}
      />

      <Button
        outline
        color="primary"
        className="mt-2"
        onClick={() => _uploadFiles()}
      >
        Upload
      </Button>

      <div className="d-flex gap-2 flex-wrap">
        {filesToUpload?.map((each, index) => (
          <div className="img_container" key={index}>
            <img src={each.previewBlob || ""} alt="preview" />
          </div>
        ))}
      </div>
    </>
  );
};

export default HeicHandler;
