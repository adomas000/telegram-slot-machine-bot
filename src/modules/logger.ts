import log from 'simple-node-logger'//.createSimpleLogger();
import path from 'path'

const logger = log.createSimpleLogger(path.join(process.cwd(), 'logs/bot.log'))

export default logger;
