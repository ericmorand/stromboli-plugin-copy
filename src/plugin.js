const fs = require('fs');
const path = require('path');

const Promise = require('promise');
const fsReadFile = Promise.denodeify(fs.readFile);

class Plugin {
  constructor(config) {
    this.config = config || {};
  }

  /**
   *
   * @param file {String}
   * @param renderResult {StromboliRenderResult}
   * @returns {Promise}
   */
  render(file, renderResult) {
    return fsReadFile(file).then(
        function (readData) {
          renderResult.addDependency(file);
          renderResult.addBinary(path.basename(file), readData.toString());

          return renderResult;
        },
        function (err) {
          var error = {
            file: file,
            message: err.message
          };

          return Promise.reject(error);
        }
    );
  }
}

module.exports = Plugin;