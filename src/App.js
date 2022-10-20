import React from "react";
import SideBar from "./Component/SideBar/SideBar";
import MainContent from "./Component/MainContent/MainContent";
import "./App.css";
import "./Component/SideBar/SideBar.css";
import "./Component/MainContent/MainContent.css";
import "./Component/OnClickDay/OnClickDay.css";

export default function App() {
  return (
    <div className="container">
      <SideBar />
      <MainContent />
    </div>
  );
}
