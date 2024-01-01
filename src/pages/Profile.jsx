import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import avatar from '../assets/avatar.png'
import './profile.css'
import Footer from '../components/Footer'

const Profile = () => {


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userName, setUserName] = useState('admin');
    const [newUsername, setNewUsername] = useState('');
  

  const handleNewUsernameChange = (e) => {
      setNewUsername(e.target.value);
  }

  const handleUserNameSubmit = (e) => {
      e.preventDefault();
      alert('Username updated successfully!');
      setUserName(newUsername)
      setNewUsername('')
  }

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const doPasswordsMatch = () => {
        return newPassword === confirmPassword;
    }



    const handleSubmit = (e) => {
      e.preventDefault();

      if (currentPassword === '1234') { // Replace with the actual correct password
          // Password is correct, you can proceed with the update logic here
          setConfirmPassword('')
          setCurrentPassword('')
          setNewPassword('')
          alert('Password updated successfully!');

      } else {
          // Password is incorrect, show an alert
          alert('Wrong password! Please enter the correct current password.');
      }
    }

  return (
    <>
    <Navbar />
    <div className='profile__container'>
      <div className="profile__header">
        <h1 className="profile__header__text">Profile</h1>
        <div className="grey__line"></div>
      </div>
      <div className="profile__details__container">

        <div className="profile__details__left__container">
          <div class="profile-pic-container">
            <img src={avatar} alt="Profile Picture" class="profile-pic"/>
          </div>
          <div class="username__container">
            <h3 className="profile__username">{userName}</h3>
          </div>
        </div>

        <div className="profile__details__right__container">
            <div class="profile__form__username__container">
              <h2 className='username__update__header header'>Update Username</h2>
              <form onSubmit={handleUserNameSubmit}>
                <div className="currentusername__update__element update-element">
                  <label htmlFor="currentUsername" className="currentusername__label form-label">Current Username:</label>
                  <input type="text" id="currentUsername" className="currentusername form-input" placeholder="Enter current username" value={userName} disabled />
                </div>
                <div className="newusername__update__element update-element">
                  <label htmlFor="newUsername" className="newusername__label form-label">New Username:</label>
                  <input type="text" id="newUsername" className="newusername form-input" placeholder="Enter new username" onChange={handleNewUsernameChange} value={newUsername}/>
                </div>
                  <div className="username__update__button profile__button__container">
                    <button type="submit" className="username__button update-button">Update Username</button>
                  </div>
              </form>
           </div>
           <div class="profile__form__password__container">
              <h2 className='password__update__header header'>Update password</h2>
              <form onSubmit={handleSubmit}>
                  <div class="currentpassword__update__element update-element">
                      <label for="currentPassword" class="currentpassword__label form-label">Current Password:</label>
                      <input type="password" id="currentPassword" class="currentPassword form-input" placeholder="Enter current password" onChange={handleCurrentPasswordChange} value={currentPassword}/>
                  </div>
                  <div class="newpassword__update__element update-element">
                      <label for="newPassword" class="newpassword__label form-label">New Password:</label>
                      <input type="password" id="newPassword" class="newPassword form-input" placeholder="Enter new password" onChange={handleNewPasswordChange} value={newPassword}/>
                  </div>
                  <div class="confirmpassword__update__element update-element">
                      <label for="confirmPassword" class="confirmPassword__label form-label">Confirm Password:</label>
                      <input type="password" id="confirmPassword" class="confirmPassword form-input" placeholder="Confirm new password" onChange={handleConfirmPasswordChange} value={confirmPassword}/>
                  </div>
                  <div class="password__update__button profile__button__container">
                      <button type="submit" class="password__button update-button" disabled={!doPasswordsMatch()}>Update Password</button>
                  </div>
              </form>
           </div>
        </div>

          
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Profile
