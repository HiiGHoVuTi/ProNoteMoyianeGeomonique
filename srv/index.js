
const app = require("express")();
const cors = require('cors')();
const bodyParser = require("body-parser");
const compute_stats = require("../compute_stats");
const pronote = require("pronote-api");
const { readFileSync } = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors)


app.get("/", (req, res) => {
    const html = readFileSync("./srv/index.html", {encoding: "utf8", flag:"r"});
    res.send(html);
})


app.post("/pronoteAPI", async (req, res) => {
    
    const { user, pwd, url, cas, trimestre } = req.body;
    const session = await pronote.login(url, user, pwd, cas).catch(console.error);
    if(!session) return res.send("Invalid Credentials")
    const marks = await session.marks(trimestre).catch(console.error);

    const data = compute_stats(marks);

    console.log(data)
    res.send(data);

})



const port = 3000;
app.listen(port, () => console.log(`Keepalive at http://localhost:${port}`));

