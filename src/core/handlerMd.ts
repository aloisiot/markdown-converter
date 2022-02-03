import md from 'markdown-it'
import matter from 'gray-matter'
import fs from'fs'
import 'dotenv/config'
import { Options } from './recursiveHandlerFileSistem'
import fsWarn from '../util/fsWarn'
import { removeLastBar } from '../util/formatPath'

/**
 * 
 * @param path Path absoluto do arquivo MARKDOWN a ser lido
 * @param options Opções como 'encoding' e 'withFileTypes' referentes à leitura do arquivo
 * @returns Conteudo do arquivo
 */
export function readMd(
    path: string,
    options?: Options | BufferEncoding | null | undefined
): string{
    const mdFile = fs.readFileSync(path, options)
    const result = matter(mdFile)
    return result.content
}
 /**
  * Converte uma string no formato Markdown para uma string no formato HTML
  * @param mdString String Markdown a ser convertida para HTML
  * @returns String no formato html
  */
export function mdToHtml(mdString: string): string{
    return md().render(mdString)
}

/**
 * Converte arquivo Markdown para  html
 * @param path Path absoluto do arquivo Markdown convertido
 * @param destinationDir Diretorio onde seram armazenados os nosos arquivos resultantes da converção
 * @param fileName Novo nome para o arquivo html
 * @param options 
 */
export async function convertMdToHtml(
    pathName: string,
    destinationDir?: string,
    fileName?: string,
    options?: Options | BufferEncoding | null | undefined
): Promise<void> {
    const fileContent = readMd(removeLastBar(pathName), options)
    const htmlContent = mdToHtml(fileContent)
    const destinationPathName = `${destinationDir}/${fileName?.replace(/\.md$/i, ".html")}`
    
    if(destinationDir) {
        
        let replece = process.env.REPLACE === "true"
        
        if(replece || !fs.existsSync(destinationPathName)){
            fs.mkdir(destinationDir, {recursive: true}, () => {
                fsWarn("Mkdir - ", destinationDir)
            })
        } else { 
            fsWarn("Cannot replace - ", destinationPathName)
        }

        if(replece || !fs.existsSync(destinationPathName)){
            fs.writeFile(destinationPathName, htmlContent, () => {
                fsWarn("WriteFile - ", destinationPathName)                
            })
        } else{
            fsWarn("Cannot replace - ", destinationPathName)
        }
    }
}