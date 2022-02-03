import 'dotenv/config'
import app from './app'

const originPath = process.env.ORIGIN_PATH
const destinationDir = process.env.DESTINATION_DIR

if(originPath && destinationDir){
    app(originPath, destinationDir)
} else {
    console.error("Warn - environment not configured!")
    process.exit(0)
}
