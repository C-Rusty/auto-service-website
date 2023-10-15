import {htmlAnchors} from "../../store/htmlAnchors";
import {Link} from "react-router-dom";
import '../../styles/client/ClientFooter.scss';
import PhoneIcon from '@mui/icons-material/Phone';


const ClientFooter = () => {
    return (
        <footer>
            <div className='footer-inner'>
                <div className="footer-legal footer-inner__item">
                    <div className="headline-inner">
                        <span className='headline-inner__headline'>Юридическая информация</span>
                    </div>
                    <div className='links-inner'>
                        <Link to={'/legal'}>
                            <span className='links-inner__link'>
                                Условия использования и 
                                <span className='no-wrap'> Политика конфиденциальности</span>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="footer-contact-us footer-inner__item" id={htmlAnchors.contactUs}>
                    <div className='headline-inner'>
                        <span className={'headline-inner__headline'}>Контакты</span>
                    </div>
                    <a  href="tel:+80292228522" className='links-inner'>
                        <PhoneIcon/>
                        <span>80292228522</span>
                    </a>
                </div>
                <div className="footer-location footer-inner__item" id={htmlAnchors.location}>
                    <div className='headline-inner'>
                        <span className='headline-inner__headline'>Адрес</span>
                    </div>
                    <div className='links-inner'>
                        <span className="links-inner__link">
                            <a href="https://yandex.by/maps/157/minsk/?ll=27.684610%2C53.916081&mode=poi&poi%5Bpoint%5D=27.684581%2C53.916210&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D114462790806&z=19">Минск, ул. Липковская 2А</a>
                        </span>
                    </div>
                </div>
                <div className="footer-about-us footer-inner__item">
                    <div className='headline-inner'>
                        <span> Иинформация об ИП</span>
                    </div>
                    <div className='info-inner links-inner'>
                        <span className='info-inner__info'>ИП 2013, зарег. исполкомом</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ClientFooter;