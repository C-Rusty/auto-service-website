import {useState} from 'react';
import '../../styles/client/ClientHeader.scss';
import Logo from "../../img/Logo";

const ClientHeader = () => {

    const [isFormHidden, setFormHidden] = useState<boolean>(false);

    const form = document.getElementById(`form`);

    const showFrom = () => {
        form?.classList.add(`show-form`);
        form?.classList.remove(`hide-form`);
    };
    const hideForm = () => {
        form?.classList.remove(`show-form`);
        form?.classList.add(`hide-form`);
    };
     
    const changeFormVisibility = () => {
        setFormHidden(currentState => !currentState);

        isFormHidden ? showFrom() : hideForm();
    };

    const handleClickScroll = (elementId: string) => {
        const elementToScroll = document.getElementById(elementId);
        
        if (elementId === `price-and-info`) {
            elementToScroll!.scrollIntoView({behavior: 'smooth'});
        } else if (elementId === 'form') {
            if (window.pageXOffset !== 0) showFrom();
            window.scrollTo({top: 0, behavior: `smooth`});
        };
    };

    return (
        <header>
            <div className="header-container">
                <div className='header-container__logo-container'>
                    <Logo/>
                    <div className='client-phone-mobile'>
                        <a href="tel:+375291922257">Тел. 8 029 222-85-22</a>
                    </div>
                </div>
                <div className='header-container__nav'>
                    <nav>
                        <ul className="nav-ul">
                            <li>
                                <span 
                                    onClick={(e) => {
                                        changeFormVisibility();
                                        handleClickScroll(`form`);
                                    }}
                                >Записаться</span>
                            </li>
                            <li className="">
                                <span onClick={() => handleClickScroll(`price-and-info`)}
                                >Услуги</span>
                            </li>
                            <li>
                                <a href="https://yandex.by/maps/157/minsk/?ll=27.684889%2C53.916234&mode=poi&poi%5Bpoint%5D=27.684581%2C53.916210&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D114462790806&tab=reviews&z=19">Отзывы</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='client-phone'>
                    <a href="tel:+375291922257">Тел. 8 029 222-85-22</a>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;