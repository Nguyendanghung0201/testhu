const fs = require('fs');
let arr = [
    'co-all-btn-all-sb-all-bb',
    'co-all-btn-all-sb-f-bb',
    'co-all-btn-all-sb',
    'co-all-btn-f-sb-all-bb',
    'co-all-btn-f-sb-f-bb',
    'co-all-btn-f-sb',
    'co-all-btn',
    'co-f-btn-al-sm-f-bb',
    'co-f-btn-all-sm-all-bb',
    'co-f-btn-all-sm',
    'co-f-btn-f-sm-all-bb',
    'co-f-btn-f-sm',
    'co-f-btn',
    'co1'
]
for (let el of arr) {
    // const html = fs.readFileSync(, 'utf8');
    const outputFilePath = `json/${el}.json`;

    fs.readFile(`output/${el}.txt`, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const lines = data.trim().split('\n');
        const result = {};
        let tongcall = 0
        lines.forEach((line) => {
            const parts = line.split('|').map((part) => part.trim()); // Tách các phần của dòng
            const key = parts[0]; // Key (AA, KK, A2s,...)
            const action = parts[1]; // Hành động (call, call_fold, ...)
            const percentages = parts[2]?.split('%')[0]?.trim(); // Lấy giá trị % đầu tiên (nếu có)


            let finalAction = action;
            if(action ==="call"){
                finalAction ="allin"
            }
            if (action === 'call_fold') {
                const percentage = parseFloat(percentages);
                finalAction = percentage > 80 ? 'allin' : 'fold';
            }
            if (action === 'all_fold') {
                const percentage = parseFloat(percentages);
                finalAction = percentage > 80 ? 'allin' : 'fold';
            }
            
               if(finalAction != "fold" && finalAction !="allin"){
                console.log('ajajajajaj ',el,key)
               }

            result[key] = {
                title: key,
                action: finalAction,
                "key": key
            };
            if (finalAction == 'call' ||finalAction == "allin") {
                tongcall++
            }
        });
        let percentage = Math.ceil((tongcall / 169) * 100 * 100) / 100;
        result["total"] = {
            "call": tongcall,
            "fold": 169 - tongcall,
            "call_ratio": percentage,
            "fold_ratio": 100 - percentage
        }

        // console.log(result);

        // Lưu object vào file JSON
        // fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), (err) => {
        //     if (err) {
        //         console.error('Error writing to file:', err);
        //         return;
        //     }
        //     console.log('Data successfully saved to output.json!');
        // });
        
    });
    console.log('xong ', el)
    
}


// Đọc file txt

