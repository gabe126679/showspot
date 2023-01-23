import React, { useState } from 'react';
import '../instagram.css';

const InstagramCard = () => {
  const [likes, setLikes] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className='profile-border'>
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2 className="username">Random User</h2>
        </div>
        <img src="https://via.placeholder.com/300x300.png" alt="Post" className="card-img" />
        <div className="card-body">
          <div className="description-dropdown" onClick={() => setShowDescription(!showDescription)}>
            <span className="description-text">Description</span>
            <span className="description-arrow">{showDescription ? '\u25B2' : '\u25BC'}</span>
          </div>
          {showDescription && (
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, magna vel euismod congue, augue est convallis ipsum, vitae tincidunt leo nulla eget.</p>
          )}
          <button className="like-button" onClick={() => setLikes(likes + 1)}>
            <i className="fa fa-heart"></i> {likes}
          </button>
        </div>
      </div>
    </div>  
    </div>
  );
}

export default InstagramCard;
