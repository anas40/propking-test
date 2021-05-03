import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//icons
import '../../assets/css/footer.css';

//logo image
import logo from '../../assets/images/vendor/2.png';

library.add(
    faGithubAlt, faFacebook, faTwitter, faInstagram, faMap, faMapMarker, faPhone, faEnvelope
);


function Footer() {



    const [t, i18n] = useTranslation()
    const [defaultLang, setDefaultLang] = useState("en")


    function changeLang(event) {
        console.log(event.target.value)
        setDefaultLang(event.target.value)
        i18n.changeLanguage(event.target.value)
    }



    return (
        <footer className="footersection">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <div className="logopicdiv"><img src={logo} className="img-fluid logopic"></img></div>
                    </div>
                    <div className="col-lg-2 col-sm-3 col-8 offset-md-0 offset-2 offset-sm-2 ">

                        <ul className="getstarted">
                            <h2> {t('footer.getStarted')} </h2>
                            <li>
                                <p><Link to='/'>{t('footer.home')}</Link>  </p>
                                <p><Link to='/vendor'>{t('footer.sellWithUs')}</Link>  </p>
                                <label htmlFor="language">Language : </label>
                                <select name="language" value={defaultLang} onChange={changeLang} id="language select">
                                    <option value="en">En</option>
                                    <option value="hi">Hi</option>
                                </select>
                            </li>
                           
                        </ul>
                    </div>
                    <div className="col-lg-2 col-sm-3 col-8 offset-md-0 offset-2 offset-sm-2">

                        <ul className="getstarted">
                            <h2>{t('footer.aboutUs')}</h2>
                            <li>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">
                                    <p>{t('footer.companyInfo')}</p></a>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">
                                    <p>{t('footer.contactUs')}</p></a>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">
                                    <p>{t('footer.review')}</p></a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-lg-2 col-sm-3 offset-lg-0 offset-md-4 col-8 offset-2 offset-sm-2">

                        <ul className="getstarted">
                            <h2>{t('footer.support')}</h2>
                            <li>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">
                                    <p>{t('footer.faq')}</p></a>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">

                                    <p>{t('footer.helpDesk')}</p></a>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.shethink.in/">

                                    <p>{t('footer.forum')}</p></a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-8 offset-md-0 offset-2 offset-sm-2">
                        <div className="social">
                            <div className="d-flex">
                                <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/Shethink_in' className="twitter"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
                                <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/shethink.in' className="insta"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>
                                <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/Shethink-Pvt-Ltd-107394634346548/' className="fb"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyrights">
                <p>@2020 Copyright SheThink</p>
            </div>
        </footer>
    )

}

export default Footer;