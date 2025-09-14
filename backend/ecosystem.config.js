const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env.deploy") });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-api",
      script: "dist/app.js",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: "~/.ssh/vm_access/private",
      'pre-deploy-local':
        `ssh -i /c/Users/najmi/.ssh/vm_access/private ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p '${DEPLOY_PATH}/current/backend' && chmod 700 '${DEPLOY_PATH}/current/backend'" && scp -i /c/Users/najmi/.ssh/vm_access/private /c/Users/najmi/Desktop/projects/nodejs-pm2-deploy/backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:'${DEPLOY_PATH}/current/backend/.env'`,
      "post-deploy":
        "cd backend && pwd && npm ci && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
}; 