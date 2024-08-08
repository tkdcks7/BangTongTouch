import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 컴포넌트
import { Button, ConfigProvider } from "antd";

// css 스타일
import "./InformationPage.css";

// 이미지, 동영상 소스
import BlackLogo from "../../../assets/BlackLogo.png";
import Room1 from "../../../assets/RoomCard1.png";
import Room2 from "../../../assets/RoomCard2.png";
import Room3 from "../../../assets/RoomCard3.png";
import Room4 from "../../../assets/RoomCard4.png";
import HomeExample from "../../../assets/HomeExample.jpg";
import { hover } from "@testing-library/user-event/dist/hover";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const InformationPage: React.FC = () => {
  const navigate = useNavigate();
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const countRef = useRef<HTMLSpanElement>(null);
  const [productCount, setProductCount] = useState(0);
  let animation: any = null;

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/products/count`,
    })
      .then((res) => {
        console.log(res.data);
        setProductCount(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const startCounting = () => {
    if (animation) {
      animation.stop();
    }
    animation = animate(count, 100, { duration: 3 });
  };

  const resetCount = () => {
    if (animation) {
      animation.stop();
    }
    count.set(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
          } else {
            resetCount();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
      if (animation) {
        animation.stop();
      }
    };
  }, [count]);

  // login 페이지로 이동하는 함수
  const handleLogInBtnClick = (e: any) => {
    navigate("/user/login");
  };

  const theme = {
    token: {
      colorBgTextHover: "#E9FFE7",
      colorPrimary: "#129B07",
    },
  };

  return (
    <main className="w-lvw h-lvh" id="back-ground">
      <motion.div
        className="header text-start outline-text"
        initial={{
          y: 0,
          opacity: "0%",
        }}
        whileInView={{
          y: -30,
          opacity: "100%",
        }}
        transition={{
          ease: "easeIn",
          duration: 0.5,
        }}
      >
        <h1 className="mb-3">간편한</h1>
        <h1 className="mb-3">승계생활</h1>
      </motion.div>
      <motion.div
        className="main-container"
        initial={{
          y: 0,
          opacity: "0%",
        }}
        whileInView={{
          y: -30,
          opacity: "100%",
        }}
        transition={{
          ease: "easeIn",
          duration: 0.5,
        }}
      >
        <h1 className="mb-3">
          간편한 승계생활, <span className="green">방통터치</span>와 함께
          시작하세요.
        </h1>
      </motion.div>
      <motion.div
        initial={{
          y: 0,
          opacity: "0%",
        }}
        whileInView={{
          y: -30,
          opacity: "100%",
        }}
        viewport={{ once: false }}
        transition={{
          ease: "easeIn",
          duration: 0.5,
        }}
      >
        <div className="text-center mb-10 main-container">
          <motion.h1
            initial={{
              y: 0,
              opacity: "0%",
            }}
            whileInView={{
              y: -30,
              opacity: "100%",
            }}
            viewport={{ once: false }}
          >
            현재 방통터치에는
            <motion.span id="count" viewport={{ once: false }} ref={countRef}>
              {rounded}
            </motion.span>
            개의 매물이 등록되어 있습니다.
          </motion.h1>
          <motion.ul
            className="container flex justify-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.li className="item" variants={item}>
              <img src={Room1} alt="방 1" width={"200px"} />
            </motion.li>
            <motion.li className="item" variants={item}>
              <img src={Room2} alt="방 2" width={"200px"} />
            </motion.li>
            <motion.li className="item hidden md:block" variants={item}>
              <img src={Room3} alt="방 3" width={"200px"} />
            </motion.li>
            <motion.li className="item hidden md:block" variants={item}>
              <img src={Room4} alt="방 4" width={"200px"} />
            </motion.li>
          </motion.ul>
        </div>

        <motion.div
          initial={{
            y: 0,
            opacity: "0%",
          }}
          whileInView={{
            y: -30,
            opacity: "100%",
          }}
          viewport={{ once: false }}
          transition={{
            ease: "easeIn",
            duration: 0.5,
          }}
          className="footer"
        >
          <h1 className="mb-32">
            매물을 업로드하거나, 마음에 드는 매물을 찾아보세요
          </h1>
          <Link to={"user/login"} style={{ color: "#129B07" }}>
            <motion.h1>로그인하러 가기</motion.h1>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default InformationPage;
