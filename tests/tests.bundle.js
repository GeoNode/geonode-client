var context = require.context('.', true, /.+\.test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
