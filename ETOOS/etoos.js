                //bug list

                // 1. 1주차 1페이지 extract_Table 진행 안함
                // - 간헐적 오류인듯
                // waitForTimeout 줘서 해결
                
                // 2. 1주차 11번 페이지에서 extract_Table 후 이런 경고가 뜸
                //(node:39295) UnhandledPromiseRejectionWarning: ReferenceError: document is not defined
                // 미해결

                // 3. 1주차 1페이지 extract_Table 후 오류 코드 
            
                // (node:39577) UnhandledPromiseRejectionWarning: Error: No node found for selector: #records_form > div > img:nth-child(5)
                // 미확인

                // 4. TimeoutError: waiting for selector `#ui-datepicker-div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a` failed: timeout 30000ms exceeded

                // 5. 주차별 1page 만 탐색하고 다음 주차로 넘어가는 오류 발생

const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({

        headless : false,
        defaultViewport : null,
    });

    const page = await browser.newPage();

    function extract_Table(){
        (async()=>{
            for(let i=2; i<12; i++){
                // page 1 ~ 10 Table 추출
                await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
                await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

                await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

                const data = await page.evaluate(()=>{
                    const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
                    return tds.map(td => td.innerText);
            });
                console.log(data)
                await page.waitForTimeout(1000);
                // if(await page.$('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')') === null) break;

            // 10페이지 Table 추출 후 11페이지로 넘어감
            if(i===11){
                
                await page.waitForTimeout(1000);
                await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
                await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
                
                // page 11 ~ 20 Table 추출
                for(let j=3; j<13; j++){ 
                    page.waitForNavigation;

                    await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
                    await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            
                    await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
            
                    const data = await page.evaluate(()=>{
                        const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30')); 
                        return tds.map(td => td.innerText);    
                    });
                    console.log(data);
                    await page.waitForTimeout(1000);
                    if(await page.$('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')') === null) break;
                };
            };                                                                                                                                                               
        };
        })();
    };

    function search_Callender(){
        // 달력 6/1 이동
        (async() => {

            await page.waitForNavigation;

            for(let x=1; x<=4; x++){
                // 달력 앞, 뒤 버튼, 검색 로딩
                
                await page.waitForSelector('#records_form > div > img:nth-child(5)');
                await page.waitForSelector('#btn_search');
                // 달력 앞 버튼 클릭
                await page.waitForNavigation;
                await page.waitForTimeout(4000);
                await page.waitForSelector('#records_form > div > img:nth-child(3)');
                await page.click('#records_form > div > img:nth-child(3)');
                await page.waitForTimeout(4000);
                // 시작 일 지정

                await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child('+ (x+2) +') > a');    
                await page.waitForTimeout(2000);
                await page.click('#ui-datepicker-div > table > tbody > tr:nth-child('+ x +') > td:nth-child('+ (x+2) +') > a');
                await page.waitForTimeout(2000);
                // 달력 뒤 버튼 클릭
                await page.click('#records_form > div > img:nth-child(5)');
                await page.waitForTimeout(2000);
                // 끝나는 일 지정
                await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child('+ (x+1) +') > td:nth-child('+ (x+2) +') > a');    
                await page.click('#ui-datepicker-div > table > tbody > tr:nth-child('+ (x+1) +') > td:nth-child('+ (x+2) +') > a');
                await page.waitForTimeout(1000);
                // 달력 검색 버튼 클릭
                await page.click('#btn_search');    
                page.waitForNavigation;

                await extract_Table();

                await page.waitForTimeout(1000);

            }
        })();
    };    

    await page.goto('https://www.etoos.com/member/login.asp?returnUrl=http://247.etoos.com/lms/index.do');  
    page.waitForNavigation;
    await page.waitForTimeout(1000);
    // ID, PW 입력
    await page.type('#mem_id', 'id');
    await page.type('#pwdtmp', 'pw');
    
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
    
    //6/1 ~ 6/8 Table 추출
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
//         console.log(data)

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
//             console.log(data)
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
//         console.log(data)

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
//             console.log(data)
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
//         console.log(data)

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
//             console.log(data)
//         }
//         break;
//     }
// }

//     await browser.close();
    
})();


