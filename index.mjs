import { chromium } from "playwright";

const browser = await chromium.launch(
    { headless: true }
)

const page = await browser.newPage()

await page.goto(
    'https://www.amazon.com/s?i=specialty-aps&bbn=16225019011&rh=n%3A7141123011%2Cn%3A16225019011%2Cn%3A1040658&language=es'
)

const products = await page.$$eval(
    '.s-card-container',
    (results) => (
        results.map((el) => {

            const title = el
            .querySelector('h2')
            ?.innerText

            if(!title) return null

            const image = el
            .querySelector('img')
            .getAttribute('src')

            const price = el
            .querySelector('.a-price .a-offscreen')
            ?.innerText;

            const link = el
            .querySelector('.a-link-normal')
            .getAttribute('href')

            return { title, image, price, link }
        })
    )
)

console.log(products)
await browser.close()