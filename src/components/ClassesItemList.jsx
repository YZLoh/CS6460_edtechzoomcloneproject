import React from 'react'
import './classesItemList.css'
import { Link } from 'react-router-dom';

function ClassesItemList({ items, searchQuery }) {
  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleJoin = (e) => {

  };

  return (
    <div className="classes__item-list">
      {searchQuery === '' ? (
        // Display all items when search query is empty
        items.map((item) => (
          <div key={item.id} className="classes__item-card">
            <h3>{item.name}</h3>
            {/* <p>{item.description}</p> */}
            <Link to="/recordings/term">
                <button onClick={handleJoin}>Join</button>
            </Link>
          </div>
        ))
      ) : filteredItems.length === 0 ? (
        <p>No content found</p>
      ) : (
        // Display filtered items
        filteredItems.map((item) => (
          <div key={item.id} className="classes__item-card">
            <h3>{item.name}</h3>
            {/* <p>{item.description}</p> */}
            <Link to="/classes/testing">
                <button onClick={handleJoin}>Join</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ClassesItemList;
