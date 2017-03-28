Object.defineProperty(exports,"__esModule",{value:true});exports.setString=exports.getString=undefined;

var _bridge=require('../bridge');

var getString=exports.getString=function getString(){
return(0,_bridge.postRequest)({
name:'Clipboard.getString'});

};

var setString=exports.setString=function setString(content){
(0,_bridge.postEvent)({
name:'Clipboard.setString',
data:{content:content}});

};