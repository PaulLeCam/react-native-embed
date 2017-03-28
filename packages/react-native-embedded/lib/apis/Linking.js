Object.defineProperty(exports,"__esModule",{value:true});exports.openURL=exports.getInitialURL=exports.canOpenURL=undefined;

var _bridge=require('../bridge');

var canOpenURL=exports.canOpenURL=function canOpenURL(url){
return(0,_bridge.postRequest)({
name:'Linking.canOpenURL',
data:{url:url}});

};

var getInitialURL=exports.getInitialURL=function getInitialURL(){
return(0,_bridge.postRequest)({
name:'Linking.getInitialURL'});

};

var openURL=exports.openURL=function openURL(url){
return(0,_bridge.postRequest)({
name:'Linking.openURL',
data:{url:url}});

};