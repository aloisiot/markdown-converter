import { removeLastBar } from '../util/formatPath'
import fs from 'fs'
import fsWarn from '../util/fsWarn'

function getExtension(fileName: string): string {
    return fileName.split(".")[fileName.split(".").length -1]
}

export interface Options {
    encoding: BufferEncoding | null;
    withFileTypes?: false | undefined;
}

export default async function recursiveHandlerFileSistem (
    pathName: string, extension: string ,
    handlerFile: (pathName: string, destinationDir?: string, fileName?: string, options?: Options | BufferEncoding | null | undefined) => Promise<void> | void,
    destinationDir?: string,
    options? : Options | BufferEncoding | null | undefined 
): Promise<void> {

    const pathN = removeLastBar(pathName)
    
    try{
        const ext = extension.replace(".", "")
        const dir = fs.readdirSync(pathN, options)
        
        for (const path of dir){
            const newOriginPath = `${pathN}/${path}`
            if (getExtension(path) === ext){
                await handlerFile(newOriginPath, destinationDir, path, options)
            } else {
                const newDestinationPath = `${destinationDir}/${path}`
                await recursiveHandlerFileSistem(newOriginPath, extension, handlerFile, newDestinationPath, options)
            }
        }
    } catch (err) {
        fsWarn("Error - ", pathN, err)
    }
}
