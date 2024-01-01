import './settings.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MicrophoneTest from '../components/MicrophoneTest';
import CameraTest from '../components/CameraTest';

const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="settings__container">
        <div className="settings__header__container">
          <h2 className="settings__header">Settings</h2>
          <div className="grey__line"></div>
          
        </div>
        <div className="settings__content__container">
          <div className="content__left__container">
            <h3 className='settings__header__text'>Let's test your audio and video</h3>
          </div>
          <div className="content__right__container">
            <div className="mic-test">
              <CameraTest/>
              <MicrophoneTest />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
