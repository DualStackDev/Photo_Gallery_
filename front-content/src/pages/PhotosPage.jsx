import React from "react";
import InfiniteScrollImageGallery from "../components/InfiniteScroll";
import GalleryNavbar from "../components/GalleryNavbar";
import { useParams } from "react-router-dom";

const Photos = () => {
  const { folderName } = useParams();

  return (
    <div>
      <GalleryNavbar />
      <br />
      <br />
      <br />
      <br />
      <InfiniteScrollImageGallery folderName={folderName} />
    </div>
  );
};

export default Photos;
