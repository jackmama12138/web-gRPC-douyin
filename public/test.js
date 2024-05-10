const pbjs = require('pbjs');

const schema = pbjs.parseSchema(`
  message Demo {
    optional int32 x = 1;
    optional float y = 2;
  }
`).compile();

const buffer = schema.encodeDemo({x: 1, y: 2});
console.log(buffer);

const message = schema.decodeDemo(buffer);
console.log(message);