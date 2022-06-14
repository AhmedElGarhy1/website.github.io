// all intializing variables here

const bars = document.querySelector(".bars");
const header = document.querySelector(".header");
const icons = document.querySelectorAll(".nav__bar li");
const mega = document.querySelector(".mega-section");
const other = document.getElementById("other");
const links = document.querySelectorAll(".links li");
let up = document.getElementById("scroll-to-top");
const allSections = document.querySelectorAll("section");
const moon = document.getElementById("dark");
const artice = document.getElementById("article");
const ourSkills = document.getElementById("our-skills");
const stats = document.getElementById("stats");
const sections = document.querySelectorAll("section:not(:first-child)");
const statNums = document.querySelectorAll(".stats .box .number");
const progressBars = document.querySelectorAll(".progress span");
const day = document.getElementById("days");
const hour = document.getElementById("hours");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");
const lis = document.querySelectorAll(".videos .info li");
const MovSlider = document.querySelector(".videos .contaner .imgs");
const images = document.querySelectorAll(".videos .contaner img");
const virtual = document.querySelector(".videos .contaner .virtual");
const articleContaner = document.getElementById("article-contaner");

// start header section
icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    header.classList.remove("custom-phone-headding");
  });
});
bars.addEventListener("click", openList);
header.style.width = `${innerWidth}px`;
// end header section

// start mega section
other.addEventListener("click", () => {
  if (other.clientWidth >= 100 && other.clientWidth <= 200)
    mega.classList.toggle("active-mega-section");
  else mega.classList.remove("active-mega-section");
});
links.forEach((link) => {
  link.addEventListener("click", () => {
    mega.classList.remove("active-mega-section");
  });
});
// end mega section

//  start scroll to top
up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
window.addEventListener("scroll", () => {
  if (scrollY >= artice.offsetTop) {
    up.style.right = `15px`;
    up.style.bottom = `30px`;
  } else {
    up.style.right = `-60px`;
    up.style.bottom = `-30px`;
  }
});
//  end scroll to top

// start dark mode not completed (need some styles)
moon.addEventListener("click", () => {
  allSections.forEach((sec) => {
    sec.classList.toggle("dark-mode");
  });
});
// end dark mode

// start move effect of sections

window.addEventListener("scroll", () => {
  if (innerWidth >= 768) {
    moveSkillSection();
    sections.forEach((sec) => moveSection(sec));
  } else {
    sections.forEach((ele) => {
      ele.style.paddingTop = "var(--section-padding)";
      ele.style.opacity = "1";
    });
    moveSkills();
  }
  moveStatsSection();
});
// end move effect of sections

// start phone slider articel
let pos = 0;
let isSmall = false;
let rightArrow = document.createElement("i");
let leftArrow = document.createElement("i");
styleSliderArrows();
smallSlider();
// end phone slider articel

// start skills seciton

moveSkillSection();
// end skills seciton

// start stats section

// end stats section

// start event time section

let eventDate = new Date("June 26, 2022 8:45:55").getTime();

let handler = setInterval(coolDown, 1000);
// end event time section

//                                defiend it below
window.addEventListener("resize", dealingWithRisizing);

// start videos section

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", () => {
    let num = i * -100;
    console.log(num);
    moveSlider(num);
  });
}

let MovPos = 0;

images.forEach((image) => {
  image.style.width = `${virtual.clientWidth}px`;
});

go();

// start videos section

function openList() {
  header.classList.toggle("custom-phone-headding");
}

function moveSection(ele) {
  if (scrollY >= ele.offsetTop - innerHeight + 200) {
    ele.style.paddingTop = "var(--section-padding)";
    ele.style.opacity = "1";
  } else {
    ele.style.paddingTop = "400px";
    ele.style.opacity = "0";
  }
}
// --------------------------------------

