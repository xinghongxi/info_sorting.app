/**
 * Created by lifei on 2018/5/9.
 */
const cmdMap = new Map();
let msgId = 0;
export function getCmdId() {
  return ++msgId;
}
//隐藏 Header
export function hiddenHeader() {
  sendMessage('hiddenHeader');
}
//隐藏底部的 TabBar
export function hiddenTabBar() {
  sendMessage('hiddenTabBar');
}

export function showTabBarAndHeader() {
  sendMessage('showTabBarAndHeader');
}
export function hiddenTabBarAndHeader() {
  sendMessage('hiddenTabBarAndHeader');
}
export function setHeaderTitle(title){
  sendMessage('setHeaderTitle',title);
}
export function resetHandlerTitle(){
  sendMessage('resetHandlerTitle')
}

export function removeLogin(){
  sendMessage('removeLogin')
}

export async function getLoginToken() {
  let cmdId = getCmdId();
  sendMessage("getLoginToken",cmdId);
  let result =await waitCommandResult(msgId);
  return result;
}
//发信息给后台。
export function sendMessage(action,margs) {
  try{
    let params = margs || {}
    let m = {
      action,params
    };
    let abcScript = JSON.stringify(m);
    if (window.originalPostMessage) {
      window.postMessage(abcScript);
    } else {
      throw Error('postMessage接口还未注入');
    }
  } catch(e){
    console.error(e);
  }

}
async function waitCommandResult(msgId) {
  var that = this;
  var promise = new Promise(function(resolve, reject) {
    var checkFun = function() {
      if (cmdMap.has(msgId)){
        let result = cmdMap.get(msgId);
        cmdMap.delete(msgId);
        resolve(result);
        return result;
      }else {
        setTimeout(function() {
          checkFun();
        }, 300);
      }
    };
    checkFun();
  });
  return promise;
}

window.document.addEventListener('message', function (e) {
  const message = JSON.parse(e.data)
  if (message.command === 'postAction') {
      let cmdId = message.cmdId;
      let params = message.params;
      cmdMap.set(cmdId,params);
  }
})

