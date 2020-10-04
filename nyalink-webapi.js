// External requirements
import got from 'got';

export class webApi_SSPanel {
    // Inner member variables
    urlBase = "";
    key = "";
    // Member function
    constructor(type, addr, key) {
        this.urlBase = `https://${addr}/mod_mu`;
        this.key = key;
    }
    getUsers(panelNodeId, progNodeId, userListCallback) {
        const panelApi = `${this.urlBase}/users?node_id=${panelNodeId}&key=${this.key}`;
        got(panelApi)
            .then((res) => {
                return res.json();
            }).then((data) => {
                if (data.ret === 1) {
                    userListCallback(data.data, progNodeId);
                } else {
                    throw data.data;
                }
            }).catch(console.log);
    }
    reportTraffic(panelNodeId, trafficLogSet) {
        const panelApi = `${this.urlBase}/users/traffic?node_id=${panelNodeId}&key=${this.key}`;

        got.post(panelApi, {
            json: trafficLogSet
        }).catch(console.log);
    }
    reportNodeLoad(nodeId, load, uptime) {
        const panelApi = `${this.urlBase}/nodes/${nodeId}/info?key=${this.key}&node_id=${nodeId}`;
        const serverLoad = {
            'load': load,
            'uptime': uptime,
        };
        got.post(panelApi, {
            json: serverLoad
        }).then(console.log);
    }
}