'use strict'

const promisify = require('js-promisify')
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const gitUrl = 'https://github.com/ArkEcosystem/core'
const gitOptions = { checkoutBranch: 'debug-e2e' }

/**
 * Generates folder structure and files from network configuration
 * @param  {Object} options = { network: 'e2enet', nodes: 3 }
 * @return {void}
 */
module.exports = (options) => {
  console.log('[generate-files] Start');
  
  (new GenerateManager(options)).generate()
}

class GenerateManager {
  /**
   * Create a new generate manager instance.
   * @param  {Object} options
   */
  constructor (options) {
    this.network = options.network
    
    const nodes = []
    for (let i = 0; i < options.nodes ; i++) {
      nodes.push('node' + i)
    }
    this.nodes = nodes

    this.rootPath = path.dirname('../')
  }

  async generate() {
    await this.clone()
    this.createFiles()
  }

  async clone() {
    console.log('[generate-files] Cloning git repo...');
    const clonePromises = []
    const checkoutPromises = []
    this.nodes.forEach( (node) => {
      const nodePath = path.join(this.rootPath, 'dist', this.network, node)
  
      const command = `git clone ${gitUrl} ${nodePath} --branch ${gitOptions.checkoutBranch} --single-branch`
      clonePromises.push(promisify(exec, [ command ]))
    })

    await Promise.all(clonePromises)
    console.log('[generate-files] Git clones done');
  }

  createFiles() {
    // nginx files (proxy for external api requests to the nodes)
    const thisNginxPath = path.join(this.rootPath, 'lib/config/nginx')
    const distNginxPath = path.join(this.rootPath, 'dist', this.network, 'nginx')
    fs.mkdir(distNginxPath, (err) => {
      if (err) {
         return console.error(err);
      }
      copyFiles([
        {
          from: thisNginxPath,
          to: distNginxPath,
          files: [ 'docker-compose.yml', 'nginx.conf' ]
        }
      ])
      console.log(`[generate-files] Files copy done for nginx`);
    })

    const thisNetworkPath = path.join(this.rootPath, 'tests/networks', this.network)
    const thisDockerPath = path.join(this.rootPath, 'lib/config/docker')

    const delegates = JSON.parse(fs.readFileSync(path.join(thisNetworkPath, 'delegates.json'), 'utf8'));

    this.nodes.forEach( (node, index) => {
      const distNodePath = path.join(this.rootPath, 'dist', this.network, node)
      const distCoreNetworkPath = path.join(distNodePath, 'packages/core/lib/config/e2enet')
      const distCryptoNetworkPath = path.join(distNodePath, 'packages/crypto/lib/networks/ark')
      const distDockerPath = path.join(distNodePath, 'docker/testnet') //TODO create our own folder

      fs.mkdir(distCoreNetworkPath, (err) => {
        if (err) {
           return console.error(err);
        }
        console.log(`[generate-files] Directory ${distCoreNetworkPath} created successfully`);

        const arkScript = index > 0 ? 'ark.sh' : 'ark-network-start.sh'

        copyFiles([
          {
            from: thisNetworkPath,
            to: distCoreNetworkPath,
            files: [ 'plugins.js', 'peers.json', 'genesisBlock.json' ]
          },
          {
            from: thisNetworkPath,
            to: distCryptoNetworkPath,
            files: [ 'e2enet.json', 'index.js' ]
          },
          {
            from: thisDockerPath,
            to: distDockerPath,
            files: [ 'docker-compose-stack.yml', 'docker-compose.yml', 'entrypoint.sh' ]
          },
          {
            from: thisDockerPath,
            to: distNodePath,
            files: [ [ arkScript, 'ark.sh' ] ]
          }
        ])
        
        // need to rework delegates.json to distribute them among the nodes
        const nodeDelegates = Object.assign({}, delegates)
        const chunkSize = Math.ceil(delegates.secrets.length / this.nodes.length)
        nodeDelegates.secrets = delegates.secrets.slice(index * chunkSize, (index + 1) * chunkSize)
        fs.writeFile(path.join(distCoreNetworkPath, 'delegates.json'),
            JSON.stringify(nodeDelegates, null, 2),
            (err) => {
              if (err) throw err;
        })

        console.log(`[generate-files] Files copy done for ${node}`);
      });
    })

    copyFiles([
      {
        from: thisDockerPath,
        to: path.join(this.rootPath, 'dist', this.network),
        files: [ 'docker-init.sh', 'docker-start.sh' ]
      }
    ])

    console.log(`[generate-files] Docker files copy done`);

    function copyFiles(filesToCopy) {
      for (const copyParams of filesToCopy) {
        for (const fileName of copyParams.files) {
          const fileNameFrom = Array.isArray(fileName) ? fileName[0] : fileName
          const fileNameTo = Array.isArray(fileName) ? fileName[1] : fileName
          
          fs.createReadStream(path.join(copyParams.from, fileNameFrom))
            .pipe(fs.createWriteStream(path.join(copyParams.to, fileNameTo)))
        }
      }
    }
  }
}
