import ClientForm from "./ClientContent/ClientForm";
import ClientServices from "./ClientContent/ClientServices";
import ClientPriceAndInfo from "./ClientContent/ClientPrice-Info";

const ClientContent = () => {

    return (
        <main className='client-container'>
            <ClientForm/>
            <ClientServices/>
            <ClientPriceAndInfo/>
        </main>
    );
};

export default ClientContent;