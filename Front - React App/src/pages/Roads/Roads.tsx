import { Link, useNavigate } from "react-router-dom";
import { RoadPath, PathButton } from "components";
import { useState } from "react";
import './Roads.css';

export const Roads = () => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";

    const navigation = useNavigate();

    const [buttonsStates, setButtonsStates] = useState([true, false, false, false]); 

    return (
        <div className="game-roads-description">
            <div className="game-roads-description__roads">
                <div className="game-roads-description__roads__names-buttons">
                    <PathButton pathName={"Path 1"} selected={true}/>
                    <PathButton pathName={"Path 2"} selected={false}/>
                    <PathButton pathName={"Path 3"} selected={false}/>
                    <PathButton pathName={"Path 4"} selected={false}/>
                </div>
                <div className="game-roads-description__roads__svgs">
                    <div className="game-roads-description__roads__svgs-path">
                        <RoadPath />
                    </div>
                </div>
            </div>
            <div className="game-roads-description__description">
                <button
                    className="game-roads-description__quit"
                    onClick={() => {
                        navigation(-1);
                    }}
                >
                    X
                </button>
                <div className="game-roads-description__description__card">
                    <div className="game-roads-description__description__card__title-container">
                        <p className="game-roads-description__description__card__title">
                            THE ROAD TO THE SUBURBS
                        </p>
                    </div>
                    <div className="game-roads-description__description__card__story">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum justo ut rutrum feugiat. Aliquam rhoncus ullamcorper nibh, lobortis laoreet ex consectetur sed.
                            Proin bibendum sollicitudin est, nec placerat elit venenatis id. Phasellus in dui consectetur justo pretium pellentesque. Praesent neque elit, consectetur quis consectetur sit amet, accumsan ut urna. 
                        </p>
                    </div>
                </div>
                <Link 
                    className="game-roads-description__description__card-button-play"
                    to={'/'}
                >
                    Play
                </Link>
            </div>
        </div>
    )
}
