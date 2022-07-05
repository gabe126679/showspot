import React from 'react';
import { Link } from 'react-router-dom';  

function Footer() {
  return (
    <div className="footer">
        <div className="footer-content">

            <div className="container">
            <button className="promote-button" to="/promote"><a className="promote-link text-dark" href="/promote">Promote</a></button>
              <div className="media-player float-start ">
                <audio
                    className="audio-player"
                    controls
                    src="/media/cc0-audio/t-rex-roar.mp3">
                        Your browser does not support the
                        <code>audio</code> element.

                </audio>

              </div>
              <div className="song-info float-end">
                <button className="btn btn-primary">song</button>
                <button className="btn btn-primary">artist</button>
              </div>
            </div>

          
        </div>
    </div>
  )
}

export default Footer;