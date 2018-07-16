const crypto = require('crypto'),
	fs = require('fs')

const log = console.log

if ( process.argv.length < 5 ) {
	log('missing parameter')
	process.exit(0)
}

const fileName = process.argv[2]
const encOrDec = process.argv[3]
const key = Buffer.from(crypto.createHash('sha256').update(process.argv[4]+'$^FT%T%WFTY%GW&YGW$T%$&G%$WG&G%WY&DR$^F%&G%T%$G^&%F%YTH*()()(J^%*^&&$NH^*YUG$Y%YG%').digest('hex'),'hex')

if (encOrDec === 'e') {
	encryptFile()
} else if (encOrDec === 'd') {
	decryptFile()
}else{
	log('error in parameters')
}

function encryptFile() {
	const destiny = fileName + '.jhe'
	let file = fs.readFileSync(fileName)
	log('file readed, starting process...')
	for (var i = 0; i < file.length; i++) {
		file[i] += key[ i % key.length ]
	}
	log('Writing started...')
	fs.writeFileSync(destiny,file)
	log('Writing Finished.')
}
function decryptFile() {
	const destiny = fileName + '.jhe'
	let file = fs.readFileSync(destiny)
	log('file readed, starting process...')
	for (var i = 0; i < file.length; i++) {
		file[i] -= key[ i % key.length ]
	}
	log('Writing started...')
	fs.writeFileSync(fileName,file)
	log('Writing Finished.')
}