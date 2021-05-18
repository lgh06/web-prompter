import React from "react";
import Setting from "../components/Setting";
import Viewer from "../components/Viewer";

export default function HomePage(){
  return (<div style = {{
    minHeight: '360px',
  }}>
    <Viewer></Viewer>
    <Setting></Setting>
  </div>);
}