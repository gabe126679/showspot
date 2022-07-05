import React from 'react';
import { Link } from 'react-router-dom';  

function Footer() {
  return (
    <div className="footer">
        <div className="footer-content">
            <button className="promote-button" to="/promote"><a className="promote-link text-dark" href="/promote">Promote</a></button>
            <div className="song-container">

              <div className="media-player float-start ">
                <audio
                    className="audio-player"
                    controls
                    src="https://firebasestorage.googleapis.com/v0/b/dream-project-1040a.appspot.com/o/songs%2F1.%20Carrie%20Morris.mp3?alt=media&token=7fdfb504-1c5e-4130-be53-c660de585503">
                        Your browser does not support the
                        <code>audio</code> element.

                </audio>

              </div>
              <div >
                <div className="song-info float-end">
                  <button className="btn btn-primary">song</button>
                  <br/>
                  <br/>
                  <br/>
                  <button className="btn btn-primary">artist</button>
                </div>
              </div>
            </div>


          
        </div>
    </div>
  )
}

export default Footer;