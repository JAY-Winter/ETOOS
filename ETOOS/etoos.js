
require("dotenv").config();
const puppeteer = require('puppeteer');

console.log("DB_HOST : ", process.env.DB_HOST);
console.log("DB_PASS : ", process.env.DB_PASS);
(async() => {

    const browser = await puppeteer.launch({

        headless : false,
        defaultViewport : null,
    });

    const page = await browser.newPage();

//     function extract_pageNumber(){
//         (async()=>{

//             for(let p=2; p<12; p++){
//                 await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ p +')');
        
//                 const pageNumber = await page.evaluate(()=>{
//                     const pageNumbers = Array.from(document.querySelectorAll('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ p +')'));
//                     return pageNumbers.map(Number => Number.innerText);
//             });
//             console.log(pageNumber);
//         };
//     });
// };

    // function extract_Table(){
    //     (async()=>{

    //         let count =0;
            
    //         await page.waitForNavigation;
            
        
    //         if(pageNumber != "마지막페이지") count++;
    //         else {
    //             for(let i=2; i<=count+1; i++){
    //                 // page 1 ~ 10 Table 추출
    //                 await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
    //                 await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
    
    //                 await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
    //                 const data = await page.evaluate(()=>{
    //                     const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
    //                     return tds.map(td => td.innerText);
    //             });
    //                 console.log(data);
    //         };

            // 10페이지 Table 추출 후 11페이지로 넘어감
            // if(i===11){
                
            //     await page.waitForTimeout(1000);
            //     await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
            //     await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
                
            //     // page 11 ~ 20 Table 추출
            //     for(let j=3; j<13; j++){ 
            //         await page.waitForNavigation;
            //         await page.waitForTimeout(1000);
            //         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            //         await console.log("2342");

            //         let test = await page.$eval(
                        
            //             '#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+j+')', element => {
            //                 return element.textContent;
            //             });                        


            //         if(test = "마 지 막 페 이 지") {
            //             console.log("블랙맘바");   
            //             break;
            //         }
            //             else{
            //                 await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            //                 await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
            //                 await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
            //                 const data = await page.evaluate(()=>{
            //                     const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30')); 
            //                     return tds.map(td => td.innerText);    
            //                 });
            //                 await console.log(data);
    
            //                 break;
            //             };

            //     };
            // };
    //     };
    //     })();
    // };

    function search_Callender(){
        // 달력 6/1 이동
        (async() => {

            await page.waitForNavigation;

            for(let i=1; i<=5; i++){
                // 달력 앞 버튼 클릭
                await page.waitForNavigation;
                await page.waitForSelector('#records_form > div > img:nth-child(3)');
                await page.waitForTimeout(1500);
                await page.click('#records_form > div > img:nth-child(3)');
                await page.waitForTimeout(1500);
                // 시작 일 지정


            for(let x=1; x<=5; x++){
                for(let y=1; y<=7; y++){
                    page.waitForNavigation;

                    if(page.$eval('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child('+ y +') > a').disabled = true) {
                        console.log("This case success");
                        break;
                    }
                    else {
                        console.log("This case is abled")
                        page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child('+ y +') > a');
                        page.click('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child('+ y +') > a');

                    }
                    

                };
                
                // #ui-datepicker-div > table > tbody > tr:nth-child(1) > td.ui-datepicker-week-end.ui-datepicker-other-month.ui-datepicker-unselectable.ui-state-disabled
                // #ui-datepicker-div > table > tbody > tr:nth-child(1) > td:nth-child(2)
            };
                // await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child(3) > a');
                // await page.click('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child(3) > a');
                // await page.waitForTimeout(1500);
                // // 달력 뒤 버튼 클릭
                // await page.waitForSelector('#records_form > div > img:nth-child(5)');
                // await page.click('#records_form > div > img:nth-child(5)');
                // await page.waitForTimeout(1500);
                // // 끝나는 일 지정
                // await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child('+ (x+1) +') > td:nth-child(2) > a');
                // await page.click('#ui-datepicker-div > table > tbody > tr:nth-child('+ (x+1) +') > td:nth-child(2) > a');
                // await page.waitForTimeout(1500);
                // // 달력 검색 버튼 클릭
                // await page.waitForSelector('#btn_search');
                // await page.click('#btn_search');    

                // page.waitForNavigation;

                // await extract_Table();
            };
        })();
    };

    await page.goto('https://www.etoos.com/member/login.asp?returnUrl=http://247.etoos.com/lms/index.do');
    page.waitForNavigation;
    await page.waitForTimeout(1000);
    // ID, PW 입력
    await page.type('#mem_id', process.env.DB_HOST);
    await page.type('#pwdtmp', process.env.DB_PASS);

    // 로그인 버튼 클릭
    await page.click('.btn_login');

    // selector 를 누르기 전 selector를 찾아야하므로 waitForSelector 를 준 다음 click
    // waitForTimeout() 줘서 안정적으로 selector 를 찾게함
    page.waitForNavigation;
    await page.waitForSelector('#lnbmenu > ul > li:nth-child(2) > a');
    await page.waitForTimeout(1000);

    await page.click('#lnbmenu > ul > li:nth-child(2) > a');
    await page.waitForTimeout(1000);

    await page.waitForSelector('#m_PB200717 > a');
    await page.click('#m_PB200717 > a');

    //6월 Table 추출
    // await extract_pageNumber();

    await search_Callender();

//     // 달력 6/9 이동
//     await page.waitForSelector('#records_form > div > img:nth-child(3)');
//     await page.click('#records_form > div > img:nth-child(3)');
    
//     // 6월 9일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a');

//     // 6월 16일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(4) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(4) > a');

//     // 검색 
//     await page.waitForSelector('#btn_search');
//     await page.click('#btn_search');
//     await page.waitForNavigation;

    
//     for(let i =2; i<12; i++){
        
//         // page 1 ~ 10 Table 추출
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

//         await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

//     const data = await page.evaluate(()=>{
    
//         const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//         return tds.map(td => td.innerText);

//     });
//         console.log(data);

//     if(i===11){
//         // 10페이지 Table 추출 후 11페이지로 넘어감
//         await page.waitForTimeout(2000);
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
    
//         // page 11 ~ 20 Table 추출
//         for(let j=3; j<13; j++){ 

//             await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
//             await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
//             await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
//         const data = await page.evaluate(()=>{
        
//             const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//             return tds.map(td => td.innerText);
    
//         });
//             console.log(data);
//         }
//         break;
//     }
// }
//     // 달력 6/17 이동
//     await page.waitForSelector('#records_form > div > img:nth-child(3)');
//     await page.click('#records_form > div > img:nth-child(3)');

//     // 6월 17일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(5) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(5) > a');

//     // 6월 24일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(5) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(5) > a');

//     // 검색 
//     await page.waitForSelector('#btn_search');
//     await page.click('#btn_search');
//     await page.waitForNavigation;

//     for(let i =2; i<12; i++){
        
//         // page 1 ~ 10 Table 추출
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

//         await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

//     const data = await page.evaluate(()=>{
    
//         const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//         return tds.map(td => td.innerText);

//     });
//         console.log(data);

//     if(i===11){
//         // 10페이지 Table 추출 후 11페이지로 넘어감
//         await page.waitForTimeout(2000);
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');

//         // page 11 ~ 20 Table 추출
//         for(let j=3; j<13; j++){ 

//             await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
//             await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');

//             await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

//         const data = await page.evaluate(()=>{
        
//             const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//             return tds.map(td => td.innerText);
    
//         });
//             console.log(data);
//         }
//         break;
//     }
// }
//     // 달력 6/25 이동
//     await page.waitForSelector('#records_form > div > img:nth-child(3)');
//     await page.click('#records_form > div > img:nth-child(3)');

//     // 6월 25일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(6) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(6) > a');

//     // 6월 30일 클릭
//     await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(4) > a');
//     await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(4) > a');

//     // 검색 
//     await page.waitForSelector('#btn_search');
//     await page.click('#btn_search');
//     await page.waitForNavigation;

    
//     for(let i =2; i<12; i++){
        
//         // page 1 ~ 10 Table 추출
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

//         await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

//     const data = await page.evaluate(()=>{
    
//         const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//         return tds.map(td => td.innerText);

//     });
//         console.log(data);

//     if(i===11){
//         // 10페이지 Table 추출 후 11페이지로 넘어감
//         await page.waitForTimeout(2000);
//         await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
//         await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
    
//         // page 11 ~ 20 Table 추출
//         for(let j=3; j<13; j++){ 

//             await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
//             await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
//             await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
//         const data = await page.evaluate(()=>{
        
//             const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
//             return tds.map(td => td.innerText);
    
//         });
//             console.log(data);
//         }
//         break;
//     }
// }

//     await browser.close();
})();
