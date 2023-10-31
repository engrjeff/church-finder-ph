"use client";

import React from "react";

import { envVars } from "@/lib/site";

const uploadUrl = `https://api.cloudinary.com/v1_1/${envVars.cloudinaryCloudName}/image/upload`;

export default function useFileUpload() {
  const [loading, setLoading] = React.useState(false);

  const uploadFiles = async (files: File[]) => {
    try {
      setLoading(true);

      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();

          data.append("file", file);
          data.append("upload_preset", envVars.cloudinaryUploadPreset);
          data.append("cloud_name", envVars.cloudinaryCloudName);
          data.append("folder", envVars.cloudinaryUploadFolder);

          const response = await fetch(uploadUrl, {
            method: "POST",
            body: data,
          });

          const res = await response.json();

          console.log(res);

          return {
            name: [res.original_filename, res.format].join("."),
            size: res.bytes as number,
            url: res.url as string,
            type: "image",
          };
        })
      ).then((values) => values);

      setLoading(false);

      return uploadedFiles;
    } catch (error) {
      setLoading(false);
    }
  };

  return { uploadFiles, loading };
}
