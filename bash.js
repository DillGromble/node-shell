var cmds = require('./command.js');

// Output a prompt
process.stdout.write('prompt > ');

function done (stdout, output) {
  stdout = stdout[0].slice(1);
  if (stdout) {
    cmds[stdout](output);
  }
  console.log(output);
  process.stdout.write('\nprompt > ');
}


process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' ');
  var cmd = args[0],
      stdin;
  args = args.slice(1);

  if (cmd === 'pwd') cmds.pwd(args, done);
  if (cmd === 'ls') cmds.ls(args, done);
  if (cmd === 'echo') cmds.echo(args, done);
  if (cmd === 'date') cmds.date(args, done);
  if (cmd === 'cat') cmds.cat(stdin, args, done);
  if (cmd === 'head') cmds.head(stdin, args, done);
  if (cmd === 'tail') cmds.tail(args, done);
  if (cmd === 'wc') cmds.wc(stdin, args, done);
  if (cmd === 'curl') cmds.curl(args, done);

});

