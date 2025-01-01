// Danh sách mẫu chứa thứ tự title mong muốn
const order = [
    "AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
    "AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
    "AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
    "AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",
    "ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s",
    "A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s",
    "A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s",
    "A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s",
    "A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s",
    "A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s",
    "A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s",
    "A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s",
    "A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"
];

// Tạo từ điển ánh xạ thứ tự
const orderMap = Object.fromEntries(order.map((key, index) => [key, index]));

// Sắp xếp danh sách đầu vào dựa trên thứ tự trong danh sách mẫu
// const sortedList = inputList.sort((a, b) => {
//     return orderMap[a.title] - orderMap[b.title];
// });

// Kết quả
const fs = require('fs');
let arr = [
    'co-all-btn-all-sm-all-bb',
    'co-all-btn-all-sm-f-bb',
    'co-all-btn-all-sm',
    'co-all-btn-f-sm-all-bb',
    'co-all-btn-f-sm-f-bb',
    'co-all-btn-f-sm',
    'co-all-btn',
    'co-f-btn-al-sm-f-bb',
    'co-f-btn-all-sm-all-bb',
    'co-f-btn-all-sm',
    'co-f-btn-f-sm-all-bb',
    'co-f-btn-f-sm',
    'co-f-btn',
    'co'
]
for (let el of arr) {
    // const html = fs.readFileSync(, 'utf8');
    const outputFilePath = `json/${el}.json`;
    let output = `arrdata/${el}.json`;
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Có lỗi khi đọc file:', err);
            return;
        }

        // Chuyển nội dung của file thành mảng (parse JSON)
        const arr = JSON.parse(data);
        let arr_ = Object.values(arr)
        let arr_filt = arr_.filter(e => !e.call)
        arr_filt = arr_filt.sort((a, b) => {
            return orderMap[a.title] - orderMap[b.title];
        });
        let arr_filter2 = arr_.filter(e => e.call)
        // Lưu mảng vào file mới dưới dạng mảng JavaScript
        const result = {
            dulieu: arr_filt,
            total: arr_filter2[0]
        };

        // Lưu đối tượng vào file JSON mới
        fs.writeFile(output, JSON.stringify(result, null, 2), (err) => {
            if (err) {
                console.error('Có lỗi khi lưu file:', err);
                return;
            }
            console.log('File đã được lưu thành công!');
        });
    });


}
// Đọc file JSON và chuyển thành mảng

