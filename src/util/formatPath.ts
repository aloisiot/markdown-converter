export function formatRelativePath(relativePath: string): string {
    let result = relativePath
    if (relativePath.startsWith("/")) {
        result = relativePath.slice(1)
    }
    if (result.endsWith("/")) {
        result = removeLastBar(result)
    }
    return result
}

export function removeLastBar(patchName: string): string {
    let result = patchName
    if(result.endsWith("/")){
        result = result.slice(0, result.length - 1)
    }
    return result
}