import ViberIcon from '../../../img/Viber';
import '../../../styles/client/ClientContent/ClientPrice-Info.scss';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function ClientPriceAndInfo() {
    return (
        <section className='price-and-info' id='price-and-info'>
            <div className="pricelist">
                <div className="pricelist__headline">
                    <h2 className='headline'>Услуги и цены на обслуживание легковых автомобилей</h2>
                </div>
                <div className="pricelist__main">
                    <table className='table'>
                        <thead className='main-head'>
                            <tr>
                                <th className='th-col-name sercvices'>Название услуги</th>
                                <th className='th-col-name price'>Цена (руб.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Шиномонтаж 4-х колес без стоимости грузов <br />(снятие и установка колеса + замена шины с балансировкой)</td>
                                <td>49.60</td>
                            </tr>
                            <tr>
                                <td>Шиномонтаж 1-го колеса без стоимости грузов <br />(снятие и установка колеса + замена шины с балансировкой)</td>
                                <td>12.40</td>
                            </tr>
                            <tr>
                                <td>Раскатка стального диска</td>
                                <td>6.00</td>
                            </tr>
                            <tr>
                                <td>Снятие и установка шины с технологией Run Flat</td>
                                <td>35.00</td>
                            </tr>
                            <tr>
                                <td>Правка литого диска</td>
                                <td>45.00</td>
                            </tr>
                            <tr>
                                <td>Стоимость грузов <br /> (стоимость зависит от кол-ва грузов, необходимых для балансировки)</td>
                                <td>от 2.00 до 15.00</td>
                            </tr>
                            <tr>
                                <td>Снятие и установка колеса</td>
                                <td>3.30</td>
                            </tr>
                            <tr>
                                <td>Балансировка колеса (без стоимости грузов)</td>
                                <td>4.90</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="info">
                <div className="info-inner">
                    <div className="address">
                        <div className='address__header'>
                            <h2>Где находимся</h2>
                        </div>
                        <div className='address__text'>
                            <a href="https://yandex.by/maps/157/minsk/?ll=27.684610%2C53.916081&amp;mode=poi&amp;poi%5Bpoint%5D=27.684581%2C53.916210&amp;poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D114462790806&amp;z=19">г. Минск, ул. Липковская 2А</a>
                        </div>
                        <div className='address__map'>
                            <iframe title='location' src="src/components/client/client-content/client-location?um=constructor%3Ab750cf5a99722272e08c6fbb07caf79fe8f2aa090173c499427aa1c394580fc4&amp;source=constructor"
                            className="w-full rounded"/>
                        </div>
                    </div>
                    <div className='contacts'>
                        <div className='contacts__phones'>
                            <div className='phone-header'>
                                <h2>Контакты</h2>
                            </div>
                            <div className='phone-inner'>
                                <div className='phone-inner__logo'><PhoneIcon sx={{width: 30, height:30}}/></div>
                                <a href="tel:+" className='phone-inner__phone'>
                                    <div className="tel-link">
                                        <span>Мобильный</span>
                                        <span>8(029)122-22-22</span>
                                    </div>
                                </a>
                            </div>
                            <div className='phone-inner'>
                                <div className='phone-inner__logo'><ViberIcon/></div>
                                <a href="viber://chat?number=%2B3750291222222" className='phone-inner__phone'>
                                    <div className="tel-link">
                                        <span>Viber</span>
                                        <span>8(029)122-22-22</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='contacts__workdays'>
                            <div className='workdays-header'>
                                <h2>Дни работы</h2>
                            </div>
                            <div className="day-inner">
                                <div className='check-icon-container'><CheckIcon/></div>
                                <div className='day-inner-info'>
                                    <span className='day-inner__day'>Понедельник - пятница</span>
                                    <span className='day-inner__time'>9.00 - 18.00</span>
                                </div>
                            </div>
                            <div className="day-inner">
                                <div className='check-icon-container'><CheckIcon/></div>
                                <div className='day-inner-info'>
                                    <span className='day-inner__day'>Суббота</span>
                                    <span className='day-inner__time'>9.00 - 15.00</span>
                                </div>
                            </div>
                            <div className="day-inner">
                                <div className='cross-icon-container'><CloseIcon/></div>
                                <div className='day-inner-info'>
                                    <span className='day-inner__day'>Воскресенье</span>
                                    <span className='day-inner__time'>Выходной</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientPriceAndInfo;