Object.defineProperty(exports,"__esModule",{value:true});exports.isConnectionExpensive=exports.isConnected=exports.removeEventListener=exports.addEventListener=exports.fetch=undefined;

var _bridge=require('../bridge');

var fetch=exports.fetch=function fetch(){
return(0,_bridge.postRequest)({
name:'NetInfo.fetch'});

};

var addEventListener=exports.addEventListener=function addEventListener(type,handler){
if(type==='change'&&typeof handler==='function'){
(0,_bridge.addListener)('NetInfo.change',handler);
}
};

var removeEventListener=exports.removeEventListener=function removeEventListener(type,handler){
if(type==='change'&&typeof handler==='function'){
(0,_bridge.removeListener)('NetInfo.change',handler);
}
};

var isConnected=exports.isConnected={
fetch:function fetch(){
return(0,_bridge.postRequest)({
name:'NetInfo.isConnected.fetch'});

},
addEventListener:function addEventListener(type,handler){
if(type==='change'&&typeof handler==='function'){
(0,_bridge.addListener)('NetInfo.isConnected.change',handler);
}
},
removeEventListener:function removeEventListener(type,handler){
if(type==='change'&&typeof handler==='function'){
(0,_bridge.removeListener)('NetInfo.isConnected.change',handler);
}
}};


var isConnectionExpensive=exports.isConnectionExpensive={
fetch:function fetch(){
return(0,_bridge.postRequest)({
name:'NetInfo.isConnectionExpensive.fetch'});

}};