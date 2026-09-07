import {execFileSync} from 'node:child_process'

function fail(message) {
  console.error(`Deployment stopped: ${message}`)
  process.exit(1)
}

function git(args, options = {}) {
  return execFileSync('git', args, {encoding: 'utf8', ...options})
}

const branch = git(['branch', '--show-current']).trim()

if (branch !== 'main') {
  fail(`the current branch is "${branch || 'detached HEAD'}"; switch to main first`)
}

if (git(['status', '--porcelain']).trim()) {
  fail('the working tree is not clean; commit or stash all changes first')
}

const npmCli = process.env.npm_execpath

if (!npmCli) {
  fail('run this command through npm: npm run deploy:web')
}

try {
  execFileSync(process.execPath, [npmCli, 'run', 'verify:web'], {stdio: 'inherit'})
  execFileSync('git', ['push', 'origin', 'main'], {stdio: 'inherit'})
} catch (error) {
  process.exit(typeof error.status === 'number' ? error.status : 1)
}

console.log('main was pushed successfully; Cloudflare Pages will deploy the commit automatically.')
