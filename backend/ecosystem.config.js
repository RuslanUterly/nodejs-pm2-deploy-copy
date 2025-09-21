require('dotenv').config({ path: __dirname + '/.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-api",
      script: "dist/app.js",
      env: {
        NODE_ENV: 'production',
        DB_ADDRESS: 'mongodb://127.0.0.1:27017/mestodb?directConnection=true'
      }
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: "~/.ssh/id_ed25519",
      "pre-deploy-local": `scp -i ~/.ssh/id_ed25519 .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
      "post-deploy": 'source $HOME/.nvm/nvm.sh && cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
  },
}; 

// require('dotenv').config({ path: __dirname + '/.env.deploy' });

// const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

// module.exports = {
//   apps: [
//     {
//       name: "mesto-api",
//       script: "dist/app.js",
//       env: {
//         NODE_ENV: 'production',
//         DB_ADDRESS: 'mongodb://127.0.0.1:27017/mestodb?directConnection=true'
//       }
//     },
//   ],
//   deploy: {
//     production: {
//       user: DEPLOY_USER,
//       host: DEPLOY_HOST,
//       ref: DEPLOY_REF,
//       repo: DEPLOY_REPO,
//       path: DEPLOY_PATH,
//       key: "~/.ssh/vm_access/private",
//       "pre-deploy-local": `scp -i ~/.ssh/vm_access/private .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
//       "post-deploy": 'source $HOME/.nvm/nvm.sh && cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
//     },
//   },
// }; 