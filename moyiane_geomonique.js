
const pronote = require('pronote-api');
require('dotenv').config();

const compute_stats = require("./compute_stats")

// Exemple
const url = process.env.URL;

trimester = process.argv.slice(2).join(" ")


const main = (async () =>{
    const session = await pronote.login(url, process.env.LOGIN, process.env.PASSWORD, process.env.CAS);
    console.log(session.user.name)
    const marks = await session.marks(trimester);
    
    const [ student, average, best, relative_to_best ] = compute_stats(marks);

    console.table({ 
        Student: student, 
        Classmates: average, 
        "Theoritical Perfect Student": best, 
        "Relative to Best": relative_to_best + " %",
    })
})()
.catch(err => {
    if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
        console.error('Failed to login, check your credentials.');    
    } else {
        console.error(err);
    }
});

