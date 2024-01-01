import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../assets/logo1.png'
import NotificationIcon from './NotificationIcon'
import { FaBars, FaTimes } from 'react-icons/fa'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setMenuOff = () => {
    setIsMenuOpen(false);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='navbar__container'>
      <div className="navbar__left__container">
        <div className="navbar__icon__container">
            <NavLink to="/schedule" >
              <img src={Logo} alt="log" className='navbar__logo' />
              <h1 className="navbar__logo__text">Zoom Clone</h1>
            </NavLink>

        </div>
        <div className="navbar__link__container">
          <nav>
            <ul>
                <li>
                  <NavLink to="/schedule" >Schedule</NavLink>
                  <NotificationIcon count={3} />
                </li>
                <li>
                  <NavLink to="/classes" >Classes</NavLink>
                </li>
                <li>
                  <NavLink to="/recordings" >Recordings</NavLink>
                </li>
                <li>
                  <NavLink to="/settings" >Settings</NavLink>
                </li>
                <li>
                  <NavLink to='/create-meeting' className='logout-button' onClick={setMenuOff}>
                    Create Meeting
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/classes/download-transcript' className='logout-button' onClick={setMenuOff}>
                    Transcript
                  </NavLink>
                </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="navbar__right__container">
      <nav>
            <ul>
                <li>
                  <NavLink to="/profile" >Profile</NavLink>
                </li>
                <li>
                  <NavLink to="#" className={'navbar__logout__button'} onClick={handleLogout}>Log Out</NavLink>
                </li>
            </ul>
          </nav>
      </div>
      <div className="mobile__navbar">
        <div className='navbar__mobile__menu__icon hamburger-icon' onClick={setIsMenuOpen}>
        {isMenuOpen ? '' : <FaBars />}
        </div>
            {isMenuOpen && (

            <div className='mobile__navbar__container'>
            <div className='navbar__mobile__menu__icon close-icon' onClick={setMenuOff}>
            {isMenuOpen ? <FaTimes/> : ''}
            </div>
            <nav className='mobile-nav-links'>
              <ul>
                <li>
                  <NavLink to='/schedule' activeClassName='active' onClick={setMenuOff}>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/classes' activeClassName='active' onClick={setMenuOff}>
                    Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/recordings' activeClassName='active' onClick={setMenuOff}>
                    Recordings
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/settings' activeClassName='active' onClick={setMenuOff}>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/profile' activeClassName='active' onClick={setMenuOff}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to='#' className='logout-button' onClick={setMenuOff}>
                    Log Out
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/create-meeting' className='logout-button' onClick={setMenuOff}>
                    Create Meeting
                  </NavLink>
                </li>
              </ul>
            </nav>
            </div>
          )}
        </div>

      </div>
  )
}

export default Navbar