function styleSliderArrows() {
  rightArrow.className = "fas fa-long-arrow-alt-right arrow";
  rightArrow.style.right = "100px";
  leftArrow.className = "fas fa-long-arrow-alt-left arrow";
  leftArrow.style.left = "100px";
  leftArrow.addEventListener("click", moveLeft);
  rightArrow.addEventListener("click", moveRight);
}
// i called it above
function smallSlider() {
  if (this.innerWidth <= 590) {
    const num = document.querySelectorAll(".article .card").length;
    articleContaner.style.width = `${num}00%`;
    articleContaner.classList.add("article-contaner-slider");
    artice.appendChild(leftArrow);
    artice.appendChild(rightArrow);
  } else {
    leftArrow.remove();
    rightArrow.remove();
    articleContaner.classList.remove("article-contaner-slider");

    articleContaner.style.width = `100%`;
  }
}

function moveLeft() {
  pos += 100;
  if (pos > 0) pos = -700;
  articleContaner.style.left = `${pos}%`;
}
function moveRight() {
  pos -= 100;
  if (pos < -700) pos = 0;
  articleContaner.style.left = `${pos}%`;
}

// --------------------------------------

function moveSkillSection() {
  moveSection(ourSkills);
  moveSkills();
}
function moveSkills() {
  if (scrollY >= ourSkills.offsetTop - innerHeight + 200) {
    progressBars.forEach((ele) => {
      ele.style.width = `${ele.getAttribute("data-progress")}%`;
    });
  } else {
    progressBars.forEach((ele) => {
      ele.style.width = `0`;
    });
  }
}
// --------------------------------------

function coolDown() {
  let nowDate = new Date().getTime();
  let diff = eventDate - nowDate;
  let d = Math.floor(diff / 1000 / 60 / 60 / 24);
  let h = Math.floor(diff / 1000 / 60 / 60) % 24;
  let m = Math.floor(diff / 1000 / 60) % 60;
  let s = Math.floor(diff / 1000) % 60;
  if (d < 0) {
    d = 0;
    h = 0;
    m = 0;
    s = 0;
  }
  day.innerHTML = d;
  hour.innerHTML = h;
  minute.innerHTML = m;
  second.innerHTML = s;
}
// --------------------------------------

let hand;
function removeColor(num) {
  lis.forEach((li) => {
    li.classList.remove("clicked-slider");
  });
  if (num != 0) {
    num *= -1;
    num /= 100;
  }
  lis[num].classList.add("clicked-slider");
}
function go() {
  hand = setInterval(() => {
    MovPos -= 100;
    if (MovPos < -600) MovPos = 0;
    MovSlider.style.left = `${MovPos}%`;
    removeColor(MovPos);
  }, 3000);
  removeColor(MovPos);
}

function moveSlider(num) {
  MovSlider.style.left = `${num}%`;
  clearInterval(hand);
  MovPos = num;
  go();
}

// lis.forEach((li) => {
//   li.addEventListener("click", (pressd) => {
//     let place = lis.
//     console.log(place);
//     MovSlider.style.left = `0%`;
//     clearInterval(hand);
//     MovPos = 0;
//     go();
//   });
// });

// start stats section

let isThere = false;
function moveStatsSection() {
  if (scrollY >= stats.offsetTop - innerHeight + 200) {
    if (!isThere) {
      statNums.forEach((ele) => rise(ele));
    }
    isThere = true;
  } else {
    statNums.forEach((ele) => {
      ele.textContent = 0;
    });
    isThere = false;
  }
}

function rise(ele) {
  const goal = ele.getAttribute("data-num");
  let n = 0;
  if (ele != statNums[3]) {
    let holder = setInterval(() => {
      ele.textContent++;
      if (Number(ele.textContent) >= goal) {
        clearInterval(holder);
        ele.textContent = goal;
      }
    }, 2000 / goal);
  } else {
    let holder = setInterval(() => {
      n++;
      ele.textContent = `${n}K`;
      if (n >= goal) {
        clearInterval(holder);
      }
    }, 2000 / goal);
  }
}

function dealingWithRisizing() {
  header.style.width = `${innerWidth}px`;
  images.forEach((image) => {
    image.style.width = `${virtual.clientWidth}px`;
  });

  smallSlider();
}
dealingWithRisizing();
