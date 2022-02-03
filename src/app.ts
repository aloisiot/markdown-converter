import recursiveHandlerFileSistem from "./core/recursiveHandlerFileSistem";
import recursiveWatchDir from "./core/recursiveWatchDir";
import { convertMdToHtml } from "./core/handlerMd";
import { formatRelativePath, removeLastBar } from "./util/formatPath";

export default function app (originPath: string, destinationDir: string) {
    console.log("Started APP\n")
    
    function handlerDir(pathName: string, relativePath: string){
        const destination = `${removeLastBar(destinationDir)}/${formatRelativePath(relativePath)}`

        recursiveHandlerFileSistem(
            pathName, "md",
            convertMdToHtml,
            destination,
            { encoding: "utf-8" }
        )
    }

    recursiveHandlerFileSistem(
        originPath, "md",
        convertMdToHtml,
        destinationDir,
        { encoding: "utf-8" }
    )
    
    recursiveWatchDir(originPath, "", handlerDir)   
}
