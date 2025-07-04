document.addEventListener('DOMContentLoaded', function() {
  // Variaveis para o relogio digital
  const watchTime = document.getElementById('watch-time');

  // Variaveis para o relogio analogico
  const hours_pointer = document.getElementById('hours_pointer');
  const minutes_pointer = document.getElementById('minutes_pointer');
  const seconds_pointer = document.getElementById('seconds_pointer');

  // Variaveis para o cronometro
  const start = document.getElementById("btn-start");
  const stop = document.getElementById("btn-stop");
  const reset = document.getElementById("btn-reset");

  function updateTime() {
    const now = new Date();

    // const hours = now.getHours();
    const hours = 23;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    watchTime.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    const analogic_seconds = seconds * 360 / 60;
    const analogic_minutes = ((minutes * 60) + (seconds/60)) * (360 / 3600);
    const analogic_hours = (hours_adjustment(hours) + minutes/60) * (360 / 12);


    // console.log(analogic_hours);
    setRotation(seconds_pointer, analogic_seconds);
    setRotation(minutes_pointer, analogic_minutes);
    setRotation(hours_pointer, analogic_hours);
  }

  function pad(number) {
    return number < 10 ? `0${number}` : number;
  }

  const setRotation = (element, rotationPorcentage) => {
    element.style.setProperty("--rotation", rotationPorcentage);
  };

  function hours_adjustment(number) {
    return number < 13 ? number : (number-12);
  }

  // Update the time every second
  setInterval(updateTime, 1000);

  updateTime();

    let appendMsec = document.getElementById("dec");
    let appendSec = document.getElementById("sec");
    let appendMin = document.getElementById("min");
    let appendHour = document.getElementById("hr");

    
  let msec = 0;
  let seconds = 0;
  let minutes = 0;
  let hour = 0;
  let counter;
  
  start.onclick = function(){
      clearInterval(counter);
      counter = setInterval(startCounting,10);
  }
  stop.onclick = function(){
      clearInterval(counter);
  }
  reset.onclick = function(){
      clearInterval(counter);
      appendMsec.innerHTML = "00";
      appendSec.innerHTML = "00";
      appendMin.innerHTML = "00";
      appendHour.innerHTML = "00";
  }
  function startCounting(){
      // console.log(hour + ":" + minutes + ":" + seconds + ":" + msec);
      msec++;
      if(msec <= 9){
          appendMsec.innerHTML = "0" + msec;
      } else if(msec > 9 && msec <= 99) {
          appendMsec.innerHTML = msec;
      } else {
          msec = 0;
          appendMsec.innerHTML = "00";
          seconds++;
          if(seconds <= 9){
              appendSec.innerHTML = "0" + seconds;
          }else if(seconds > 9 && seconds < 60){
              appendSec.innerHTML = seconds;
          }else {
              seconds = 0;
              appendSec.innerHTML = "00";
              minutes++;
              if(minutes <= 9){
                  appendMin.innerHTML = "0" + minutes;
              }else if(minutes > 9 && minutes < 60){
                  appendMin.innerHTML = minutes;
              }else {
                  minutes = 0;
                  appendMin.innerHTML = "00";
                  hour++;
                  if(hour <= 9){
                      appendHour.innerHTML = "0" + hour;
                  }else {
                      appendHour.innerHTML = hour;
                  }
              }
          }
      }
  }
});