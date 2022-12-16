import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import images from "../../constants/ImageConstant";

import "../scss/footer.scss";

type SocialItemProps = {
  image?: string;
  url: string;
  title: string;
};

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const navigate = useNavigate();
  const socials = [
    {
      title: "Instagram",
      image: "/assets/social/youtube.svg",
      url: "https://www.instagram.com/talkingtoteens/",
    },
    {
      title: "Youtube",
      image: "/assets/social/youtube.svg",
      url: "https://www.youtube.com/channel/UCJQL2s1SljDWpVvXa5x0dyA",
    },
    {
      title: "twitter",
      image: "/assets/social/youtube.svg",
      url: "https://twitter.com/itsandyearle",
    },
    {
      title: "pinterest",
      image: "/assets/social/youtube.svg",
      url: "https://www.pinterest.com/talkingtoteens/",
    },
    {
      title: "facebook",
      image: "/assets/social/youtube.svg",
      url: "https://www.facebook.com/talkingtoteenspodcast/",
    },
  ];

  return (
    <footer className="footer-section">
      <div className="box-bg">
        <div className="footer-container m-auto">
          <div className="row footer-left-main justify-content-around ">
            <div className="col-12 col-lg-6 justify-content-center row">
              <div className="col-auto my-auto my-md-0"></div>
              <div className="col-lg mt-3 mt-md-0 text-center text-md-start w-auto">
                <div className="align-items-baseline d-md-flex d-none g-0 gap-2 py-3 row">
                  <div className="col-auto">
                    <h6>Follow us on</h6>
                  </div>

                  <div className="col-auto">
                    <a
                      className="link-color"
                      href="https://www.facebook.com/talkingtoteenspodcast/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  </div>
                  <div className="col-auto">
                    <a
                      className="link-color"
                      href="https://www.linkedin.com/company/talkingtoteens/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="col-auto">
                    <a
                      className="link-color"
                      target="_blank"
                      href="https://www.instagram.com/talkingtoteens/"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="col-auto">
                    <a
                      className="link-color"
                      target="_blank"
                      href="https://twitter.com/itsandyearle"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                  </div>
                  <div className="col-auto">
                    <a
                      className="link-color"
                      target="_blank"
                      href="https://www.youtube.com/channel/UCJQL2s1SljDWpVvXa5x0dyA"
                      rel="noreferrer"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-4 mt-md-0 text-center text-lg-start">
              <div className="justify-content-xl-end link-section row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xl-3">
                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/home");
                    }}
                  >
                    Home
                  </button>
                </div>
                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/podcast");
                    }}
                  >
                    Menu 2
                  </button>
                </div>

                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/membership");
                    }}
                  >
                    Menu 3
                  </button>
                </div>

                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Menu 4
                  </button>
                </div>
                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Menu 5
                  </button>
                </div>

                <div className="col py-2">
                  <button
                    className="menu-color border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Menu 6
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
