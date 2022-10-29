const mongoose = require("mongoose");
const chalk=require("chalk")

try {
    mongoose.connect("mongodb://localhost:27017/MyUniversity")
        .then(
            () => { console.log(chalk.green.inverse("Connection created")) }
        )
        .catch(() => { console.log(chalk.red.inverse("Connection Unsuccessful")) })
} catch (error) {
    console.log(error)
}
// finally { console.log("try catch") }

module.exports = mongoose;