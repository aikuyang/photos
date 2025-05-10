import React from "react";
import SocialPanel from "./SocialPanel";
import "./AboutPage.scss";

export default function AboutPage() {
    return (
        <div className="about-wrapper">
            <div className="about-page">
                <h1>のんびり風景写真を楽しんでます</h1>
                <p>想拍就拍。</p>
            </div>
            <SocialPanel />
        </div>
    );
}
