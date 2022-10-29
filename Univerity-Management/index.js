//import modules
const express = require("express");
// const chalk = require("chalk")
// const validator = require("validator")

const app = express()
const port = process.env.PORT || 3000;
const user = require("./database/authentication")
const teacher = require("./database/teacher")
const student = require("./database/student")
const chalk = require("chalk")


bodyparser = require("body-parser");

//static files
app.use(express.json(''));
app.use(express.static('views'))
app.use('/myStyle.css',express.static(__dirname+'views/css'))

require("./database/conn");

//set views
app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.send("Welcome to API creation.");
    res.render("home");
})
app.get("/studentLogin", (req, res) => {
    res.render("studentLogin");
})
app.get("/teacherLogin", (req, res) => {
    res.render("teacherLogin");
})
app.get("/teacherInterface", (req, res) => {
    res.render("teacherInterface");
})
app.get("/adminLogin", (req, res) => {
    res.render("adminLogin");
})
app.get("/adminInterface", (req, res) => {
    res.render("adminInterface");
})
app.get("/changeStudentPassPage", (req, res) => {
    res.render("changeStudentPassPage");
})
app.get("/changeTeacherPassPage", (req, res) => {
    res.render("changeTeacherPassPage");
})
app.get("/addStudentByAdminPage", (req, res) => {
    res.render("addStudentByAdminPage");
})
app.get("/addStudentByTeacherPage", (req, res) => {
    res.render("addStudentByTeacherPage");
})
app.get("/addTeacherByAdminPage", (req, res) => {
    res.render("addTeacherByAdminPage");
})
app.get("/deleteStudentByTeacherPage", (req, res) => {
    res.render("deleteStudentByTeacherPage");
})
app.get("/displayStudentByTeacherPage", (req, res) => {
    res.render("displayStudentByTeacherPage");
})
app.get("/deleteStudentByAdminPage", (req, res) => {
    res.render("deleteStudentByAdminPage");
})
app.get("/deleteTeacherByAdminPage", (req, res) => {
    res.render("deleteTeacherByAdminPage");
})
app.get("/displayStudentByAdminPage", (req, res) => {
    res.render("/displayStudentByAdminPage");
})
app.get("/displayTeacherByAdminPage", (req, res) => {
    res.render("displayTeacherByAdminPage");
})
app.get("/displayStudentByTeacherPage", (req, res) => {
    res.render("displayStudentByTeacherPage");
})




app.post("/adminLogin", function (req, res) {
    res.redirect("adminLogin")
})

app.post("/studentLogin", function (req, res) {
    res.redirect("studentLogin")
})
app.post("/teacherLogin", function (req, res) {
    res.redirect("teacherLogin")
})
app.post("/addStudentByAdminPage", function (req, res) {
    res.redirect("addStudentByAdminPage")
})
app.post("/addTeacherByAdminPage", function (req, res) {
    res.redirect("addTeacherByAdminPage")
})
app.post("/addStudentByTeacherPage", function (req, res) {
    res.redirect("addStudentByTeacherPage")
})
app.post("/deleteStudentByTeacherPage", function (req, res) {
    res.redirect("deleteStudentByTeacherPage")
})
app.post("/deleteStudentByAdminPage", function (req, res) {
    res.redirect("deleteStudentByAdminPage")
})
app.post("/deleteTeacherByAdminPage", function (req, res) {
    res.redirect("deleteTeacherByAdminPage")
})
app.post("/displayStudentByAdminPage", (req, res) => {
    res.render("displayStudentByAdminPage");
})
app.post("/displayTeacherByAdminPage", (req, res) => {
    res.render("displayTeacherByAdminPage");
})
app.post("/displayStudentByTeacherPage", (req, res) => {
    res.render("displayStudentByTeacherPage");
})
app.post('/studentInterface', async (req, res) => {


    // res.send("user registered!");
    //code for inserting document into a collection
    try {
        // console.log(req.body.user_pass)
        const addstudent = new student(req.body);
        console.log(addstudent);
        addstudent.save();
        res.render("studentInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Username and Password"))
        console.log(e);
        res.render("studentLogin")
    }
})
app.post('/teacherInterface', async (req, res) => {

    try {
        var teacherid = req.body.teacher_id;
        var teacherpass = req.body.teacher_pass;
        // console.log(studid); //debugging 
        const getTeacher = await teacher.findOne({ teacher_id: teacherid, teacher_pass: teacherpass });
        console.log(teacherid, teacherpass); //debugging
        // console.log(getTeacher)
        if (getTeacher != null)
            res.render("teacherInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Username and Password"))
        res.send(e);
        res.redirect("teacherLogin")
    }
})
app.post('/adminInterface', async (req, res) => {


    // res.send("user registered!");
    //code for inserting document into a collection
    try {
        // console.log(req.body.user_pass)
        // const adduser = new user(req.body);
        // console.log(adduser,req.body.userid,req.body.userpassword,adduser.userid ,adduser.userpassword)
        if (req.body.adminid == "Admin" && req.body.adminpassword == 'Admin')

            res.redirect("adminInterface")
        else {
            // console.log("Incorrect username and Password")
            console.log(chalk.red("Incorrect Username and Password"))
            res.redirect("adminLogin")
        }
    }

    catch (e) {
        console.log(e);
    }
})
app.post('/changeStudentPass', async (req, res) => {

    try {
        let studentid = req.body.studentid;
        let studentoldpassword = req.body.studentoldpassword;
        let studentnewpassword = req.body.studentnewpassword;
        console.log(studentid, studentoldpassword, studentnewpassword)

        student.updateOne({ student_id: studentid, student_pass: studentoldpassword }, { $set: { student_pass: studentnewpassword } }, function (err, res) {
            if (err) throw err;
            // console.log("Successfully Updated");
        console.log(chalk.green('Password Successfully Updated'));

        })
        
        res.redirect("StudentLogin");

    }

    catch (e) {
        console.log(chalk.red("Incorrect Details"))
        console.log(e);
        res.redirect("StudentLogin");

    }
})
app.post('/changeTeacherPass', async (req, res) => {

    try {
        let teacherid = req.body.teacherid;
        let teacheroldpassword = req.body.teacheroldpassword;
        let teachernewpassword = req.body.teachernewpassword;
        console.log(teacherid, teacheroldpassword, teachernewpassword)

        teacher.updateOne({ teacher_id: teacherid, teacher_pass: teacheroldpassword }, { $set: { teacher_pass: teachernewpassword } }, function (err, res) {
            if (err) throw err;
            // console.log("Successfully Updated");
        console.log(chalk.green('Password Successfully Updated'));

        })
        res.redirect("teacherLogin");

    }

    catch (e) {
        console.log(chalk.red("Incorrect Details"))
        console.log(e);
        res.redirect("teacherLogin");

    }
})

