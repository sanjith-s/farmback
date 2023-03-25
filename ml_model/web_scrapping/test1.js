const { spawn } = require('child_process');
const ml_model_web1 = async (req,res)=>{
    let result;
    const python = spawn('python', ['./ml_model/web_scrapping/1web.py']);
    python.stdout.on('data', function (data) {
        result = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with ${code}`);
        res.send(result)
    })
}

module.exports={
    ml_model_web1
}