import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SocialPanel() {
    const location = useLocation();
    const isAboutPage = location.pathname === "/about";
    const isHome = location.pathname === "/";
    return (
        <div className={`social-panel ${!isHome ? "not-home" : ""}`}>
            <button
                className="email-button"
                onClick={() => {
                    const email = atob("YWlrdXlhbmdAZ21haWwuY29t");
                    window.location.href = `mailto:${email}`;
                }}
            >
                CONTACT
            </button>
            <a
                className="support-button"
                href="https://aikuy.gumroad.com/l/support"
                target="_blank"
                rel="noopener noreferrer"
            >
                SUPPORT
            </a>
            <Link
                to="/about"
                className={`about-button ${isAboutPage ? "active" : ""}`}
            >
                ABOUT
            </Link>
            <Link
                to="/"
                className={`about-button ${isHome ? "active" : ""}`}
            >
                TOP
            </Link>
        </div>
    );
}
