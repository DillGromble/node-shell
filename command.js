const fs = require('fs'),
      readline = require('readline'),
      request = require('request');


module.exports = {
  pwd: function(file, done) {
    done(process.cwd());
  },

  ls: function(file, done) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      var lines = '';
      files.forEach(function(file) {
        lines += file.toString() + '\n';
      })
      done(lines);
    });
  },

  date: function(file, done) {
    var date = new Date(); // needs to be formatted
    done(date.toISOString());
  },

  echo: function(args, done) {
    done(args.join(' '));
  },

  cat: function (stdin, args, done) {
    stdin = stdin || args[0];

    if (args.includes('|')) var stdout = args.join(' ').split('|').slice(1);

    fs.readFile(stdin, 'utf8' , function (err, data) {
      if (err) console.log(err);
      done(stdout, data);
    });
  },

  head: function (stdin, args, done) {
    stdin = stdin || args[0];
    let num = args[1] || 5;

    fs.readFile(stdin, 'utf8', function (err, data) {
      if (err) console.log(err);
      data = data.split('\n');
      let output = '';

      for (let i = 0; i < num; i++) {
        output += data[i] + '\n';
      }
      done(stdout, output);
    });
  },

  tail: function (args, done) {
    let num = args[1] || 5;
    fs.readFile(args[0], 'utf8', function (err, data) {
      if (err) console.log(err);
      data = data.split('\n');
      let output = '';
      for (let i = data.length - num; i <= data.length; i++) {
        output += data[i] + '\n';
      }
      done(output);
    });
  },

  wc: function (args, done) {
    fs.readFile(args[0], 'utf8', function (err, data) {
      if (err) console.log(err);
      data = data.split('\n');
      done(data.length);
    });
  },

  curl: function (args, done) {
    request(args[0], function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      done(body); // Print the HTML for the Google homepage.
    });
  }



  // head: function (args) {
  //   const rl = readline.createInterface({
  //     input: fs.createReadStream(args[0])
  //   });
  //   let num = args[1] || 5;
  //   rl.on('line', (line) => {
  //     if (num > 0) {
  //       console.log(`${line}`);
  //     }
  //     num--;
  //   });
  // },

  // tail: function (args) {
  //   const rl = readline.createInterface({
  //     input: fs.createReadStream(args[0])
  //   });
  //   var count = 0;
  //   rl.on('line', () => {
  //     console.log(count);
  //     count++;
  //   });
  //   let end = 0;
  //   rl.on('line', (line) => {
  //     console.log(end, count - 5);
  //     if (end > count - 5) {
  //       console.log(line);
  //     }
  //     end++;
  //   })
  // }
}
