import heic2any from "heic2any";
import toast from "react-hot-toast";
import { UPLOAD_LIMIT, UPLOAD_LIMIT_TEXT, userData } from "../config";

export const showToast = (message, type = "error", duration = 4000) => {
  toast.dismiss();
  toast[type](message, { duration });
};

export const errorHandler = (error) => {
  console.log("error>>", error);
  showToast(
    error?.reason?.length
      ? error?.reason
      : "Server Error. Try again after sometime."
  );
};

export const getFontSizeBasedOnImage = (width, height) => {
  let fontSize;

  if (width >= 5000) {
    fontSize = 150;
  } else if (width >= 3000 && width >= 1500) {
    fontSize = 100;
  } else if (width >= 1024 && width >= 1280) {
    fontSize = 35;
  } else if (width >= 960 && width >= 1024) {
    fontSize = 30;
  } else if (width >= 500 && width <= 960) {
    fontSize = 25;
  } else if (width >= 300 && width <= 500) {
    fontSize = 15;
  } else {
    fontSize = 10;
  }

  return fontSize;
};

export const addWaterMark = (file, watermarkText) => {
  if (file) {
    return new Promise(function (resolve, reject) {
      let rawImage = new Image();
      rawImage.addEventListener("load", function () {
        resolve(rawImage);
      });
      rawImage.src = URL.createObjectURL(file);
    })
      .then(function (rawImage) {
        // Convert image to webp ObjectURL via a canvas blob
        return new Promise(function (resolve, reject) {
          try {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = rawImage.width;
            canvas.height = rawImage.height;
            let fontSize = getFontSizeBasedOnImage(canvas.width, canvas.height);
            ctx.drawImage(rawImage, 0, 0);
            ctx.fillStyle = "black";
            ctx.font = fontSize + "px monospace";
            let width = ctx.measureText(watermarkText || "").width;
            ctx.fillRect(
              rawImage.width - width,
              canvas.height - fontSize,
              width,
              parseInt(fontSize, 10)
            );
            ctx.fillStyle = "#fff";
            ctx.fillText(
              watermarkText || "",
              rawImage.width - width,
              canvas.height - 5
            );
            ctx.restore();
            canvas.toBlob(function (blob) {
              resolve({ blob, url: URL.createObjectURL(blob) });
            });
          } catch (error) {
            reject(error);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const handleHeicImg = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file.type) {
        reject("Something went wrong.");
      }

      const imgBlob = URL.createObjectURL(file);

      let blobRes = await fetch(imgBlob);

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

/**
 * @param {array of files to be uploaded} files
 * @param {state of type array, containing previous files} mediaFiles
 * @param {where this fn is being used, validation may vary accordingly} pageName
 * @param {used in MediaUploadModal Component} [isAudioUpload, isPdfUpload]
 * @returns array of file type objects
 */
export const mediaFileshandler = ({
  files,
  mediaFiles = [],
  pageName,
  isAudioUpload = true,
  isPdfUpload = true,
}) => {
  console.log({ files, mediaFiles, pageName, isAudioUpload, isPdfUpload });
  return new Promise(async (resolve) => {
    try {
      if (!files?.length) {
        resolve({ error: true });
      }

      // const { userData } = REDUX_STORE?.getState() || {};

      let showFileSizeWarning = true;

      for (let i = 0; i < files.length; i++) {
        if (pageName === "feedPage" && mediaFiles?.length >= 15) {
          showToast("15 media is allowed at a time", "success");
          break;
        }

        const fileType = files?.[i]?.type?.split("/")[0];
        const fileSize = files?.[i]?.size;

        if (fileSize >= UPLOAD_LIMIT) {
          if (showFileSizeWarning) {
            showToast(
              `Files above ${UPLOAD_LIMIT_TEXT} are currently not supported`,
              "error"
            );
            showFileSizeWarning = false;
          }
          continue;
        }

        switch (fileType) {
          case "image": {
            try {
              let image = files?.[i];

              const isImgHeicType =
                files?.[i]?.type?.includes("heif") ||
                files?.[i]?.type?.includes("heic");

              if (isImgHeicType) {
                // blob type object will be recieved
                console.log("is heic");
                image = await handleHeicImg(files?.[i]);
              }

              if (userData?.user?.settings?.waterMarkText?.trim()?.length) {
                const markedFile = await addWaterMark(
                  image,
                  userData?.user?.settings?.waterMarkText
                );

                image = {
                  previewBlob: markedFile.url,
                  uploadData: markedFile.blob,
                  type: image?.type,
                };

                console.log("watermark added", image);
              } else {
                // image is heicType and no watermark text
                if (isImgHeicType) {
                  image = {
                    previewBlob: URL.createObjectURL(image),
                    type: image.type,
                    uploadData: files?.[i],
                  };
                } else {
                  image = {
                    previewBlob: URL.createObjectURL(files?.[i]),
                    type: files?.[i]?.type,
                    uploadData: files?.[i],
                  };
                }
              }

              mediaFiles.push(image);
            } catch (error) {
              console.log(error);
            } finally {
              break;
            }
          }

          case "audio": {
            if (!isAudioUpload) {
              showToast("Audio file not supported", "error");
              break;
            }

            let sound = {};

            if (files[i].isRecordredAudio) {
              sound["previewBlob"] = files[i].blobURL;
              sound["uploadData"] = { ...files[i], type: "audio/*" };
              sound["type"] = "audio/*";
              sound["isRecordredAudio"] = true;
            } else {
              sound = {
                previewBlob: URL.createObjectURL(files[i]),
                uploadData: files[i],
                type: files[i].type,
              };
            }

            mediaFiles.push(sound);
            break;
          }

          case "video": {
            let video = {
              previewBlob: URL.createObjectURL(files[i]),
              uploadData: files[i],
              type: files[i].type,
            };

            mediaFiles.push(video);
            break;
          }

          case "application": {
            if (pageName === "feedPage" || !isPdfUpload) {
              showToast("Upload only video or images files", "error");
              break;
            }

            if (!files?.[i]?.type?.includes("pdf")) {
              showToast("Only pdf type document is allowed.", "error");
              break;
            }

            let document = {
              previewBlob: URL.createObjectURL(files[i]),
              uploadData: files[i],
              type: "doc",
            };

            mediaFiles.push(document);
            break;
          }

          default:
            break;
        }
      }

      resolve({ mediaFiles, error: false });
    } catch (error) {
      console.log(error);
      resolve({ error: true });
    }
  });
};
