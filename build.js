const { exec } = require("child_process")

const { paths } = require("node-dir")

const execute = (cmd) =>
	new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error)
			}
			resolve(stdout ? stdout : stderr)
		})
	})

paths("dist", (err, { files }) => {
	files.forEach(async (file) => {
		if (!file.endsWith(".js")) return

        await execute(`npx terser ${file} -o ${file} --ecma 2018 --mangle`)
	})
})
