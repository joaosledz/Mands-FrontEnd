import getHubConnection from '../services/socket';

const useHub = () => {
    const hubConnection = getHubConnection();
    return hubConnection;
};

export default useHub;
