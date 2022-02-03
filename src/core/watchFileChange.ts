import fs from 'fs'
import { convertMdToHtml } from './handlerMd'
import { Options } from './recursiveHandlerFileSistem'

export default function watchFileChange(...args: [
    path: string,
    destinationDir?: string,
    fileName?: string,
    options?: Options | BufferEncoding | null | undefined
]): void {
    
    convertMdToHtml(...args)

    fs.watch(args[0], () => {
        convertMdToHtml(...args)
    })
}