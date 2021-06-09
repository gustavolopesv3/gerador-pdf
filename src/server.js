const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const app = express()

app.use(express.json());

app.post('/pdf', async(request, response) => {
    console.log(request.body)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let nome = request.body.nome
    await page.goto('http://localhost:3000/'+nome, {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)

})

app.get('/:nome', (request, response) => {

    let nome = request.params.nome

    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { nome }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }
    
        // enviar para o navegador
        return response.send(html)
    })
   
})

app.listen(3000,()=>{
    console.log('api iniciado na porta 3000')
})
