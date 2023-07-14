import React, { useState, useEffect, useRef } from "react";
import { WeatherType } from "../../types";
import { IBox } from "../../interfaces";
import "./box.styles.scss";

export const Box:React.FC<IBox> = ({ type, active, volume }) => {
    const [isPause, setPause] = useState<boolean>(true);
    const myRef = useRef<HTMLAudioElement>();

    const getSound = (): string => {
        if (type === "summer" || type === "winter") return type;
        return "rain"; 
    }

    const togglePause = (): void => {
        if (isPause) {
            myRef.current.play();
        } else {
            myRef.current.pause();
        }
        setPause(prevState => !prevState);
    }

    useEffect((): void => {
        setPause(true);
        myRef.current.pause();
        myRef.current.currentTime = 0.0;
    }, [active]);

    useEffect((): void => {
        myRef.current.volume = volume / 100;
    }, [volume]);

    return (
        <div id={type} className={"box " + `box__${type}`} onClick={togglePause}>
            <audio preload="auto" src={`./${getSound()}.mp3`} ref={myRef} />
            { active === type ? (
                    <div className={"box-icon " + (isPause ? "box-icon__pause" : `box-icon__weather__${type}`)}></div>
                ) : (
                    <div className={"box-icon " + `box-icon__weather__${type}`}></div>
                )
            }
            
        </div>
    );
}