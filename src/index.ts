import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse,TStudents } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// app.get('/ping', (req: Request, res: Response) => {
//     res.send('Pong!')
// })

app.get('/courses',(req:Request, res: Response)=>{
    res.status(200).send(courses)
})

app.get('/students',(req:Request, res: Response)=>{
    res.status(200).send(students)
})

app.get('/students/search',(req:Request, res: Response)=>{
    const q = req.query.q as string
    const studentsFilter = students.filter(
        (student)=>student.name.toLowerCase().includes(q.toLowerCase())
        )
    res.status(200).send(studentsFilter)
})

app.post('/students',(req:Request, res: Response)=>{
    const id= req.body.id
    const name = req.body.name
    const age = req.body.age
 
    const newStudent:TStudents = {
        id: id,
        name:name,
        age:age,
        
    }
    students.push(newStudent)
})