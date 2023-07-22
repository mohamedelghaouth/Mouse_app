/** @format */
var socket = io("ws://localhost:3000");

var div;
var offset = [];
var mousePosition;
var isDown = false;

div = document.createElement("div");
div.setAttribute("id", "main");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "blue";

document.body.appendChild(div);

div.addEventListener("mousedown", (e) => {
  isDown = true;
  offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
});

div.addEventListener("mouseup", (e) => {
  isDown = false;
});
div.addEventListener("mousemove", (e) => {
  if (isDown) {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    div.style.left = mousePosition.x + offset[0] + "px";
    div.style.top = mousePosition.y + offset[1] + "px";
    socket.emit("div moved", {
      x: div.style.left,
      y: div.style.top,
    });
  }
});

socket.on("div moved", function (position) {
  let elm = document.getElementById("main");

  elm.style.left = position.x;
  elm.style.top = position.y;
});
