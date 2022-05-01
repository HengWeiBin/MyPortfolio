import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';

function Works() {
    let data = require("./json/portfolio.json");
    const [isMobile, setIsMobile] = useState(true);

    //sort date according to date
    const sortedData = data.sort((a, b) => Date.parse(a.date_end) > Date.parse(b.date_end) ? -1 : 1);
    const items = sortedData.filter((item) => item.title !== "null");

    const mobileComponent = () => (
        <div id='works_area'>
            {
                items.map((item, index) => {
                    let link = !(item.link === '#');
                    return (
                        <div key={index} id={`work${index}`} className="container align-items-center card default-gradient">
                            <div className="row">
                                <img className="work_pic" src={process.env.PUBLIC_URL + '/' + item.image_dir} loading="lazy" alt={"Work Picture " + index}/>
                            </div>
                            <div className="row justify-content-center">
                                <h1 className="title">{item.title}</h1>
                                <p className="description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                {link && <a className="description desc_button" href={item.link} target="_blank" rel="noreferrer">前往查看 {">"}</a>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );

    const desktopComponent = () => (
        <div id='works_area'>
            {
                items.map((item, index) => {
                    let link = !(item.link === '#');
                    return (
                        <div key={index} id={`work${index}`} className="container card default-gradient">
                            <div className="row align-items-start">
                                <div className="col-md-6 wow bounceInLeft">
                                    <img className="work_pic" src={process.env.PUBLIC_URL + '/' + item.image_dir} loading="lazy" alt={"Work Picture " + index}/>
                                    <p className="item_description">{`(${item.date_start}-${item.date_end})`}</p>
                                </div>
                                <div className="col-md-6 wow bounceInRight">
                                    <h1 className="title">{item.title}</h1>
                                    <p className="description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    {link && <a className="description desc_button" href={item.link} target="_blank" rel="noreferrer">前往查看 {">"}</a>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );

    useEffect(() => {
        function updateResize() {
            if (window.innerWidth < 768)
                setIsMobile(true);
            else setIsMobile(false);
        }
        updateResize();
        window.addEventListener("resize", updateResize);

        return () => window.removeEventListener("resize", updateResize);
    }, [])

    return (
        isMobile ? (
            <div>
                {mobileComponent()}
            </div>
        ) : (
            <div>
                {desktopComponent()}
            </div>
        )
    );
}

function Profile() {

    let PublicURL = process.env.PUBLIC_URL;

    const [isMobile, setIsMobile] = useState(true);
    const [isScrollDown, setIsScrollDown] = useState(false);

    useEffect(() => {
        function updateResize() {
            if (window.innerWidth < 768)
                setIsMobile(true);
            else setIsMobile(false);
        }

        function updateScrollEffect() {
            if (document.getElementById("works_area").getBoundingClientRect().y < 100) {
                setIsScrollDown(true);
            } else setIsScrollDown(false);
        }

        updateResize();
        window.addEventListener("resize", updateResize);
        window.addEventListener("scroll", updateScrollEffect);

        return () => {
            window.removeEventListener("resize", updateResize);
            window.removeEventListener("scroll", updateScrollEffect);
        }
    }, [])

    let description;
    let profileAreaClass = isScrollDown ? "row profile_area default-bg-color d-fadeout" : "row profile_area default-bg-color";
    if (isMobile) {
        description = `該上班上班，該睡覺睡覺`;
    } else {
        description = `我來自馬來西亞柔佛州，出生於一個平凡的小康之家。
        自我多年前赴臺留學之後，妹妹中學畢業選擇出國留學，也因爲一場疫情，家人們都分散在世界各地。
        因爲疫情影響，各國紛紛限制出入境，爸爸直接搬到了新加披工作賺錢。
        身爲長子的我，爲了不增加家人的負擔，中學畢業後一向獨立自主，靠自己的力量留學台灣，
        堅定的意念讓我剋服了很多挑戰，在養活自己的同時成功的從餐飲管理科轉換到資訊工程這條跑道。`;
    }


    return (
        <div className='container default-gradient'>
            <div id="profile" className={profileAreaClass}>
                <div className="container row align-items-center profile default-bg-color">
                    <img className="col-md-5 col-8 col-lg-4" src={PublicURL + "/img/portrait.jpg"} alt="Portrait"/>
                    <div className="col-sm-12 col-md-6 col-lg-7 align-items-center profile_detail">
                        <h1 className="row justify-content-center title">Hi! I'm Wayne<br />王偉斌</h1>
                        <p className="row justify-content-center subtitle">國立臺北科技大學<br />資訊工程系</p>
                        <div className="profile_button">
                            <a title="Leetcode" href="https://leetcode.com/hengweibin1898/" target="_blank" rel="noreferrer"><img
                                className="hover_scale" src={PublicURL + "/img/icon_leetcode.png"} alt="Leetcode"/></a>
                            <a title="104履歷" href={PublicURL + "/104.pdf"} target="_blank" rel="noreferrer"><img
                                className="hover_scale" src={PublicURL + "/img/icon_104.png"} alt="104 resume"/></a>
                            <a title="Github" href="https://github.com/HengWeiBin" target="_blank" rel="noreferrer"><img
                                className="hover_scale" src={PublicURL + "/img/icon_github.png"} alt="Github"/></a>
                            <a title="Facebook" href="https://www.facebook.com/weibin1898/" target="_blank" rel="noreferrer"><img
                                className="hover_scale" src={PublicURL + "/img/icon_facebook.png"} alt="Facebook"/></a>
                            <a title="Instagram" href="https://www.instagram.com/wei_bin/" target="_blank" rel="noreferrer"><img
                                className="hover_scale" src={PublicURL + "/img/icon_instagram.png"} alt="Instagram"/></a>
                        </div>
                        <p id="profile_desc" className="description">&emsp;{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Offset100vh() {
    return (
        <div className="row offset100vh" />
    );
}

export default function Home() {
    return (
        <>
            <Profile />
            <Offset100vh />
            <Works />
        </>
    )
}