app.post("/addStudentByAdmin", (req, res) => {
    // res.send("student registered!");
    //code for inserting document into a collection
    try {
        const addstudent = new student(req.body);
        console.log(addstudent);
        addstudent.save();
        console.log(chalk.green('Student Successfully Added'));
        res.render("adminInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Username and Password"))
        console.log(e);
        res.redirect("adminInterface")
    }
})

app.post('/addStudentByTeacher', async (req, res) => {


    // res.send("user registered!");
    //code for inserting document into a collection
    try {
        // console.log(req.body.user_pass)
        const addstudent = new student(req.body);
        console.log(chalk.green.inverse('Student Successfully Added'));
        addstudent.save();
        res.redirect("teacherInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Username and Password"))
        console.log(e);
        res.redirect("teacherInterface")
    }
})
app.post('/addTeacherByAdmin', async (req, res) => {


    // res.send("user registered!");
    //code for inserting document into a collection
    try {
        // console.log(req.body.user_pass)
        const addteacher = new teacher(req.body);
        // console.log(addteacher);
        console.log(chalk.green('Teacher Successfully Added'));
        addteacher.save();
        res.redirect("adminInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Username and Password"))
        console.log(e);
        res.redirect("adminInterface")
    }
})

app.post('/deleteStudentByTeacher',async (req, res) => {

    // let teacherid = req.body.teacherid;
    let studentid=req.body.studentid
    console.log(studentid,req.body.studentid)
    try {
        student.deleteMany({student_id: studentid}, function(err, result){
            if(err) throw err;
            console.log(chalk.green(studentid+"Deleted Successfully "));
        })
        
        res.redirect("teacherInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect student Id"))
        console.log(e);
        res.redirect("teacherInterface")
    }
})

app.post('/deleteStudentByAdmin',async (req, res) => {

    // let teacherid = req.body.teacherid;
    let studentid=req.body.studentid
    console.log(studentid,req.body.studentid)
    try {
        student.deleteMany({student_id: studentid}, function(err, result){
            if(err) throw err;
            console.log(chalk.green(studentid+"Deleted Successfully "));
        })
        
        res.redirect("adminInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect student Id"))
        console.log(e);
        res.redirect("adminInterface")
    }
})
app.post('/deleteTeacherByAdmin',async (req, res) => {

    // let teacherid = req.body.teacherid;
    let teacherid=req.body.teacherid
    console.log(teacherid,req.body.teacherid)
    try {
        teacher.deleteMany({teacher_id: teacherid}, function(err, result){
            if(err) throw err;
            console.log(chalk.green(teacherid+"Deleted Successfully "));
        })
        
        res.redirect("adminInterface");
    }
    catch (e) {
        console.log(chalk.red("Incorrect Teacher Id"))
        console.log(e);
        res.redirect("adminInterface")
    }
})

//Listening of Port
app.listen(port);