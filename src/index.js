const app = require('./app');
const config = require('./common/config/config');
const logger = require('./common/utils/logger');

const { dataSource } = require('./common/config/db-config');
const dotenv = require("dotenv");

dotenv.config();



const indexFunction = () => {
    let server;
    dataSource.initialize()
      .then(() => {
        console.log("Connected to PostgreSQL: " + config.typeorm.database);
        
        server = app.listen(config.port, () => {
            console.log("Server is running on port " + config.port);
            console.log("Server is running on url " + config.url);
            
          });
      })
      .catch(err => {
        console.log(err)
        console.log(err.stack)
        // logger.error(err.stack);
      });
  
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info('Server closed');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };
  
    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };
  
    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
  
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        server.close();
      }
    });
  };
  
  module.exports = indexFunction;