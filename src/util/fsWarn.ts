export default function fsWarn(msg: string, patchName?: string, error?: any){
    console.log(`${msg} ${patchName ? patchName : ""}`)
    if(error) console.error(error)
}