require('dotenv').config({ path: __dirname + '/.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: "~/.ssh/vm_access/private",
      "post-deploy": 'cd frontend && pwd && npm i && npm audit fix --force && npm run build'
    },
  },
}; 