import { convertMdToHtml } from '../../src/core/handlerMd'
import recursiveHandlerFileSistem from '../../src/core/recursiveHandlerFileSistem'
import 'dotenv/config'

describe("Testando conversão de todos os arquivos MARKDOWN de um diretorio para arquivos HTML", () => {
    test("Testando função recursiveHandlerFile", () => {
        const path = process.env.ORIGIN_PATH
        const destinationPath = process.env.DESTINATION_PATH
        if(path && destinationPath){
            recursiveHandlerFileSistem(path, "md", convertMdToHtml, destinationPath)
        }
    })
})