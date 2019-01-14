/// <reference types="node" />

namespace x_last {

  if (typeof WScript !== 'undefined') {
    WScript.Echo('Download NODE using ActiveXObject and InternetExplorer.Application')
  }
  else if (typeof require === 'function' && typeof process !== 'undefined' && typeof module !== 'undefined' && process && module) {
    node.bootNode();
  }

}