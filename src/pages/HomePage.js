import React from "react";
import Controller from "../components/Controller";
import Viewer from "../components/Viewer";

export default function HomePage(){
  return (<div style = {{
    minHeight: '360px',
  }}>
    <Viewer></Viewer>
    <Controller></Controller>
  </div>);
}