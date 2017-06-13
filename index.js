#!/usr/bin/env node
const fs = require('fs');

const Meow = require('meow');
const execa = require('execa');
const chalk = require('chalk');

const cli = new Meow(`

    Usage: ${chalk.yellow('committer')} ${chalk.gray('<selector> <commit> [-a]')}
    \n

`, {
	alias: {
		a: 'all',
		h: 'help',
		v: 'version'
	}
});

const committer = function (action, flags) {
	const commit = (action[1]) ? action[1] : ':tada:';
	const selector = action[0] ? action[0] : '*';

	if (fs.existsSync('./.git') === false) {
		execa('git', ['init']).then(result => {
			console.log(result.stdout);
			console.log();
			console.log();
			execa('git', ['add', selector]).then(() => {
				if (flags.add) {
					execa('git', ['commit', '-a', '-m', commit]).then(result => {
						console.log(result.stdout);
					}).catch(e => {
						console.log(e.message);
					});
				} else {
					execa('git', ['commit', '-m', commit]).then(result => {
						console.log(result.stdout);
					}).catch(e => {
						console.log(e.message);
					});
				}
			}).catch(e => {
				console.log(e.message);
			});
		}).catch(e => {
			console.log(e.message);
		});
	} else {
		execa('git', ['add', selector]).then(() => {
			if (flags.add) {
				execa('git', ['commit', '-a', '-m', commit]).then(result => {
					console.log(result.stdout);
				}).catch(e => {
					console.log(e.message);
				});
			} else {
				execa('git', ['commit', '-m', commit]).then(result => {
					console.log(result.stdout);
				}).catch(e => {
					console.log(e.message);
				});
			}
		}).catch(e => {
			console.log(e.message);
		});
	}
};

committer(cli.input, cli.flags);
