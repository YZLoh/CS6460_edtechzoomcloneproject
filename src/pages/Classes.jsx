import React,{useState} from 'react'
import './classes.css'
import Navbar from '../components/Navbar'
import ClassesSearchBar from '../components/ClassesSearchBar'
import ClassesItemList from '../components/ClassesItemList'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

const Classes = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState([
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 2', description: 'Description for Item 2' },
    { id: 4, name: 'Item 2', description: 'Description for Item 2' },
    { id: 5, name: 'Item 2', description: 'Description for Item 2' },
    { id: 6, name: 'Item 2', description: 'Description for Item 2' },
    { id: 7, name: 'Item 2', description: 'Description for Item 2' },
    { id: 8, name: 'Item 2', description: 'Description for Item 2' },
    // Add more items to your list
  ]);

  const itemsPerPage = 6; // Number of items to display per page
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
      <div className="classes__container">
        <h1 className="classes__header">Available classes</h1>
        <div className="classes__available__container">
          <div className="classes__search__container">
            <ClassesSearchBar searchQuery={searchQuery} onSearch={handleSearch} />
          </div>
          <div className='classes__item__container'>
            <ClassesItemList items={paginatedItems} searchQuery={searchQuery} />
          </div>
          <div className="classes__pagination__container">
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

export default Classes
