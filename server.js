// Import the Express library
const express = require('express');
const fs = require('fs'); // Mô-đun đọc file
// Initialize the app
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
// Đường dẫn mặc định tới thư mục views
app.set('views', './views');
// Define a port
const PORT = 3000;

// Create a basic route
app.get('/', (req, res) => {
    res.render('index');
});

let dulieu = {}

let arr = [
    'co-all-btn-all-sm-all-bb',
    'co-all-btn-all-sm-f-bb',
    'co-all-btn-all-sm',
    'co-all-btn-f-sm-all-bb',
    'co-all-btn-f-sm-f-bb',
    'co-all-btn-f-sm',
    'co-all-btn',
    'co-f-btn-all-sm-f-bb',
    'co-f-btn-all-sm-all-bb',
    'co-f-btn-all-sm',
    'co-f-btn-f-sm-all-bb',
    'co-f-btn-f-sm',
    'co-f-btn',
    'co'
]
for (let el of arr) {
    const data = fs.readFileSync(`arrdata/${el}.json`, 'utf8');
    // let dulieu_rage = JSON.parse(data)
    // let arr_ = Object.values(dulieu_rage)
    dulieu[el] = JSON.parse(data)
}
let order = ["A", "K", "Q", "J", "T", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

app.get("/chonbai_rage/:act", async (req, res) => {

    let act = req.params.act;
    if (!act) {
        res.json({
            "kq": "err",
            status: 700
        })
    } else {

        let check = dulieu[act]
        if (!check) {
            res.json({
                "kq": "err1",
                status: 700
            })
        } else {

            res.json({
                "kq": check,
                status: 200
            })
        }
    }
})

function timaction2nguoi(check1, check2, check3) {
    let action = "co-f-btn-f-sm-";
    // #  0 là ko tham gia
    // #  1 là có tham gia nhưng chưa action
    // #  2 là đã chọn fold btn-sm-bb
    // #  3 là đã chọn all

    if (check1 !== 0) {
        check1 = check1

    }
    if (check2 !== 0) {

        check1 = check2
    }
    if (check3 !== 0) {

        check1 = check3
    }



    if (check1 != 1) {
        //  mình là bb
        if (check1 == 2) {
            action = action + "f-bb"
        } else {
            action = action + "all-bb"
        }


        return action
    }


    //  mình la ng đầu tiền action
    return "co-f-btn-f-sm"
}
function timaction3nguoi(check1, check2, check3) {
    let action = "co-f-btn-";
    // #  0 là ko tham gia
    // #  1 là có tham gia nhưng chưa action
    // #  2 là đã chọn fold btn-sm-bb
    // #  3 là đã chọn all

    if (check1 === 0) {
        check1 = check2
        check2 = check3
    }
    if (check2 === 0) {

        check2 = check3
    }



    if (check1 != 1) {
        //  mình là bb
        if (check1 == 2) {
            action = action + "f-sm-"
        } else {
            action = action + "all-sm-"
        }
        if (check2 == 2) {
            action = action + "f-bb"
        } else {
            action = action + "all-bb"
        }

        return action
    }
    if (check2 != 1) {
        //  mình là sm
        if (check2 == 2) {
            action = action + "f-sm"
        } else {
            action = action + "all-sm"
        }

        return action

    }

    //  mình la ng đầu tiền action
    return "co-f-btn"
}

function timaction4nguoi(check1, check2, check3) {
    let action = "co-";
    // #  0 là ko tham gia
    // #  1 là có tham gia nhưng chưa action
    // #  2 là đã chọn fold
    // #  3 là đã chọn all

    if (check1 != 1) {
        //  mình là bb
        if (check1 == 2) {
            action = action + "f-btn-"
        } else {
            action = action + "all-btn-"
        }
        if (check2 == 2) {
            action = action + "f-sm-"
        } else {
            action = action + "all-sm-"
        }
        if (check3 == 2) {
            action = action + "f-bb"
        } else {
            action = action + "all-bb"
        }
        return action
    }
    if (check2 != 1) {
        //  mình là sm
        if (check2 == 2) {
            action = action + "f-btn-"
        } else {
            action = action + "all-btn-"
        }
        if (check3 == 2) {
            action = action + "f-sm"
        } else {
            action = action + "all-sm"
        }
        return action

    }
    if (check3 != 1) {
        //  mình là btn

        if (check3 == 2) {
            action = action + "f-btn"
        } else {
            action = action + "all-btn"
        }

        return action
    }
    //  mình la ng đầu tiền action
    return "co"
}

app.post("/chonbai", async (req, res) => {
  
    let { check1, check2, check3, labai, chatbai } = req.body;
    if (check1 === undefined || check2 === undefined || check3 === undefined || labai === undefined || chatbai === undefined) {
        console.log("loi bai 1", req.body)

        return res.status(200).json({
            data: "fold",
            status: false,
            action_res: "fold",
            code: 0,
            success: true,
            msg: "erro1"
        })
    }
    labai = labai.filter(e => {
        if (order.includes(e)) {
            return true
        } else {
            return false
        }
    })
    if (labai.length != 2) {
        console.log("loi bai ", req.body)

        return res.status(200).json({
            data: "fold",
            status: false,
            action_res: "fold",
            code: 0,
            success: true,
            msg: "erro1"
        })
    }
    chatbai = chatbai.filter(e => e && e != 'none')
    if (chatbai.length != 2) {
        console.log("loi chat chatbai", req.body)
        return res.status(200).json({
            data: "fold",
            status: false,
            action_res: "fold",
            code: 0,
            success: true,
            msg: "erro2"
        })
    }

    // let bai = req.params.bai;

    let act = ""
    // #  0 là ko tham gia
    // #  1 là có tham gia nhưng chưa action
    // #  2 là đã chọn fold
    // #  3 là đã chọn all
    let songuoitren_ban = 4;
    if (check1 === 0) {
        songuoitren_ban = songuoitren_ban - 1
    }
    if (check2 === 0) {
        songuoitren_ban = songuoitren_ban - 1
    }
    if (check3 === 0) {
        songuoitren_ban = songuoitren_ban - 1
    }
    let err = false
    if (songuoitren_ban == 4) {
        // 
        if (check1 == 2 || check1 == 3) {
            if (check2 == 1 || check3 == 1) {
                err = true
            }
        }
        if (check2 == 2 || check2 == 3) {
            if (check3 == 1) {
                err = true
            }
        }
        if (err) {
            console.log("loi chat err", req.body)
            return res.status(200).json({
                data: "fold",
                status: false,
                action_res: "fold",
                code: 0,
                success: true,
                msg: "erro2"
            })
        }
        //  4 người thì 

        act = timaction4nguoi(check1, check2, check3)

    }
    if (songuoitren_ban == 3) {
        act = timaction3nguoi(check1, check2, check3)
    }
    if (songuoitren_ban == 2) {
        act = timaction2nguoi(check1, check2, check3)
    }

    if (!act) {
        console.log("loi chat chatbai", req.body)
        return res.status(200).json({
            data: "fold",
            status: false,
            action_res: "fold",
            code: 0,
            success: true,
            msg: "erro2"
        })
    } else {

        let check = dulieu[act]
        if (!check) {
            console.log("loi chat chatbai", req.body)
            return res.status(200).json({
                data: "fold",
                status: false,
                action_res: "fold",
                code: 0,
                success: true,
                msg: "erro2"
            })
        } else {
            let arr = check['dulieu']
            let labai_ = ""
            labai = labai.map(e => {
                if (e == 10) {
                    return "T"
                }
                return e
            })
            if (labai[0] === labai[1]) {
                labai_ = labai_ + labai[0].toUpperCase() + labai[0].toUpperCase()
            }
            if (labai[0] !== labai[1]) {
                labai_ = labai_ + labai[0].toUpperCase() + labai[1].toUpperCase()
                if (chatbai[0] === chatbai[1]) {
                    labai_ = labai_ + 's'
                } else {
                    labai_ = labai_ + 'o'
                }
            }
            let phantu = arr.filter(e => e.title === labai_)
            if (phantu.length === 1) {
                console.log(phantu[0],act)
                return res.status(200).json({
                    data: phantu[0].action,
                    status: true,
                    action_res: phantu[0].action,

                    code: 0,
                    success: true,
                    msg: "success",
                })
            } else {
                console.log("loi chat phantu", req.body)
                return res.status(200).json({
                    data: "fold",
                    status: false,
                    action_res: "fold",
                    code: 0,
                    success: true,
                    msg: "erro2"
                })
            }



        }
    }
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
