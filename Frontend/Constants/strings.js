const BASE_URL = "https://stark-wildwood-96064.herokuapp.com";

function titleCase (str) {
    let splitted = str.split(' ');
    let uppered = [];
    for (let i = 0; i < splitted.length; i++) {
        let titled = splitted[i].charAt(0).toUpperCase() + splitted[i].substr(1);
        uppered.push(titled);
    }
    return uppered.join(' ');
}