import React,{useState} from 'react'
import './recordingSearchBar.css'



function RecordingSearchBar({ searchQuery, onSearch }) {

  const [search,setSearch] = useState('')

  const handleSearch = (e) => {
    onSearch(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };



  return (
    <div className="recordings__searchBar__container">
      <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    
  );
}

export default RecordingSearchBar;



