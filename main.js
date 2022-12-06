x = 0;
y = 0;

draw_cookie = "";
screen_width = 0;
screen_height = 0;
cookie = "";
speak_data = "";
to_number = "";

function preload() {
  cookie = loadImage("cookie.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening...";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "Speech Recognized: " + content;
    to_number = Number(content);
    if(Number.isInteger(to_number) == true) {
      document.getElementById("status").innerHTML = "Drawing Cookie";
      draw_cookie = "set";
    }
    else{
      document.getElementById("status").innerHTML = "Speech didn't Recognize a Number";
    }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(0, 150);
}

function draw() {
  if(draw_cookie == "set"){
    for(var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(cookie,x,y,50,50)
    }
    document.getElementById("status").innerHTML = to_number + " Cookies Drawn";
    draw_cookie = "";
    speak_data = to_number + "Cookies Drawn";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
