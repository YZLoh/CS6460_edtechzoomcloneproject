import React,{useState} from 'react'
import '../components/classesSearchBar.css';

function ClassesSearchBar({ searchQuery, onSearch }) {

  const [search,setSearch] = useState('')

  const handleSearch = (e) => {
    onSearch(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };



  return (
    <div className="classes__searchBar__container">
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

export default ClassesSearchBar;
