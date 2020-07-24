const clock = document.querySelector(".clock");
const currentTime = clock.querySelector(".currentTime");

function getTime(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  //const seconds = date.getSeconds();
  currentTime.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}`;
}

const BASE_COLOR = "#white";
const OTHER_COLOR = "#7f8c8d";

const currentClass = "currentTime";

/*this.classList.toggle(".currentTime")*/
function handleMouseOver(){
  const currentColor = currentTime.style.color;
  if(currentTime.classList.toggle(currentClass)){
    currentTime.style.color = OTHER_COLOR;
  } else {
    currentTime.style.color = BASE_COLOR;
  }
  /*  currentTime.style.color = OTHER_COLOR;
  } else {
    currentTime.style.color = BASE_COLOR;
  }
  */
};

function init(){
  currentTime.style.color = BASE_COLOR;
  //currentTime.addEventListener("mouseover", handleMouseOver);
  getTime();
  setInterval(getTime,1000);
}

init();
