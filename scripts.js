document.addEventListener('DOMContentLoaded', function() {
  const watchTime = document.getElementById('watch-time');
  const hours_pointer = document.getElementById('hours_pointer');
  const minutes_pointer = document.getElementById('minutes_pointer');
  const seconds_pointer = document.getElementById('seconds_pointer');

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
});