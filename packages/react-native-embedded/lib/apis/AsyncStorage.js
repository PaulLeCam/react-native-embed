Object.defineProperty(exports,"__esModule",{value:true});exports.multiMerge=exports.multiRemove=exports.multiSet=exports.multiGet=exports.flushGetRequests=exports.getAllKeys=exports.clear=exports.mergeItem=exports.removeItem=exports.getItem=exports.setItem=undefined;

var _bridge=require('../bridge');

var setItem=exports.setItem=function setItem(key,value){
return(0,_bridge.postRequest)({
name:'AsyncStorage.setItem',
data:{key:key,value:value}});

};

var getItem=exports.getItem=function getItem(key){
return(0,_bridge.postRequest)({
name:'AsyncStorage.getItem',
data:{key:key}});

};

var removeItem=exports.removeItem=function removeItem(key){
return(0,_bridge.postRequest)({
name:'AsyncStorage.removeItem',
data:{key:key}});

};

var mergeItem=exports.mergeItem=function mergeItem(key,value){
return(0,_bridge.postRequest)({
name:'AsyncStorage.mergeItem',
data:{key:key,value:value}});

};

var clear=exports.clear=function clear(){
return(0,_bridge.postRequest)({
name:'AsyncStorage.clear'});

};

var getAllKeys=exports.getAllKeys=function getAllKeys(){
return(0,_bridge.postRequest)({
name:'AsyncStorage.getAllKeys'});

};

var flushGetRequests=exports.flushGetRequests=function flushGetRequests(){
return(0,_bridge.postRequest)({
name:'AsyncStorage.flushGetRequests'});

};

var multiGet=exports.multiGet=function multiGet(keys){
return(0,_bridge.postRequest)({
name:'AsyncStorage.multiGet',
data:{keys:keys}});

};

var multiSet=exports.multiSet=function multiSet(keyValuePairs){
return(0,_bridge.postRequest)({
name:'AsyncStorage.multiSet',
data:{keyValuePairs:keyValuePairs}});

};

var multiRemove=exports.multiRemove=function multiRemove(keys){
return(0,_bridge.postRequest)({
name:'AsyncStorage.multiRemove',
data:{keys:keys}});

};

var multiMerge=exports.multiMerge=function multiMerge(keyValuePairs){
return(0,_bridge.postRequest)({
name:'AsyncStorage.multiSet',
data:{keyValuePairs:keyValuePairs}});

};