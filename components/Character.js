import React, { useEffect, useRef } from "react";

const Character = ({ mouseX, mouseY }) => {
  const moveCharacter = () => {
    const container = document.getElementById("characterContainer");
    if (!container) return;

    const rekt = container.getBoundingClientRect();
    const anchX = rekt.left + rekt.width / 2;
    const anchY = rekt.top + rekt.height / 2;

    const angleDeg = angle(mouseX, mouseY, anchX, anchY);

    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    });
  };

  const angle = (cx, cy, ex, ey) => {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    return (rad * 180) / Math.PI;
  };

  useEffect(() => {
    moveCharacter();
  }, [mouseX, mouseY]);

  return (<>
    <div className="absolute bottom-0 left-0 w-40 hidden md:block md:w-96">
    <div className="relative">
        <img className="" id="characterContainer" src="/images/AnyaShell.png" />
        <img className="absolute eye eye-right" src="/images/r.png" />
        <img className="absolute eye eye-left" src="/images/r.png" />
    </div>
    </div>

    <img className="absolute bottom-0 left-0 w-40 md:w-96 md:hidden" id="characterContainer" src="/images/anyasTransparent.png" />

</>)

};

export default Character;
