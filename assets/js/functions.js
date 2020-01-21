/**
 * Funktion til at fetche dataliste fra et API med 
 * Kaldes med URL som parameter og returnerer et array med data
 * Eksempel på et kald:
 * (async () =>{
 *    let test = await fetchArray("/url/to/api");
 *    console.log(test);
 * })();
 * @param string url 
 * @returns array
 */
async function fetchArray(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

/**
 * Funktion til at fetche dataværdi fra et API med 
 * Kaldes med URL som parameter og returnerer et array med data
 * @param {*} url 
 * @returns string
 */
async function fetchString(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (err) {
        console.log(err)
    }
}