const { spawn } = require('child_process');
const path = require('path');

const projects = [
    { folder: 'TrellordConnector', port: 3001, nodemon: true, file: 'index.js' },
    
];

projects.forEach(({ folder, port, nodemon, file }) => {
    const route = path.join(__dirname, folder);
    const env = { ...process.env, PORT: port };
    let child;

    if (nodemon) {
        child = spawn('nodemon', [file], { cwd: route, env, shell: true });
    } else {
        child = spawn('npm', ['start'], { cwd: route, env, shell: true });
    }

    child.stdout.on('data', (data) => {
        console.log(`[${folder}] stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`[${folder}] stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`[${folder}] Process finished with code ${code}`);
    });
});
