const fetchUrl = require("fetch").fetchUrl;



const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('public/index.html')
    // fetchUrl("https://www.tiktok.com/@itstjarki", function (error, meta, body) {
    //     if (error) {
    //         console.log(error);
    //         return;
    //     }

    //     console.log('Incoming request')

    //     const htmlString = body.toString();

    //     const reg = /<strong\stitle.*followers-count">([0-9]*)<\/strong>/;
    //     const result = reg.exec(htmlString);
    //     console.log('Got Follower result: ', result[1]);
    //     res.send(result[1]);
    // });
})

// app.get('/api/followers', (req, res) => {

//     fetchUrl("https://www.tiktok.com/@itstjarki", function (error, meta, body) {
//         if (error) {
//             console.log(error);
//             return;
//         }

//         console.log('Incoming request')

//         const htmlString = body.toString();

//         const reg = /<strong\stitle.*followers-count">([0-9]*)<\/strong>/;
//         const result = reg.exec(htmlString);
//         console.log('Got Follower result: ', result[1]);
//         res.send(result[1]);
//     });
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

