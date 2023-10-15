import ClientHeader from "../../components/client/ClientHeader";
import ClientFooter from "../../components/client/ClientFooter";
import ClientContent from "../../components/client/ClientContent";

const Client = () => {

    document.body.style.overflowX = 'hidden';

    return (
        <div className="client-container">
            <ClientHeader/>
            <ClientContent/>
            <ClientFooter/>
        </div>
    );
};

export default Client;