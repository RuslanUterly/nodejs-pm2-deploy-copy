require('dotenv').config({ path: __dirname + '/.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

console.log(DEPLOY_REPO)

// Функция для очистки пути от лишних префиксов (Проблема винды и git bash, если вызывает ошибки на Linux лучше закоментировать функицию и передать path напрямую)
function cleanPath(path) {
  if (!path) return path;
  
  // Удаляем все до первого вхождения "/home"
  const homeIndex = path.indexOf('/home');
  if (homeIndex > 0) {
    return path.substring(homeIndex);
  }
  
  return path;
}

// Очищаем путь
const cleanedDeployPath = cleanPath(DEPLOY_PATH);
console.log(cleanedDeployPath)

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
      path: cleanedDeployPath,
      key: "~/.ssh/vm_access/private",
      "pre-deploy-local": `scp -i ~/.ssh/vm_access/private backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${cleanedDeployPath}/backend`,
      "post-deploy":
        "cd backend && pwd && npm ci && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
}; 