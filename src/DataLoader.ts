function readTextFile(file: string, callback: Function) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

export function readJson(file: string, callback: Function){
    readTextFile(file, function (text: string) {
        const data = JSON.parse(text);
        callback(data);
    })
}

export default readJson;
