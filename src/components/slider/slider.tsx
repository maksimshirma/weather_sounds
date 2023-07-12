import React from "react";
import "./slider.style.scss";

interface ISlider {
    setVolume: (volume: number) => void
}

export const Slider = ({ setVolume }: ISlider): React.ReactNode => { 
    const handleMouseDown = (event: any) => {
        event.preventDefault();
        
        const thumb = event.target;
        const slider = event.target.closest(".slider");
        const width = slider.clientWidth;

        let shiftX = event.clientX - thumb.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event: any) {
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

            if (newLeft < 0) {
              newLeft = 0;
            }
            if (newLeft > width) {
              newLeft = width;
            }

            thumb.style.left = newLeft + 'px';
            setVolume(Math.round(newLeft / width * 100));
        }

        function onMouseUp() {
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
        }
    }

    return (
        <div className="slider">
            <div className="thumb" onMouseDown={handleMouseDown} onDragStart={() => false}></div>
        </div>
    );
}