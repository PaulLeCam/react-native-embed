Object.defineProperty(exports,"__esModule",{value:true});exports.setup=exports.postResponse=exports.postRequest=exports.postEvent=exports.postMessage=undefined;

var _v=require('uuid/v4');var _v2=_interopRequireDefault(_v);
var _warning=require('warning');var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var requests=Object.create(null);

var onEvent=function onEvent(){
(0,_warning2.default)(false,'onEvent() not implemented');
};

var onRequest=function onRequest(){
(0,_warning2.default)(false,'onRequest() not implemented');
};

var onResponse=function onResponse(_ref){var data=_ref.data,id=_ref.id,ok=_ref.ok;
var req=requests[id];
if(req){
if(ok)req.resolve(data);else
req.reject(data);
}else{
(0,_warning2.default)(false,'No tracked request for response: '+id);
}
};

var onMessage=function onMessage(ev){
try{
var msg=JSON.parse(ev.data);
if(msg.type){
switch(msg.type){
case'event':
onEvent(msg);
break;
case'request':
onRequest(msg);
break;
case'response':
onResponse(msg);
break;
default:
(0,_warning2.default)(false,'Unknown message type: '+msg.type);}

}else{
(0,_warning2.default)(false,'Invalid message: no type provided',msg);
}
}catch(ex){
(0,_warning2.default)(false,'Invalid message: could not parse JSON',data);
}
};

var postMessage=exports.postMessage=function postMessage(){var payload=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
window.postMessage(JSON.stringify(payload));
};

var postEvent=exports.postEvent=function postEvent(_ref2){var name=_ref2.name,data=_ref2.data;
postMessage({name:name,data:data,type:'event'});
};

var postRequest=exports.postRequest=function postRequest(_ref3){var name=_ref3.name,data=_ref3.data;
var id=(0,_v2.default)();
var promise=new Promise(function(resolve,reject){
requests[id]={resolve:resolve,reject:reject};
});
postMessage({name:name,data:data,id:id,type:'request'});
return promise;
};

var postResponse=exports.postResponse=function postResponse(_ref4){var name=_ref4.name,data=_ref4.data,id=_ref4.id;
postMessage({name:name,data:data,id:id,type:'response'});
};

var setup=exports.setup=function setup(){var handlers=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
if(handlers.onEvent){
onEvent=handlers.onEvent;
}
if(handlers.onRequest){
onRequest=handlers.onResponse;
}
if(handlers.onRequest){
onMessage=handlers.onMessage;
}
document.addEventListener('message',onMessage);
};