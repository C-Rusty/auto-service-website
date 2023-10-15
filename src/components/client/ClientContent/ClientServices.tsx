import '../../../styles/client/ClientContent/ClientServices.scss';

const ClientServices = () => {

    return (
        <section className='services less-padding'>
            <article className='headlines'>
                <div className='headline-inner'>
                    <h2 className={'headline-inner__first'}>Шиномонтаж легкового и коммерческого автотранспорта</h2>
                </div>
                <div className='headline-inner'>
                    <h3 className={'headline-inner__second'}>Производим услуги шиномонтажа колес R12-20 и R14-16C</h3>
                </div>
            </article>
            <article className={'main'}>
                <div className={'service-item'}>
                    <div className="service-item__inner">
                        <div className='service-item__headline'>
                            <h3 className={'headline'}>Развал/схождение л\а, джипы, кроссоверы, BUS</h3>
                        </div>
                        <div className={'service-item__image'}>
                            <img src={require('../../../img/razval.jpg')} alt="" className={'w-full h-full'}/>
                        </div>
                    </div>
                </div>
                <div className={'service-item'}>
                    <div className="service-item__inner">
                        <div className='service-item__headline'>
                            <h3 className={'headline'}>Ремонт подвески л\а, замена ГРМ</h3>
                        </div>
                        <div className={'service-item__image'}>
                            <img src={require('../../../img/podveska.jpg')} alt="" className={'w-full h-full'} />
                        </div>
                    </div>
                </div>
                <div className={'service-item'}>
                    <div className="service-item__inner">
                        <div className='service-item__headline'>
                            <h3 className={'headline'}>Ремонт шин любой сложности, вулканизация, вулканизация шин</h3>
                        </div>
                        <div className={'service-item__image'}>
                            <img src={require('../../../img/shiny.jpg')} alt="" className={'w-full h-full'}/>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default ClientServices;