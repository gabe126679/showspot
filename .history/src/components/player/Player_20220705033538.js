import React, {useState, useRef, useEffect} from 'react'
import Controls from './Controls';


function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div className="c-player">
            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
            {/* <h4>Playing now</h4> */}

            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <div className="c-test">
                Next up: 
                <button  className="btn btn-primary">{props.songs[props.nextSongIndex].title}</button> 
                <p>by</p> 
                <button className="btn btn-primary">{props.songs[props.nextSongIndex].artist}</button>
                {/* <button className="btn btn-primary" onClick={
                    () => {
                        console.log(props.songs)
                    }
                }>hello</button> */}
            </div>

        </div>
    )
}

export default Player;
