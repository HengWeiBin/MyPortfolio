"use strict";
let deviceWidth = document.documentElement.clientWidth;
let deviceHeight = document.documentElement.clientHeight;

$(document).ready(main);

//handle activity when browser resize
window.onresize = function () {
    deviceWidth = document.documentElement.clientWidth;
    deviceHeight = document.documentElement.clientHeight;
    main();
};

async function readJson(dir) {
    try {
        let data = await fetch(dir);
        data = await data.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function PrintWorks() {
    let works = "";
    let data = await readJson("json/portfolio.json");

    //sort date according to date
    data.sort((a, b) => Date.parse(a.date_end) > Date.parse(b.date_end) ? -1 : 1);

    for (let i = 0; i < data.length - 1; i++) {
        let work, link = "";

        if (data[i].link != "#") {
            link = `<a class="description" href="${data[i].link}" target="_blank">前往查看 ></a>`;
        }

        if (deviceWidth < 768) { //手機界面
            work = `<div id="work${i}" class="container align-items-center card default-gradient">
                        <div class="row">
                            <img class="work_pic" src="${data[i].image_dir}">
                        </div>
                        <div class="row justify-content-center">
                            <h1 class="title">${data[i].title}</h1>
                            <p class="description">${data[i].description}</p>
                            ${link}
                        </div>
                    </div>
                    `
        } else {
            work = `<div id="work${i}" class="container card default-gradient">
                        <div class="row align-items-start">
                            <div class="col-md-6 wow bounceInLeft">
                                <img class="work_pic" src="${data[i].image_dir}">
                                <p class="item_description">(${data[i].date_start}-${data[i].date_end})</p>
                            </div>
                            <div class="col-md-6 wow bounceInRight">
                                <h1 class="title">${data[i].title}</h1>
                                <p class="description">${data[i].description}</p>
                                ${link}
                            </div>
                        </div>
                    </div>
                    `
        }
        works += work;
    }

    $("#works_area").html(works);
}

async function PrintCertificates() {
    let data = await readJson("json/certificates.json");
    let works = "";

    //sort date according to date
    data.sort((a, b) => Date.parse(a.date) > Date.parse(b.date) ? -1 : 1);

    for (let i = 0; i < data.length - 1; i++) {
        let work;
        if (deviceWidth < 768) {
            work = `<div>
                        <img class="d-block w-100" src="${data[i].image_dir}" alt="${data[i].title}">
                        <h1 class="title_certificate">${data[i].title}</h1>
                        <hr>
                        <p class="item_description">${data[i].date}</p>
                    </div>
                    `
        } else {
            work = `<div id="certificate" class="wow slideInUp">
                        <img class="d-block w-100 hover_scale" src="${data[i].image_dir}" alt="${data[i].title}">
                        <h1 class="title_certificate">${data[i].title}</h1>
                        <hr>
                        <p class="item_description">${data[i].date}</p>
                    </div>
                    `
        }
        works += work;
    }

    $("#certificates").html(works);
}

//footer 畫綫
function DrawFooterLine(event) {
    let canvas = document.getElementById('line');
    let ctx = canvas.getContext("2d");

    canvas.height = 150;
    canvas.width = 300;

    if (deviceWidth >= 990) {   // draw vertical line in computer webside
        ctx.beginPath()
        ctx.moveTo(300, 40)
        ctx.lineTo(300, 110)
    }
    else if (deviceWidth >= 768) {   // draw vertical line in tab webside
        ctx.beginPath()
        ctx.moveTo(280, 40)
        ctx.lineTo(280, 110)
    }
    else {   //draw horizontal line in phone website
        canvas.height = 15;
        ctx.beginPath()
        ctx.moveTo(30, 7)
        ctx.lineTo(260, 7)
    }
    ctx.strokeStyle = "white"
    ctx.stroke()

};

function NavbarButtonControl(event) {
    let destination;
    if (event.data == "portfolio") destination = "works_area";
    else if (event.data == "contact") destination = "foot_logo";

    //Redirect to home page if this link is clicked at another page
    if (event.data != "contact" && !(location.pathname.endsWith("/index.html") || location.pathname.endsWith("/"))) {
        window.location.href = `index.html#${destination}`;
    }
    //else scroll to destination
    $('html, body').animate({
        scrollTop: $(`#${destination}`).offset().top - 85
    }, 500);
}

function NavbarButtonEffect(event) {
    if (/certificate.html/.test(window.location.href)) {
        $("#certificate_link").addClass("nav_clicked")

    } else if ((location.pathname.endsWith("/index.html") || location.pathname.endsWith("/")) && event) {
        if (this.scrollY > $("#works_area").offset().top - 100) {
            $(".profile_area").addClass("d-fadeout");//hide profile area when scroll down
            $("#portfolio_link").addClass("nav_clicked");// Show "clicked(作品集)" on navbar when user reached bottom
        } else {
            $(".profile_area").removeClass("d-fadeout");
            $("#portfolio_link").removeClass("nav_clicked");
        }
    }
    // Show "clicked(聯絡方式)" on navbar when user reached bottom
    if (event && this.scrollY >= document.documentElement.scrollHeight - deviceHeight - 1) {
        $("#contact_link").addClass("nav_clicked");
    } else {
        $("#contact_link").removeClass("nav_clicked");
    }

    //show go top when user scroll down more than 500unit
    if (event && this.scrollY > 500) {
        $("#goTopBtn").removeClass("d-none");
    } else {
        $("#goTopBtn").addClass("d-none");
    }
}

function showCountryCode() {
    $.get("https://ipinfo.io", function (response) {
        console.log(response.city, response.country);
        $(".location p").html(response.country);
    },
        "jsonp");
}

function initListener() {
    //hamburger button animation
    $('.first-button').on('click', function () {

        $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {

        $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {

        $('.animated-icon3').toggleClass('open');
    });

    //scroll listener
    window.addEventListener("scroll", NavbarButtonEffect);

    //navbar button listener
    $("#portfolio_link").click("portfolio", NavbarButtonControl);
    $("#contact_link").click("contact", NavbarButtonControl);
    $("#goTopBtn").click(function () { $('html, body').animate({ scrollTop: 0 }, 500); });
}

function checkHashTag() {
    //go to specific id if herf contain hashtag
    if (location.hash != "") {
        $('html, body').animate({
            scrollTop: $(location.hash).offset().top - 85
        }, 500);
    }
}

function showProfileDescription() {
    if (deviceWidth > 768) {
        $("#profile_desc").html(`&emsp;我來自馬來西亞柔佛州，出生於一個平凡的小康之家。
    自我多年前赴臺留學之後，妹妹中學畢業選擇出國留學，也因爲一場疫情，家人們都分散在世界各地。
    因爲疫情影響，各國紛紛限制出入境，爸爸直接搬到了新加披工作賺錢。
    身爲長子的我，爲了不增加家人的負擔，中學畢業後一向獨立自主，靠自己的力量留學台灣，
    堅定的意念讓我剋服了很多挑戰，在養活自己的同時成功的從餐飲管理科轉換到資訊工程這條跑道。`);
    } else {
        $("#profile_desc").html(`該上班上班，該睡覺睡覺`);
    }
}

async function main() {
    if (location.pathname.endsWith("/index.html") || location.pathname.endsWith("/")) {
        await PrintWorks();
    } else if (location.pathname.endsWith("/certificate.html")) {
        await PrintCertificates();
    }

    NavbarButtonEffect();

    new WOW().init();

    showCountryCode();

    showProfileDescription();

    initListener();

    DrawFooterLine();

    checkHashTag();
}