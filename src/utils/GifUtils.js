export const embedsFromData = (data) => {
    let temp = [];
    for (const elem of data) {
        temp.push(elem.embed_url);
    }
    return temp;
}