
const pronote = require('pronote-api');
require('dotenv').config();

// Exemple
const url = 'https://0691644m.index-education.net/pronote/';

const mean      = x => x.reduce((a, b) => a+b, 0) / x.length
const median    = x => x.sort()[Math.floor(x.length/2)]
const geometric = x => Math.pow(x.reduce((a, b) => a*b, 1), 1/x.length)
const harmonic  = x => x.length / x.reduce((a, b) => a + 1/b, 0)

const f = x => [mean(x), median(x), geometric(x), harmonic(x)]
const geomonic_meandian = x => Array(100).fill().reduce((acc, _) => f(acc), x)[0]


trimester = process.argv.slice(2).join(" ")


const main = (async () =>{
    const session = await pronote.login(url, process.env.LOGIN, process.env.PASSWORD, process.env.CAS);
    console.log(session.user.name)
    const marks = await session.marks(trimester);
    const geomonics = marks.subjects.map(subject => {
        let personal_marks = [], average_marks = [], best_marks = [], relative_to_best = []
        subject.marks.forEach(m => Array(m.coefficient*100).fill().map(_ => {
            personal_marks.push(m.value / m.scale);
            average_marks.push(m.average / m.scale);
            best_marks.push(m.max / m.scale);
            relative_to_best.push(m.value / m.max);
        }))
        return [personal_marks, average_marks, best_marks, relative_to_best].map(geomonic_meandian)
    })
    personal_geomonics = geomonics.map(x => x[0]).filter(w => !isNaN(w))
    average_geomonics = geomonics.map(x => x[1]).filter(w => !isNaN(w))
    best_geomonics = geomonics.map(x => x[2]).filter(w => !isNaN(w))
    relative_geomonics = geomonics.map(x => x[3]).filter(w => !isNaN(w))

    personal_global_geomonic_meandian = Math.round(geomonic_meandian(personal_geomonics) * 2000) / 100
    average_global_geomonic_meandian = Math.round(geomonic_meandian(average_geomonics) * 2000) / 100
    best_global_geomonic_meandian = Math.round(geomonic_meandian(best_geomonics) * 2000) / 100
    relative_global_geomonic_meandian = Math.round(geomonic_meandian(relative_geomonics) * 10000) / 100

    console.table({ 
        Student: personal_global_geomonic_meandian, 
        Classmates: average_global_geomonic_meandian, 
        "Theoritical Perfect Student": best_global_geomonic_meandian, 
        "Relative to Best": relative_global_geomonic_meandian + " %",
    })
})()


