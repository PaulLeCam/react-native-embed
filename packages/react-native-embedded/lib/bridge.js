Object.defineProperty(exports,"__esModule",{value:true});exports.setup=exports.postResponse=exports.postRequest=exports.postEvent=exports.postMessage=exports.removeListener=exports.addListener=undefined;var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator')in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

var _v=require('uuid/v4');var _v2=_interopRequireDefault(_v);
var _warning=require('warning');var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var eventListeners=Map();
var requests=Map();

var onEvent=function onEvent(){
(0,_warning2.default)(false,'onEvent() not implemented');
};

var onRequest=function onRequest(){
(0,_warning2.default)(false,'onRequest() not implemented');
};

var onListenerEvent=function onListenerEvent(_ref){var name=_ref.name,data=_ref.data,id=_ref.id;
var listeners=eventListeners.get(name);
if(listeners){
var handlers=listeners.get(id);
if(handler){
handler(data);
}else{
(0,_warning2.default)(false,'No existing handler for listener: '+id);
}
}else{
(0,_warning2.default)(false,'No existing listener for: '+name);
}
};

var onListenerRemoved=function onListenerRemoved(_ref2){var name=_ref2.name,id=_ref2.id;
var listeners=eventListeners.get(name);
if(listeners){
listeners.delete(id);
}
};

var onResponse=function onResponse(_ref3){var data=_ref3.data,id=_ref3.id,ok=_ref3.ok;
var req=requests.get(id);
if(req){
if(ok)req.resolve(data);else
req.reject(data);
}else{
(0,_warning2.default)(false,'No existing request for response: '+id);
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
case'listener.event':
onListenerEvent(msg);
break;
case'listener.removed':
onListenerRemoved(msg);
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

var addListener=exports.addListener=function addListener(name,handler){
var id=(0,_v2.default)();
var handlers=eventListeners.get(name);
if(!handlers){
handlers=Map();
}
handlers.set(id,handler);
eventListeners.set(name,handlers);
postMessage({name:name,id:id,type:'listener.add'});
};

var removeListener=exports.removeListener=function removeListener(name,handler){
var handlers=eventListeners.get(name);
if(handlers){
var id=void 0;
for(var _iterator=handlers,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref6;if(_isArray){if(_i>=_iterator.length)break;_ref6=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref6=_i.value;}var _ref4=_ref6;var _ref5=_slicedToArray(_ref4,2);var handlerId=_ref5[0];var handlerFunc=_ref5[1];
if(handlerFunc===handler){
id=handlerId;
handlers.delete(id);
break;
}
}
if(id){
postMessage({name:name,id:id,type:'listener.remove'});
eventListeners.set(name,handlers);
}else{
(0,_warning2.default)(false,'No id found for listener handler',handler);
}
}else{
(0,_warning2.default)(false,'No existing listener for: '+name);
}
};

var postMessage=exports.postMessage=function postMessage(){var payload=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
window.postMessage(JSON.stringify(payload));
};

var postEvent=exports.postEvent=function postEvent(_ref7){var name=_ref7.name,data=_ref7.data;
postMessage({name:name,data:data,type:'event'});
};

var postRequest=exports.postRequest=function postRequest(_ref8){var name=_ref8.name,data=_ref8.data;
var id=(0,_v2.default)();
var promise=new Promise(function(resolve,reject){
requests.set(id,{resolve:resolve,reject:reject});
});
postMessage({name:name,data:data,id:id,type:'request'});
return promise;
};

var postResponse=exports.postResponse=function postResponse(_ref9){var name=_ref9.name,data=_ref9.data,id=_ref9.id;
postMessage({name:name,data:data,id:id,type:'response'});
};

var setup=exports.setup=function setup(){var handlers=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
if(handlers.onEvent){
onEvent=handlers.onEvent;
}
if(handlers.onRequest){
onRequest=handlers.onRequest;
}
if(handlers.onMessage){
onMessage=handlers.onMessage;
}
document.addEventListener('message',onMessage);
};