var context = require.context('.', true, /.+\.test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
import 'phantomjs-polyfill-object-assign';
import {assert} from 'chai';
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
import raf from 'raf';
raf.polyfill();

