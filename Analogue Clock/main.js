let canvas = document.getElementById('canvas');
let clock = canvas.getContext('2d');
let radius = canvas.height / 2;
clock.translate(radius, radius);
radius = radius * 0.90;

setInterval(drawClock, 1000);

function drawClock(){
    drawFace(clock, radius);
    drawNumbers(clock, radius);
    drawTime(clock, radius);
}

function drawFace(clock, radius){
    
    let grad;

    clock.beginPath();
    clock.arc(0,0,radius,0,2*Math.PI);
    clock.fillStyle = "White";
    clock.fill();

    grad = clock.createRadialGradient(0,0,radius*0.5, 0,0,radius*1.95);
    grad.addColorStop(0.5, 'Red');

    clock.strokeStyle = grad;
    clock.lineWidth = radius*0.1;
    clock.stroke(); 

    clock.beginPath();
    clock.arc(0,0, radius*0.1,0,2*Math.PI);
    clock.fillStyle = 'Purple';
    clock.fill();
}

function drawNumbers(clock, radius) {
    
    let ang;
    let num;

    clock.font = radius*0.15 + "px arial"; 
    clock.textBaseline = "middle"; 
    clock.textAlign = "center"; 

    for(num=1; num < 13; num++){
        ang = num *Math.PI /6;
        clock.rotate(ang);
        clock.translate(0, -radius*0.85);
        clock.rotate(-ang);
        clock.fillText(num.toString(), 0, 0);
        clock.rotate(ang);
        clock.translate(0, radius*0.85);
        clock.rotate(-ang);
    }
}

function drawTime(clock, radius){

    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    
    hour = hour%12;
    
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    
    drawHand(clock, hour, radius*0.5, radius*0.07);
    
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    
    drawHand(clock, minute, radius*0.7, radius*0.07);
    
    second=(second*Math.PI/30);
    
    drawHand(clock, second, radius*0.85, radius*0.02);
}

function drawHand(clock, pos, length, width){
    clock.beginPath();
    clock.lineWidth = width;
    clock.lineCap = "square";
    clock.moveTo(0,0);
    clock.rotate(pos);
    clock.lineTo(0, -length);
    clock.stroke();
    clock.rotate(-pos);
}