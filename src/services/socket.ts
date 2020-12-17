import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

let hubConnection: HubConnection;

export const connectHub = async (user_id: number) => {
    hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:58196/notificationhub')
        .withAutomaticReconnect()
        .build();

    if (hubConnection) {
        try {
            const response = await hubConnection.start();
            console.log('Connected: ', response);

            hubConnection.invoke('MapConnections', user_id);

            return Promise.resolve(hubConnection);
        } catch (error) {
            console.log('Connection failed: ', error);
            return Promise.reject(error);
        }
    }
};

const getHubConnection = () => {
    return hubConnection;
};

export default getHubConnection;
export type { HubConnection };
