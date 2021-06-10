const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const app = express()
const cors = require('cors')

const host = '0.0.0.0';
const port = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());


app.post('/pdf', async(request, response) => {
    console.log(request.body)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let nome = request.body.nome
    await page.goto(`http://localhost:${port}/${nome}`, {
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

app.get('/pdf/:nome', async(request, response) => {
    console.log(request.params.nome)
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      })
    const page = await browser.newPage()
    let nome = request.params.nome
    await page.goto(`http://localhost:${port}/${nome}`, {
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

app.get('/',(req,res)=>{
    res.send({ok: 'Hello'})
})

app.listen(port,host,()=>{
    console.log(`api iniciada na porta: ${port}`)
})
