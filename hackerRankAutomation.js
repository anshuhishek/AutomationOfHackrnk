//node hackerRankAutomation.js --source=https://www.hackerrank.com/ 
//node hackerRankAutomation.js --config=config.json --source=https://www.hackerrank.com/ 
let minimist= require("minimist");
let puppeteer= require("puppeteer");
let fs= require("fs");
//const { config } = require("process");
let args= minimist(process.argv);
console.log(args.source);
//console.log(args.config);
let configJSON = fs.readFileSync(args.config,"utf-8");

let confiJSO= JSON.parse(configJSON);
//console.log(confiJSO.password);
//let num=3;

async function run(){
    let browser=puppeteer.launch({
        headless:false,
        args:[
            '--start-maximized'
        ],
        defaultViewport:null
    });
    let pages= await (await browser).pages();
    let page=pages[0];
    await page.goto(args.source);
    //start
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");
    
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",confiJSO.userid,{delay:5});
    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']",confiJSO.password,{delay:30});
    //href="https://www.hackerrank.com/login"
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");
    //(await browser).close();

    //click on to compete
    await page.waitForSelector("a[data-analytics='NavBarContests']",{delay:50});
    await page.click("a[data-analytics='NavBarContests']");

    //click on manage
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");
    //click on first constest
    await page.waitForSelector("p.mmT",{delay:300});
    await page.click("p.mmT");

    //click on moderator
    await page.waitForSelector("li[data-tab='moderators']");
    await page.click("li[data-tab='moderators']");
    //typing for moderator
    await page.waitForSelector("input#moderator");
    await page.type("input#moderator",confiJSO.moderators,{delay:30});
   // await page.waitForSelector
     console.log("browser done");
     

}
run();
//node hackerRankAutomation.js --config=config.json --source=https://www.hackerrank.com/ 