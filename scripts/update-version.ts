import consola from 'consola'
import chalk from 'chalk'
import { errorAndExit, getWorkspacePackages } from '@bzsh-ui/build-utils'
import type { Project } from '@pnpm/find-workspace-packages'

async function main() {
  console.log(1)
  const tagVersion = process.env.TAG_VERSION
  console.log(2)
  console.log(tagVersion)
  const gitHead = process.env.GIT_HEAD
  console.log(3)
  console.log(gitHead)
  if (!tagVersion || !gitHead) {
    errorAndExit(
      new Error(
        'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n'
      )
    )
  }

  consola.log(chalk.cyan('Start updating version'))
  consola.log(chalk.cyan(`$TAG_VERSION: ${tagVersion}`))
  consola.log(chalk.cyan(`$GIT_HEAD: ${gitHead}`))

  consola.debug(chalk.yellow(`Updating package.json for bzsh-ui`))
  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).map((pkg) => [pkg.manifest.name!, pkg])
  )
  const bzshUi = pkgs['bzsh-ui']
  const eslintConfig = pkgs['@bzsh-ui/eslint-config']

  const writeVersion = async (project: Project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version: tagVersion,
      gitHead
    } as any)
  }

  try {
    await writeVersion(bzshUi)
    await writeVersion(eslintConfig)
  } catch (err: any) {
    errorAndExit(err)
  }

  consola.debug(chalk.green(`$GIT_HEAD: ${gitHead}`))
  consola.success(chalk.green(`Git tagVersion updated to ${tagVersion}`))
  consola.success(chalk.green(`Git head updated to ${gitHead}`))
}

main()
