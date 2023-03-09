const express = require ('express')
const app = express ()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('port',8080)
app.listen(
    app.get('port'),
    ()=>(console.log('SERVER PORT:'+app.get('port')))
)