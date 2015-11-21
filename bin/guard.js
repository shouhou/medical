var cp = require('child_process');
var fs = require('fs');
var worker;

function spawn(server) {
    //进行守护，开启IPC通道，双向通信
    worker = cp.spawn('node', [server], {
        stdio: [0, 1, 2, 'ipc']
    });
    //监视子进程，当其崩溃时处理
    worker.on('exit', function(code) {
        if (code !== 0) {
            console.log('worker is shut down, restarting...');
            spawn(server); //重启服务
        };
    });
    //收到子进程消息
    worker.on('message', function(msg) {
        var date = new Date();
        var now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        fs.appendFile('./log/medical_' + now + '.log', msg, 'utf-8', function(err) {
            if (err) console.log('write:', err);
        });
    });
};

(function main() {
    spawn('./bin/www'); //要守护的进程文件
    process.on('SIGTERM', function() {
        worker.kill();
        process.exit(0);
    });
})();
