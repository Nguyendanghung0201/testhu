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
    let output = `arrdata2/${el}.json`;
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Có lỗi khi đọc file:', err);
            return;
        }

        // Chuyển nội dung của file thành mảng (parse JSON)
        const arr = JSON.parse(data);
        let arr_ = Object.values(arr)
        let arr_filt = arr_.filter(e => !e.call)
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
