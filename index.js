const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

const path = require('path');
const fs = require('fs');
const https = require('https');

// 跨域
app.use(cors());

// 静态
app.use("/", express.static(path.join(__dirname, 'public')));

// 连接数据库
const db = require("./config/keys").mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
        .then(() => {
            console.log("Mongodb connected");     
        })
        .catch((err) => {
            console.log(err);
        })

const tinyurl = require("./routes/api/tinyurl");
const longurl = require("./routes/api/longurl");
const qrdecode = require("./routes/api/qrdecode");
const qrcode = require("./routes/api/qrcode");
const qqinfo = require("./routes/api/qqinfo");
const sitetitle = require("./routes/api/sitetitle");
const icp = require("./routes/api/icp.js");
const onenote = require("./routes/api/onenote");
const cloudmusic = require("./routes/api/cloudmusic");
const bing = require("./routes/api/bing");

app.use("/api/tinyurl", tinyurl);
app.use("/api/longurl", longurl);
app.use("/api/qrdecode", qrdecode);
app.use("/api/qrcode", qrcode);
app.use("/api/qqinfo", qqinfo);
app.use("/api/sitetitle", sitetitle);
app.use("/api/icp", icp);
app.use("/api/onenote", onenote);
app.use("/api/cloudmusic", cloudmusic);
app.use("/api/bing", bing);

const statistic = require("./routes/api/statistic");
app.use("/api/statistic", statistic);


const port = 3000;
app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});



// https配置 不需要https可将下面代码删除
// const httpsOption = {
//     cert: fs.readFileSync("./certificate/xxxxx.pem"),
//     key: fs.readFileSync("./certificate/xxxxx.key")
// }
// https.createServer(httpsOption, app).listen(444);