const os = require('os');
const config = require('./config');

const logNetworkInterfaces = () => {

    const ifaces = os.networkInterfaces();
    console.log('Network Interfaces');
    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family)
                return;

            (alias >= 1)
                ? console.log(ifname + ':' + alias, iface.address)
                : console.log(ifname, iface.address);            

            ++alias;
        });
    });
    
}

const startClusteredApp = (startAppMethod) => {
    const cluster = require('cluster');
    
    if (cluster.isMaster) {
        const cpus = os.cpus();

        console.log('Starting clustered app!');

        logNetworkInterfaces();

        cpus.forEach(() => cluster.fork());

        cluster.on('listening', worker =>
            console.log(`Cluster ${worker.process.pid} connected!`)
        );

        cluster.on('exit', worker => {
            console.log(`Cluster ${worker.process.pid} disconnected!`);
            cluster.fork();
        });
    } else {
        startAppMethod();
    }
}

const startApp = () => {
    console.log(`Worker ${process.pid} started!`);    
    require('./server')(config);
}

if (config.app.clustered === 'true')
    startClusteredApp(startApp)
else {
    console.log('Starting non-clustered app!');
    logNetworkInterfaces();
    startApp();
}    
