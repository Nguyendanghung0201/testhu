const cheerio = require('cheerio');

const fs = require('fs'); // Mô-đun đọc file

function extractGradientPercentage(html, outputFilePath) {
    const $ = cheerio.load(html);
    const elements = $('.ra_table_cell');
    const result = [];
    // Lặp qua từng phần tử và in ra nội dung hoặc thuộc tính
    elements.each((index, element) => {
        const id = $(element).attr('id'); // Lấy id của phần tử (nếu có)
        const style = $(element).attr('style');
        const title = $(element).find('.rtc_title').text().trim();

        //  
        if (style.includes('background-image: linear-gradient(to right, rgb(90, 185, 102), rgb(90, 185, 102)), linear-gradient(to right, rgb(61, 124, 184), rgb(61, 124, 184))')) {
            const backgroundSizeMatch = style.match(/background-size: ([\d.%]+ [\d.%]+, [\d.%]+ [\d.%]+)/);
            if (backgroundSizeMatch) {
                const backgroundSize = backgroundSizeMatch[1]; // Lấy giá trị phần trăm
                result.push(`${title} | call_fold | ${backgroundSize}`);
            }
        }
        else if (style.includes('background-image: linear-gradient(to right, rgb(125, 31, 31), rgb(125, 31, 31)), linear-gradient(to right, rgb(61, 124, 184), rgb(61, 124, 184));')) {
            const backgroundSizeMatch = style.match(/background-size: ([\d.%]+ [\d.%]+, [\d.%]+ [\d.%]+)/);
            if (backgroundSizeMatch) {
                const backgroundSize = backgroundSizeMatch[1]; // Lấy giá trị phần trăm
                result.push(`${title} | all_fold | ${backgroundSize}`);
            }
        } else if (style.includes('background-image: linear-gradient(to right, rgb(125, 31, 31), rgb(125, 31, 31))') &&
            style.includes('background-size: 100% 100%')) {
            result.push(`${title} | allin`);
            // background-image: linear-gradient(to right, rgb(90, 185, 102), rgb(90, 185, 102)); background-size: 100% 100%;
        } else if (style.includes('background-image: linear-gradient(to right, rgb(90, 185, 102), rgb(90, 185, 102))') &&
            style.includes('background-size: 100% 100%')) {
            result.push(`${title} | call`);
        }
        else if (style.includes('background-image: linear-gradient(to right, rgb(61, 124, 184), rgb(61, 124, 184))') &&
            style.includes('background-size: 100% 100%')) {
            result.push(`${title} | fold`);
        }
        else {
            console.log("loi ko xac dinh ", title)
        }

    });
    // console.log(result)
    fs.writeFile(outputFilePath, result.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error('Lỗi khi ghi file:', err);
        } else {
            console.log('Ghi file thành công:', outputFilePath);
        }
    });
}
let arr = [
    'co-all-btn-all-sb-all-bb',
    'co-all-btn-all-sb-f-bb',
    'co-all-btn-all-sb',
    'co-all-btn-f-sb-all-bb',
    'co-all-btn-f-sb-f-bb',
    'co-all-btn-f-sb',
    'co-all-btn',
    'co-f-btn-al-sm-f-bb',// bi loi gi do
    'co-f-btn-all-sm-all-bb',
    'co-f-btn-all-sm',
    'co-f-btn-f-sm-all-bb',
    'co-f-btn-f-sm',
    'co-f-btn',
    'co1'
]
for (let el of arr) {
    const html = fs.readFileSync(`app/${el}.txt`, 'utf8');
    const outputFilePath = `json/${el}.txt`;

    extractGradientPercentage(html, outputFilePath)
    console.log('xong ', el)
}
