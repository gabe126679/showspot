import React from 'react';
import { Link } from 'react-router-dom';  

function Footer() {
  return (
    <div className="footer">
        <div className="footer-content">
            <button className="promote-button" to="/promote"><a className="promote-link text-dark" href="/promote">Promote</a></button>
            <figure className="media-player float-start">
              <figcaption>Listen to the T-Rex:</figcaption>
              <audio
                  controls
                  src="/media/cc0-audio/t-rex-roar.mp3">
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
          </figure>
        </div>
    </div>
  )
}

export default Footer;