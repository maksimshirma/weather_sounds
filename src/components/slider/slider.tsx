import React, { MouseEventHandler } from "react";
import { ISlider } from "../../interfaces";
import "./slider.style.scss";

export const Slider: React.FC<ISlider> = ({ setVolume }) => { 
    const handleMouseDown = (event: React.MouseEvent): void => {
        event.preventDefault();
        
        const thumb = event.target as HTMLElement;
        const slider = thumb.closest(".slider");
        const width = slider.clientWidth;

        let shiftX = event.clientX - thumb.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event: MouseEvent): void {
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

        function onMouseUp(): void {
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