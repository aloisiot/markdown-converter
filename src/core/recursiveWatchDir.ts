import fsWarn from '../util/fsWarn'
import fs from 'fs'
import { formatRelativePath } from '../util/formatPath';

export default function recursiveWatchDir(
    pathName: string,
    relativePath: string,
    handlerChange: (path: string, relativePath: string) => void,
): void {

    const relative = formatRelativePath(relativePath)

    function addListener(path: string) {
        fs.watch(path, () => handlerChange(path, relative))
        fsWarn("Watching - ", path);
    }

    function forEachFiel(pathName: string, file: string, newRelativePath: string) {
        const newPathName = pathName.endsWith("/") ? pathName + file : `${pathName}/${file}`
        recursiveWatchDir(newPathName, newRelativePath, handlerChange)
    }

    function readDir() {
        fsWarn("Reading recursively - ", pathName)
        fs.readdir(pathName, (err, files: string[]) => {
            files.forEach((file: string) => forEachFiel(pathName, file, `${relative}/${file}`))
        })
    }

    try {
        fs.stat(pathName, (err, stats: fs.Stats) => {
            if (stats.isDirectory()) {
                addListener(pathName)
                readDir()
            }
        })

    } catch (err) {
        fsWarn("Error reading - ", pathName, err)
    }
}