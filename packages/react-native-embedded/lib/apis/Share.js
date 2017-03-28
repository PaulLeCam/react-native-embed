Object.defineProperty(exports,"__esModule",{value:true});exports.share=exports.dismissedAction=exports.sharedAction=undefined;

var _bridge=require('../bridge');

var sharedAction=exports.sharedAction='sharedAction';

var dismissedAction=exports.dismissedAction='dismissedAction';






var share=exports.share=function share(content,options){
return(0,_bridge.postRequest)({
name:'Share.share',
data:{content:content,options:options}});

};