
const puppeteer = require('puppeteer');
    function serchData(){
        
        let Table = '#container > div.contents > div.wrap_tbl_sdw.mgt_30';
    
        for(let i =2; i<12; i++){
        page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child(i)');
        page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child(i)');

        page.waitForSelector('Table');

        const data = page.evaluate(()=>{
        
            const tds = Array.from(document.querySelectorAll(Table));
            return tds.map(td => td.innerText);

        });
            console.log(data)
        }
    }
    
(async () => {

    const browser = await puppeteer.launch({

        headless : false,
        defaultViewport : null,
        
    });

    const page = await browser.newPage();
    
    await page.goto('https://www.etoos.com/member/login.asp?returnUrl=http://247.etoos.com/lms/index.do');  
    await page.waitForNavigation;
    
    // ID, PW 입력
    await page.type('#mem_id', 'ilsan247');
    await page.type('#pwdtmp', 'isd151208^^');
    
    // 로그인 버튼 클릭
    await page.click('.btn_login');
    await page.waitForNavigation;
    
    // selector 를 누르기 전 selector를 찾아야하므로 waitForSelector 를 준 다음 click
    await page.waitForSelector('#lnbmenu > ul > li:nth-child(2) > a');
    await page.click('#lnbmenu > ul > li:nth-child(2) > a');
    await page.waitForTimeout(2000);
    // waitForTimeout() 줘서 안정적으로 selector 를 찾게함
    await page.waitForSelector('#m_PB200717 > a');
    await page.click('#m_PB200717 > a');
    await page.waitForNavigation;
    
    // 달력 5/1 이동
    await page.waitForSelector('#records_form > div > img:nth-child(3)');
    await page.click('#records_form > div > img:nth-child(3)');
    
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(1) > td:nth-child(7) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(1) > td:nth-child(7) > a');

    await page.waitForSelector('#btn_search');
    await page.click('#btn_search');    
    await page.waitForNavigation;

    for(let i =2; i<12; i++){
        
        // page 1 ~ 10 Table 추출
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

        await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

    const data = await page.evaluate(()=>{
    
        const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
        return tds.map(td => td.innerText);

    });
        console.log(data)

    if(i===11){
        // 10페이지 Table 추출 후 11페이지로 넘어감
        await page.waitForTimeout(2000);
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
    
        // page 11 ~ 20 Table 추출
        for(let j=3; j<13; j++){ 

            await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
            await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
        const data = await page.evaluate(()=>{
        
            const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
            return tds.map(td => td.innerText);
    
        });
            console.log(data)
        }
        break;
    }
}
    // 달력 5/9 이동
    await page.waitForSelector('#records_form > div > img:nth-child(3)');
    await page.click('#records_form > div > img:nth-child(3)');
    
    // 5월 9일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(1) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(1) > a');

    // 5월 16일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(1) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(1) > a');

    // 검색 
    await page.waitForSelector('#btn_search');
    await page.click('#btn_search');
    await page.waitForNavigation;

    
    for(let i =2; i<12; i++){
        
        // page 1 ~ 10 Table 추출
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

        await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

    const data = await page.evaluate(()=>{
    
        const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
        return tds.map(td => td.innerText);

    });
        console.log(data)

    if(i===11){
        // 10페이지 Table 추출 후 11페이지로 넘어감
        await page.waitForTimeout(2000);
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
    
        // page 11 ~ 20 Table 추출
        for(let j=3; j<13; j++){ 

            await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
            await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
        const data = await page.evaluate(()=>{
        
            const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
            return tds.map(td => td.innerText);
    
        });
            console.log(data)
        }
        break;
    }
}
    // 달력 5/17 이동
    await page.waitForSelector('#records_form > div > img:nth-child(3)');
    await page.click('#records_form > div > img:nth-child(3)');

    // 5월 17일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(2) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(2) > a');

    // 5월 24일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(2) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(2) > a');

    // 검색 
    await page.waitForSelector('#btn_search');
    await page.click('#btn_search');
    await page.waitForNavigation;

    
    for(let i =2; i<12; i++){
        
        // page 1 ~ 10 Table 추출
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

        await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

    const data = await page.evaluate(()=>{
    
        const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
        return tds.map(td => td.innerText);

    });
        console.log(data)

    if(i===11){
        // 10페이지 Table 추출 후 11페이지로 넘어감
        await page.waitForTimeout(2000);
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');

        // page 11 ~ 20 Table 추출
        for(let j=3; j<13; j++){ 

            await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');

            await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

        const data = await page.evaluate(()=>{
        
            const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
            return tds.map(td => td.innerText);
    
        });
            console.log(data)
        }
        break;
    }
}
    // 달력 5/25 이동
    await page.waitForSelector('#records_form > div > img:nth-child(3)');
    await page.click('#records_form > div > img:nth-child(3)');

    // 5월 25일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(3) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(5) > td:nth-child(3) > a');

    // 5월 31일 클릭
    await page.waitForSelector('#ui-datepicker-div > table > tbody > tr:nth-child(6) > td:nth-child(2) > a');
    await page.click('#ui-datepicker-div > table > tbody > tr:nth-child(6) > td:nth-child(2) > a');

    // 검색 
    await page.waitForSelector('#btn_search');
    await page.click('#btn_search');
    await page.waitForNavigation;

    
    for(let i =2; i<12; i++){
        
        // page 1 ~ 10 Table 추출
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ i +')');

        await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');

    const data = await page.evaluate(()=>{
    
        const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
        return tds.map(td => td.innerText);

    });
        console.log(data)

    if(i===11){
        // 10페이지 Table 추출 후 11페이지로 넘어감
        await page.waitForTimeout(2000);
        await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
        await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a.btn_next');
    
        // page 11 ~ 20 Table 추출
        for(let j=3; j<13; j++){ 

            await page.waitForSelector('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
            await page.click('#container > div.contents > div.btn_area.mgt_15 > div > a:nth-child('+ j +')');
    
            await page.waitForSelector('#container > div.contents > div.wrap_tbl_sdw.mgt_30');
    
        const data = await page.evaluate(()=>{
        
            const tds = Array.from(document.querySelectorAll('#container > div.contents > div.wrap_tbl_sdw.mgt_30'));
            return tds.map(td => td.innerText);
    
        });
            console.log(data)
        }
        break;
    }
}

    await browser.close();
    
})();