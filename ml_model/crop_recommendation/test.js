const { spawn } = require('child_process');
const ml_model = async (req,res)=>{
    let cropname;
    let N=req.body.N;
    let P=req.body.P;
    let K=req.body.K;
    let temperature=req.body.temperature;
    let humidity=req.body.humidity;
    let ph=req.body.ph;
    let rainfall=req.body.rainfall;
    const python = spawn('python', ['./ml_model/crop_recommendation/crop_recomendation.py',N,P,K,temperature,humidity,ph,rainfall]);
    python.stdout.on('data', function (data) {
        cropname = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(cropname)
    })
}

module.exports={
    ml_model
}