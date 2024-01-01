import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './terms.css'
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <>
    <Navbar />
    <div className="terms__center__container">
        <div className='terms__container'>
            <div className="terms__header">
                <h1 className="terms__header__text">Terms of Agreement</h1>
                <div className="terms__header__line"></div>
            </div>
            <div className="terms__container__list">
                <h1 className="terms__header__list__header">Privacy Policy</h1>
                <p class="terms__list__item">
                    Data Collection: We collect and store data, including your name and email address, to provide you with access to our recording service.
                </p>
                <p class="terms__list__item">
                    Data Usage: Your data is used solely for the purpose of providing you with access to recordings and is not shared with third parties without your consent.
                </p>
                <p class="terms__list__item">
                    Data Security: We take security measures to protect your data from unauthorized access or disclosure.
                </p>
                <p class="terms__list__item">
                    Cookies: We may use cookies to enhance your user experience and improve our service.
                </p>
                <p class="terms__list__item">
                    Opt-out: You have the option to opt-out of data collection and email communications at any time.
                </p>

                <h1 className="terms__header__list__header">User Agreement</h1>

                <p class="terms__list__item">
                    Acceptance: By accessing our recordings, you agree to comply with our terms and conditions.
                </p>
                <p class="terms__list__item">
                    Usage: Recordings are provided for educational and informational purposes only. Any unauthorized use or distribution is strictly prohibited.
                </p>
                <p class="terms__list__item">
                    Responsibility: You are responsible for your interactions and actions while using our recording service.
                </p>
                <p class="terms__list__item">
                    Content: Content shared in recordings should adhere to our community guidelines, and offensive or harmful content is not allowed.
                </p>
                <p class="terms__list__item">
                    Termination: We reserve the right to terminate access to recordings for users who violate our terms and guidelines.
                </p>
                <p class="terms__list__item">
                    Feedback: We welcome your feedback and suggestions to help us improve our service.
                </p>

                <div className="terms__button__container">
                    <Link to="/classes/testing">
                        <button className='accept'>Accept</button>
                    </Link>
                </div>
            </div>
            </div>

            <div className="footer__container">
            <Footer />
            </div>
        </div>



    </>


  )
}

export default Terms
