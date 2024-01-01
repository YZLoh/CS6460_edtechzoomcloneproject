import React from 'react'
import './recordingItemList.css'
import video from '../assets/video2.mp4'


function RecordingItemList({ items, searchQuery }) {
  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (e) => {
    
  };

  const handleDelete = (e) => {
    
  };


  const handleDownload = (e) => {
    
  };

  return (
    <div className="recording__item-list">
      {searchQuery === '' ? (
        // Display all items when search query is empty
        items.map((item) => (
          <div key={item.id} className="recording__item-card">
            <div className="recording__video__preview">
              <div className="preview__container">
                <video autoPlay muted loop>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
              <div className="preview__bottom__container">
                <div className="text__container">
                  <h3 className="preview__header">{item.name}</h3>
                  <p className="preview__description">{item.description}</p>
                </div>
                <div className="recording__item__button">
                  <button onClick={handleJoin} className='recording__view__button'>View</button>
                  <button onClick={handleDownload} className='recording__download__button'>Download</button>
                  <button onClick={handleDelete} className='recording__delete__button'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : filteredItems.length === 0 ? (
        <p className='no__content__found'>No content found</p>
      ) : (
        // Display filtered items
        filteredItems.map((item) => (
          <div key={item.id} className="recording__item-card">
            <div className="recording__video__preview">
              <div className="preview__container">
                <video autoPlay muted loop>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
              <div className="preview__bottom__container">
                <div className="text__container">
                  <h3 className="preview__header">{item.name}</h3>
                  <p className="preview__description">{item.description}</p>
                </div>
                <div className="recording__item__button">
                  <button onClick={handleJoin} className='recording__view__button'>View</button>
                  <button onClick={handleDownload} className='recording__download__button'>Download</button>
                  <button onClick={handleDelete} className='recording__delete__button'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


export default RecordingItemList
