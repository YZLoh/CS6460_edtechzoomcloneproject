import React, { useState, useEffect } from 'react';
import './schedule.css';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Footer';
import { format } from 'date-fns'; // Import format function
import Pagination from 'react-js-pagination';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);



  // Now you have access to the token in your component
  const token = localStorage.getItem('token');

  console.log(token);

  const events = [
    {
      date: '2023-09-11',
      title: 'Event 1',
      description: 'Description of Event 1',
      timeSlot: '10.30 a.m - 11.30 a.m',
      studentNumber: '4',
      totalStudent: '10',
    },
    {
      date: '2023-09-11',
      title: 'Event 2',
      description: 'Description of Event 2',
      timeSlot: '11.30 a.m - 12.30 a.m',
      studentNumber: '4',
      totalStudent: '12',
    },
    {
      date: '2023-09-11',
      title: 'Event 2',
      description: 'Description of Event 2',
      timeSlot: '11.30 a.m - 12.30 a.m',
      studentNumber: '4',
      totalStudent: '12',
    },
    // Add more events as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // You can adjust the number of items per page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Load events for the initial selected date
    loadEventsForSelectedDate(selectedDate);
  }, []);

  const loadEventsForSelectedDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const filteredEvents = events.filter((event) => event.date === formattedDate);
    setEventsForSelectedDate(filteredEvents);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleDateChange = (newDate) => {
    // Format the selected date to 'YYYY-MM-DD'
    const formattedDate = format(newDate, 'yyyy-MM-dd');

    // Filter events for the selected date
    const filteredEvents = events.filter((event) => event.date === formattedDate);

    // Update the list of events to show only events for the selected date
    setEventsForSelectedDate(filteredEvents);
    setSelectedDate(newDate);
  };



  return (
    <>
      <Navbar />
      <div className="schedule__container">
        <div className="schedule__header__container">
          <h1 className="schedule__header">Schedule</h1>
          <div className="grey__line"></div>
        </div>
        <div className="schedule__content__container">
          <div className="schedule__container__left">
            <div className="calendar__container">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="calendar"
              />
            </div>
          </div>
          <div className="schedule__container__right">
            <div className="schedule__container__right__header">
              <h2 className="right__header">Upcoming Lessons</h2>
            </div>
            <div className="schedule__classes__container">
              {eventsForSelectedDate.length === 0 ? (
                <p className='no__content__found'>No upcoming lessons</p>
              ) : (
                eventsForSelectedDate
                  .slice(startIndex, endIndex)
                  .map((event, index) => (
                    <div key={index} className="event">
                      <div className="event__details">

                        <h3 className='event__title'>{event.title}</h3>


                        <p className='event__date'>{event.date}</p>
                        <p className='event__timeslot'>{event.timeSlot}</p>
                        <p className='event__description'>{event.description}</p>


                      </div>
                      <div className="event__buttons">
                        <p className='event__students'>{event.studentNumber}/ {event.totalStudent}</p>
                        <button className="join-button">Join</button>
                      </div>

                    </div>
                  ))
              )}
            </div>
            <div className="schedule__pagination__container">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={eventsForSelectedDate.length}
                pageRangeDisplayed={5} // Adjust the number of page numbers displayed
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Prev"
                nextPageText="Next"
                activeClass="active-page"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
