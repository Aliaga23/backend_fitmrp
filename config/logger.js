// logger.js
const winston = require('winston');
require('winston-syslog');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Syslog({
            host: '192.168.83.253',  // IP del servidor syslog (ajústala según tu configuración)
            port: 514,  // Puerto del syslog
            protocol: 'udp4'  // Protocolo UDP para enviar logs
        }),
        new winston.transports.Console()  // Log también en la consola para facilidad de desarrollo
    ]
});

module.exports = logger;
