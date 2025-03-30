import React from "react";
import InfiniteScrollImageGallery from "../components/InfiniteScroll";
import Navbar from "../components/Navbar";

const Photos = () => {
  return (
    <div>
      <Navbar></Navbar>
      <br />
      <br />
      <br />
      <br />
      <InfiniteScrollImageGallery />
    </div>
  );
};

export default Photos;
