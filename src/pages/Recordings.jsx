import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import './recordings.css'
import RecordingSearchBar from '../components/RecordingSearchBar';
import RecordingItemList from '../components/RecordingItemList';
import Footer from '../components/Footer'
import Pagination from '../components/Pagination';

const Recordings = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState([
    { id: 1, name: 'Item 1', description: 'Description for Item 1',},
    { id: 2, name: 'Item 2', description: 'Description for Item 2',},
    { id: 3, name: 'Item 2', description: 'Description for Item 2', },
    { id: 4, name: 'Item 2', description: 'Description for Item 2', },
    { id: 5, name: 'Item 2', description: 'Description for Item 2', },
    { id: 6, name: 'Item 2', description: 'Description for Item 2', },
    { id: 7, name: 'Item 2', description: 'Description for Item 2',},
    // Add more items to your list
  ]);

  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Navbar />
      <div className="recordings__container">
        <h1 className="recordings__header">Available recordings</h1>
        <div className="recordings__available__container">
          <div className="recordings__search__container">
            <RecordingSearchBar searchQuery={searchQuery} onSearch={handleSearch} />
          </div>
          <div className='recordings__item__container'>
            <RecordingItemList items={paginatedItems} searchQuery={searchQuery} />
          </div>
          <div className="recordings__pagination__container">
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
          </div>
       </div>
      </div>
      <Footer />
    </div>
  )
}

export default Recordings
