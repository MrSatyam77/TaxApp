"use strict";var calculation=calculation||{};calculation.calcCtrl=function(e){var n=e,i=e.calculation,t=e._,a={scripts:{},fieldMaps:{},loadedMaps:{}},r={},d={},s={},l=function(){},o=function(e){if(t.isUndefined(a.loadedMaps[e.url])||a.loadedMaps[e.url]===!1)try{var r=e.url+"cmap.js";n.importScripts(r),a.loadedMaps[e.url]=!0}catch(d){i.logger.log("Error downloading calculation map file from : "+e.url+d),a.loadedMaps[e.url]=!1}},c=function(e){if(t.isUndefined(d[e.url])||d[e.url]===!1)try{var a=e.url+"ctaxtables.js";n.importScripts(a),d[e.url]=!0}catch(r){i.logger.log("Error downloading calculation tax table file from : "+e.url+r),d[e.url]=!1}},u=function(e,n){s[e]=n,o(s[e]),c(s[e])},f=function(e){if(t.isUndefined(e.scripts)||t.isUndefined(e.fieldMaps))throw"invalid map format";a.scripts=t.assign(a.scripts,e.scripts);var n=t.keys(e.fieldMaps);if(!t.isUndefined(n)&&n.length>0)for(var i=0;i<n.length;i++)t.has(a.fieldMaps,n[i])&&!t.isUndefined(a.fieldMaps[n[i]].methodsMaps)?a.fieldMaps[n[i]].methodsMaps=a.fieldMaps[n[i]].methodsMaps.concat(e.fieldMaps[n[i]].methodsMaps):(a.fieldMaps[n[i]]={},a.fieldMaps[n[i]].methodsMaps=[],a.fieldMaps[n[i]].methodsMaps=a.fieldMaps[n[i]].methodsMaps.concat(e.fieldMaps[n[i]].methodsMaps))},g=function(e){var n=[];return!t.isUndefined(a.fieldMaps[e])&&!t.isUndefined(a.fieldMaps[e].methodsMaps)&&a.fieldMaps[e].methodsMaps.length>0&&(n=a.fieldMaps[e].methodsMaps),n},_=function(e){var n={};if(!t.isUndefined(e)){var i="c"+e.slice(1)+".js",d=t.find(t.pairs(a.scripts),function(e){return e[1].path.indexOf(i)>0});t.isUndefined(d)||(h(d[0]),r[d[0]].success&&(n=t.pluck(d[1].methods,"name")))}return n},p=function(e){var n;return h(e.sid),r[e.sid].success&&(n=a.scripts[e.sid].methods[e.mid].name),n},m=function(e){var n="",i=a.scripts[e.sid].path.split("/")[1].replace(".js","");return n="d"+i.slice(1)},h=function(e){if((t.isUndefined(r[e])||r[e].success===!1&&r[e]["try"]<3)&&(r[e]=r[e]||{},!t.isUndefined(a.scripts[e])))try{var d=a.scripts[e].path,l=d.split("/"),o=s[l[0]].url+l[1];n.importScripts(o),r[e].success=!0}catch(c){i.logger.log("Error downloading calculation file: "+o+c),r[e].success=!1,r[e]["try"]=++r[e]["try"]||1}};return{init:l,addMap:f,addCalcUrl:u,getMethodMaps:g,getMethodName:p,getMethodNamesByDoc:_,getDocNameFromScript:m}}(this);var calculation=calculation||{};calculation.calcReview=function(e){var n=e,i=e.calculation,t=e._,a={},r={},d={},s={},l=[],o=function(){},c=function(e){if(t.isUndefined(r[e.url])||r[e.url]===!1)try{var a=e.url+"rule.js";n.importScripts(a),r[e.url]=!0}catch(d){i.logger.log("Error downloading review rule file from : "+e.url+d),r[e.url]=!1}},u=function(e){if(t.isUndefined(d[e.url])||d[e.url]===!1)try{var a=e.url+"methods.js";n.importScripts(a),d[e.url]=!0}catch(r){i.logger.log("Error downloading review method file from : "+e.url+r),d[e.url]=!1}},f=function(e){!t.isUndefined(e)&&t.isObject(e)&&(a=t.assign(a,e))},g=function(e,n){s[e]=n,c(s[e]),u(s[e])},_=function(){if(l=[],!t.isUndefined(a)&&!t.isEmpty(a)){var e=t.keys(a);t.forEach(e,function(e){if(!t.isUndefined(a[e])){var n=a[e];if(!(t.isUndefined(n.path)||t.isUndefined(n.method)||t.isUndefined(s[n.path])||t.isUndefined(d[s[n.path].url])||d[s[n.path].url]!==!0)){var r=n.path.split(".")[1],o="p"+n.path.split(".")[0];if(!(t.isUndefined(i.review)||t.isUndefined(i.review[o])||t.isUndefined(i.review[o][r])||t.isUndefined(i.review[o][r][n.method])))try{var c=i.review[o][r][n.method]();if(!t.isUndefined(c))for(var u=0;u<c.length;u++){var f={fieldName:n.fieldName,docName:n.docName,docIndex:c[u],category:n.category,message:n.message,key:e,severity:n.severity,suggestion:n.suggestion};l.push(f)}}catch(g){i.logger.log("error while executing Review method: "+n.method+g)}}}})}n.postMessage({msgType:"reviewCompleted",reviewErrors:l})};return{init:o,addUrl:g,addRule:f,start:_}}(this);var calculation=calculation||{};calculation.calcSvc=function(context){var _taxReturn,_context=context,_calculation=context.calculation,_=context._,_init=function(e){_taxReturn=e},_getDocFieldName=function(e){var n=e;n=n.replace(/\[(\w+)\]/g,".$1"),n=n.replace(/^\./,"");var i=n.split(".");if(_.isUndefined(i.length)||0===i.length||i.length>2)throw"Provided field name is in wrong format expected format is Pw2.wages:"+e;return{docName:i.shift(),fieldName:i.shift()}},_addForm=function(e,n,i){_calculation.changedFieldsList.addForm(e,n,i)},_addChildDoc=function(e,n){var i=++_taxReturn.count;return _addDoc(e,i,n),_context.postMessage({msgType:"addChildDoc",docName:e,parentIndex:n,index:i}),i},_addDoc=function(e,n,i){_.isUndefined(_taxReturn[e])&&(_taxReturn[e]={}),_taxReturn[e][n]={},_.isUndefined(i)||(_taxReturn[e][n].parent=i),_taxReturn.count=n},_updateParent=function(e,n,i){_taxReturn[e][n].parent=i},_removeDoc=function(e,n,i){if(!_.isUndefined(_taxReturn[e])&&!_.isUndefined(_taxReturn[e][n])){var t=_.keys(_taxReturn[e][n]);if(t&&t.length>0)for(var a=0;a<t.length;a++)_calculation.changedFieldsList.add(new _calculation.changedField(e+"."+t[a],e,n));(_.isUndefined(i)||i===!1)&&_context.postMessage({msgType:"removeDoc",docName:e,index:n}),delete _taxReturn[e][n],_.isEmpty(_taxReturn[e])&&delete _taxReturn[e]}},_reCalculate=function(){if(!_.isUndefined(_taxReturn)){var e=_.keys(_taxReturn);if(!_.isUndefined(e)&&e.length>0)for(var n=0;n<e.length;n++){var i=_.keys(_taxReturn[e[n]]);if(!_.isUndefined(i)&&i.length>0)for(var t=0;t<i.length;t++){var a=_.keys(_taxReturn[e[n]][i[t]]);if(!_.isUndefined(a)&&a.length>0)for(var r=0;r<a.length;r++){var d=_taxReturn[e[n]][i[t]][a[r]];_.isUndefined(d)||!_.isUndefined(d.isCalculated)&&d.isCalculated!==!1||_calculation.changedFieldsList.add(new _calculation.changedField(e[n]+"."+a[r],e[n],i[t]))}}}}},_getDoc=function(e,n){var i;return _.isUndefined(n)&&(n=_getDocIndex(e)),_.has(_taxReturn,e)&&-1!==n&&!_.isUndefined(_taxReturn[e][n])&&(i=_taxReturn[e][n]),_.isUndefined(i)&&_calculation.logger.log("something is wrong did not find doc:"+e),i},_getDocs=function(e){var n;return _.has(_taxReturn,e)&&!_.isUndefined(_taxReturn[e])&&(n=_taxReturn[e]),_.isUndefined(n)&&_calculation.logger.log("something is wrong did not find doc:"+e),n},_getDocIndex=function(e){var n;return _.has(_taxReturn,e)&&(n=_calculation.currentDocTracker.getCurrentDoc(e),-1===n&&(n=_getDocIndexes(e)[0])),n},_getDocIndexes=function(e,n){var i=[];if(_.has(_taxReturn,e)){var t=_taxReturn[e];if(_.isUndefined(n))i=_.keys(t);else{var a=_.keys(t);if(a&&a.length>0)for(var r=0;r<a.length;r++){var d=a[r];_applyFilters(t[d],n)&&i.push(d)}}_.isUndefined(i)&&_calculation.logger.log("something is wrong did not find doc:"+e)}return i},_getChildDocIndexesFromParentName=function(e,n,i){var t=_getDocIndexes(n);return _getChildDocIndexesFromParentIndex(e,t,i)},_getChildDocIndexesFromParentIndex=function(e,n,i){var t=[];if(!_.isUndefined(n)){var a=_getDocs(e);if(!_.isUndefined(a)){var r=_.keys(a);if(r&&r.length>0)for(var d=0;d<r.length;d++){var s=r[d];_.isArray(n)?_.indexOf(n,a[s].parent.toString())>=0&&_applyFilters(a[s],i)&&t.push(s):a[s].parent==n&&_applyFilters(a[s],i)&&t.push(s)}}}return t},_applyFilters=function(doc,filters){if(_.isUndefined(filters))return!0;for(var result=!1,nextLogicalOperator,filterExpression='(""+doc["{{fieldname}}"].value).toLowerCase() {{operator}} "{{fieldValue}}".toLowerCase()',fIndex=0;fIndex<filters.length;fIndex++){var filter=filters[fIndex],names=_getDocFieldName(filter.fieldName),transResult=!1;if(_.isUndefined(names)||_.isUndefined(doc[names.fieldName])||_.isUndefined(doc[names.fieldName].value))transResult="!="===filter.operator&&""!==filter.fieldValue?!0:!1;else{var filterString=filterExpression.replace("{{fieldname}}",names.fieldName).replace("{{operator}}",filter.operator).replace("{{fieldValue}}",filter.fieldValue);transResult=eval(filterString)}result=_.isUndefined(nextLogicalOperator)||_.isEqual(nextLogicalOperator,"")?transResult:eval("result "+nextLogicalOperator+" transResult"),nextLogicalOperator=filter.logicalOperator}return result},_sum=function(e,n,i,t){var a,r=_getDocFieldName(e);a=_.isUndefined(i)?_getDocIndexes(r.docName,t):_getChildDocIndexesFromParentIndex(r.docName,i,t);var d=0;if(!_.isUndefined(a))for(var s=0;s<a.length;s++)d+=_getValue(e,n,a[s]);return d},_count=function(e,n,i){var t,a=_getDocFieldName(e);t=_.isUndefined(n)?_getDocIndexes(a.docName,i):_getChildDocIndexesFromParentIndex(a.docName,n,i);var r=0;return _.isUndefined(t)||(r=t.length),r},_divide=function(e,n,i){return _.isUndefined(i)||_.isNumber(i)?parseFloat(e/n):parseFloat((e/n).toFixed(i))},_decimal=function(e,n){return!_.isUndefined(n)&&_.isNumber(n)&&_.isNumber(e)?parseFloat(e.toFixed(n)):e},_isManual=function(e,n){var i=_getField(e,n);return _.isUndefined(i)||_.isEmpty(i)||_.isUndefined(i.isCalculated)?!0:!i.isCalculated},_isDocIncluded=function(e,n){return _.isUndefined(n)?_.has(_taxReturn,e):_.has(_taxReturn,e)&&-1!==n&&!_.isUndefined(_taxReturn[e][n])?!0:!1},_convert=function(e,n){if(_.isString(n)&&_.isEqual(n,""))return e.toString();if(_.isString(n)&&_.isEqual(n,"0")){if(_.isEqual(e,""))return 0;var i=parseInt(e);return isNaN(i)?0:i}if(_.isString(n)&&_.isEqual(n,"0.00")){if(_.isEqual(e,""))return 0;var i=parseFloat(e);return isNaN(i)?0:i}return _.isBoolean(n)?"X"===e?!0:_.isBoolean(e)?e:"true"===e.toString().toLowerCase():e},_getField=function(e,n){var i,t=_getDocFieldName(e),a=_getDoc(t.docName,n);return _.isUndefined(a)||(i=_.has(a,t.fieldName)&&!_.isUndefined(a[t.fieldName])?a[t.fieldName]:a[t.fieldName]={}),i},_setField=function(e,n,i,t,a){var r=_getDocFieldName(e),d=_getField(e,i),s=!1;_.isUndefined(d)||(_.isUndefined(n)||(_.isObject(n)?(d=_.assign(d,n),s=!0):(_.isUndefined(d.value)||d.value!=(1==_.isBoolean(n)?""+n:n))&&(_.isUndefined(d.isOverridden)||d.isOverridden!==!0?d.value=n:d.calValue=n,s=!0)),_.isUndefined(t)?(_.isUndefined(a)||a===!1)&&(_.isUndefined(d.isCalculated)||!_.isUndefined(d.isCalculated)&&1==d.isCalculated)&&(d.isCalculated=!0,s=!0):(d.isCalculated=t,s=!0),s&&(i=i||_getDocIndex(r.docName),_calculation.changedFieldsList.add(new _calculation.changedField(e,r.docName,i,d))))},_getValue=function(e,n,i){if(_.isUndefined(n))throw" defValue must be provided for type safety";var t=_getField(e,i);return _.isUndefined(t)||_.isEmpty(t)||_.isUndefined(t.value)?_convert(n,n):_convert(t.value,n)},_setValue=function(e,n,i,t,a){_setField(e,n,i,t,a)},_setEnabled=function(e,n,i){var t=_getField(e,i);if(!_.isUndefined(t)){var a=_.clone(t);a.isEnabled=n,_setField(e,a,i,void 0,!0)}},_setRequired=function(e,n,i){var t=_getField(e,i);if(!_.isUndefined(t)){var a=_.clone(t);a.isRequired=n,_setField(e,a,i,void 0,!0)}},_setType=function(e,n,i){var t=_getField(e,i);if(!_.isUndefined(t)){var a=_.clone(t);a.type=n,_setField(e,a,i,void 0,!0)}},_getFirstName=function(e){var n;return(n=e.trim().split(" ")).length>0?n[0]:""},_getMiddleName=function(e){var n;return(n=e.trim().split(" ")).length>1?n[1]:""},_getLastName=function(e){var n;return(n=e.trim().split(" ")).length>2?n[2]:""};return{init:_init,reCalculate:_reCalculate,getValue:_getValue,setValue:_setValue,setEnabled:_setEnabled,setRequired:_setRequired,setType:_setType,addDoc:_addDoc,updateParent:_updateParent,addChildDoc:_addChildDoc,removeDoc:_removeDoc,addForm:_addForm,getDocIndexes:_getDocIndexes,getChildDocIndexesFromParentName:_getChildDocIndexesFromParentName,getChildDocIndexesFromParentIndex:_getChildDocIndexesFromParentIndex,isManual:_isManual,isDocIncluded:_isDocIncluded,sum:_sum,count:_count,divide:_divide,decimal:_decimal,getFirstName:_getFirstName,getMiddleName:_getMiddleName,getLastName:_getLastName}}(this);var calculation=calculation||{};calculation.changedField=function(e,n,i,t){this.fieldName=e,this.docIndex=i,this.docName=n,this.isDone=!1,this.repeatCount=0,this.newVal=t},calculation.changedFieldsList=function(e){var n=[],i=[],t=10,a=e._,r=e.calculation,d=function(e){if(a.isUndefined(e)||!(e instanceof calculation.changedField))throw"only allowed type is ChangedField";var i=a.find(n,function(n){return n.fieldName===e.fieldName&&n.docName===e.docName&&n.docIndex===e.docIndex});a.isUndefined(i)?n.push(e):(i.isDone&&(i.repeatCount++,i.isDone=!1,i.repeatCount>=t&&(i.isDone=!0,r.logger.log("possible recursive loop for field: "+i.fieldName))),i.newVal=e.newVal)},s=function(e,n,t){if(a.isUndefined(t)||""==t||(t=parseInt(t)),!a.isUndefined(n)&&n===!0||-1===a.findIndex(i,{docName:e})){var r={docName:e,parentIndex:t};i.push(r)}},l=function(){return n},o=function(){return i},c=function(){return a.find(n,function(e){return!e.isDone})},u=function(){for(var e=n.length,t=0;e>t;t++)delete n[t],n[t]=void 0;n=null,n=[],i=[]};return{add:d,addForm:s,clear:u,getchangedField:c,getChangedFieldList:l,getAddFormList:o}}(this),calculation.currentDocTracker=function(e){var n={},i=e._,t=function(e){return i.has(n,e)?n[e]:-1},a=function(e,i){n[e]=i},r=function(e){i.has(n,e)&&delete n[e]},d=function(){n={}};return{getCurrentDoc:t,setCurrentDoc:a,removeCurrentDoc:r,clear:d}}(this),calculation.logger=function(e){var n=(e.calculation,!1),i=function(e){n=e},t=function(e){n&&console.log(e)};return{init:i,log:t}}(this),calculation.constant=function(e){var n={},i=function(e){return _.has(n,e)?n[e]:void 0},t=function(e){n=e};return{get:i,init:t}}(this),calculation.utils=function(e){var n,i=e._,t={},a=function(e){var n=e.split("/");return 3==n.length?new Date(e):0},r=function(e){var n=a(e);return 0==n?0:n.getFullYear()},d=function(e){var n=a(e);return 0==n?0:n.getMonth()+1},s=function(e){var n=a(e);return 0==n?0:n.getDate()},l=function(e,n){var i=moment(a(e)),t=moment(a(n));return 0==i||0==i?0:Math.ceil(t.diff(i,"months",!0))},o=function(e,n){if(i.isNumber(e)&&i.isNumber(n)&&!i.isUndefined(e)&&!i.isUndefined(n)&&e>=1&&12>=e&&/^\d{4}$/.test(n)){var t=new Date(n,e,1).getTime()-new Date(n,0,1).getTime();return Math.abs(t/864e5)}return 0},c=function(e,n,t){if(!(i.isUndefined(e)||i.isUndefined(n)||i.isUndefined(t)||i.isNull(e)||i.isNull(n)||i.isNull(t)||i.isNaN(new Date(n).getTime())||i.isNaN(new Date(t).getTime()))){var a=1e3,r=new Date(n).getTime()-new Date(t).getTime();switch(e=e.toUpperCase()){case"MONTH":a*=2592e3;break;case"DAY":a*=86400;break;case"HOUR":a*=3600;break;case"MINUTE":a*=60;break;default:a=1}return Math.round(Math.abs(r/a))}return 0},u=function(e,n){return c("DAY",e,n)},f=function(e,n){return i.isEmpty(e)||i.isEmpty(n)||i.isUndefined(e)||i.isUndefined(n)||i.isNull(e)||i.isNull(n)?0:new Date(i.min([new Date(e).getTime(),new Date(n).getTime()]))},g=function(e){return i.isUndefined(e)||i.isNull(e)||!i.isNumber(e)?0:Math.round(e)},_=function(e){return i.isUndefined(e)||i.isNull(e)||!i.isNumber(e)?0:parseInt(e)},p=function(e){if(!i.isUndefined(e)&&!i.isNull(e)&&i.isNumber(e)){var n=parseFloat(e);return n.toFixed(2)}return 0},m=function(e){return i.isUndefined(e)||i.isNull(e)||!i.isString(e)||i.isEmpty(e)?0:e.replace(/[-()]/g,"")},h=function(e){if(!(i.isUndefined(e)||i.isNull(e)||i.isEmpty(e)||i.isNaN(new Date(e).getTime()))){var n=new Date(e),t=n.getMonth()+1,a=n.getDate();return parseInt(a)<10&&(a="0"+a),parseInt(t)<10&&(t="0"+t),[n.getFullYear(),t,a].join("-")}return 0},v=function(e,n){return c("day",e,n)},D=function(e,n,t){if(i.isUndefined(t)||i.isUndefined(e)||""==e||i.isUndefined(n)||""==n||i.isNull(t)||i.isNull(e)||i.isNull(n))return 0;var a=new Date(e),r=new Date(n),d=r.getFullYear()-a.getFullYear(),s=r.getMonth()-a.getMonth();return(0>s||0===s&&r.getDate()<a.getDate())&&d--,d},U=function(e,n){if(!(i.isUndefined(e)||i.isUndefined(n)||i.isNull(e)||i.isNull(n)||i.isNaN(new Date(e).getTime())||i.isNaN(new Date(n).getTime()))){var t=new Date(new Date(e).getTime()-new Date(n).getTime());return Math.abs(t/31536e6)}return 0},N=function(e){return i.isUndefined(e)||i.isNull(e)||i.isEmpty(e)?!1:!0},x=function(e){return!0},F=function(e){return i.isUndefined(e)||i.isNull(e)||!/9[0-9]{2}-(7[0-9]|8[0-8]|9[0-2]|9[4-9])-[0-9]{4}/.test(e)?!1:!0},M=function(e){if(!i.isUndefined(e)&&!i.isNull(e)&&!i.isNaN(new Date(e).getTime())){var n=new Date(e);if(n.getMonth()+1==10&&1==n.getDate())return!0}return!1},y=function(e,n){if(!i.isUndefined(e)&&!i.isNull(e)&&!i.isNaN(new Date(e).getTime())){var t=new Date(e);t.setMonth(t.getMonth()+n);var a=t.getDate(),n=t.getMonth()+1;return 10>a&&(a="0"+a),10>n&&(n="0"+n),[n,a,t.getFullYear()].join("/")}return 0},w=function(e){return i.isUndefined(e)||i.isNull(e)?new Date:new Date(e)},I=function(e){return i.isUndefined(e)||i.isNull(e)||!/^\b(0[1-6]|1[0-6]|2[0-7]|3[0-9]|4[0-8]|5[0-9]|6[0-9]|7[0-7]|8[0-8]|9[0-9])-\d{7}$/.test(e)?!1:!0},C=function(e){return i.isUndefined(t.einDB)?void 0:t.einDB[e]},R=function(e){if(!i.isUndefined(t.prepDB)){var n=i.find(t.prepDB,function(n,i){return i.toLowerCase()==e.toLowerCase()?!0:void 0});if(!i.isUndefined(n)&&!i.isEmpty(n))return n}},B=function(e){if(!i.isUndefined(t.locationDB)){for(var n=i.cloneDeep(t.locationDB),a=e.split(".");a.length&&(n=n[a.shift()]););return n}return void 0},k=function(e,n,a){if(!i.isUndefined(t.bankDB)){var r=i.cloneDeep(t.bankDB),d=e.split(".");if(i.isArray(r[d[0]]))return i.find(r[d[0]],{RALQIKCODE:"Q"})[d[1]];for(;d.length&&(r=r[d.shift()]););return r}return void 0},T=function(e,n,a){if(!i.isUndefined(t.epsBankDB)){for(var r=i.cloneDeep(t.epsBankDB),d=e.split(".");d.length&&(r=r[d.shift()]););return r}return void 0},E=function(e,n,a){if(!i.isUndefined(t.refundAdvantageBankDB)){for(var r=i.cloneDeep(t.refundAdvantageBankDB),d=e.split(".");d.length&&(r=r[d.shift()]););return r}return void 0},b=function(e,n,a){if(!i.isUndefined(t.tpgBankDB)){for(var r=i.cloneDeep(t.tpgBankDB),d=e.split(".");d.length&&(r=r[d.shift()]););return r}return void 0},L=function(e,n,a){if(!i.isUndefined(t.redBirdBankDB)){for(var r=i.cloneDeep(t.redBirdBankDB),d=e.split(".");d.length&&(r=r[d.shift()]););return r}return void 0},V=function(e){for(var n=0,i=!0,t="",a=e.length-1;a>=0;a--){var r=parseInt(e.substring(a,a+1));i&&(r*=2,r>9&&(r=r%10+1)),n+=r,i=!i}return t=""+9*n,t=t.substring(t.length-1)},S=function(e){var n=[5,8,4,6,1,2,9,0,3,7],i="";if(11==e.length&&e.indexOf("-")>0&&(e=e.replace(/-/g,"")),e.length>0)for(var t=0;t<e.length;t++)i+=n[parseInt(e.substring(t,t+1))];return i},O=[],P=function(e){i.isUndefined(e.type)||(t[e.type]=e.db),"einDB"==e.type&&i.remove(O,function(n){return i.isUndefined(e.db[n])?!1:!0})},A=[],j=function(a){var r=i.contains(O,a.ein);if(1!=r&&!i.isUndefined(a)&&!i.isUndefined(a.ein)&&""!=a.ein){var d=!0;i.isUndefined(t.einDB)&&(t.einDB={});var s=t.einDB[a.ein];if(i.isUndefined(s))e.postMessage({msgType:"newEINEntered",ein:a}),O.push(a.ein);else{for(var l in a)if(i.isObject(a[l])){for(var o in a[l])if((void 0!=a[l][o]&&""!=a[l][o]||void 0!=s[l][o]&&""!=s[l][o])&&a[l][o]!=s[l][o]){d=!1;break}if(!d)break}else if(!i.isUndefined(l)&&""!=l){if(!(void 0!=a[l]&&""!=a[l]||void 0!=s[l]&&""!=s[l]))continue;if(a[l]!=s[l]){d=!1;break}}if(!d){i.isUndefined(n)||clearTimeout(n);var c=i.findIndex(A,{ein:a.ein});!i.isUndefined(c)&&c>-1?A[c]=a:A.push(a),A.length>0&&(n=setTimeout(function(){e.postMessage({msgType:"einUpdated",einList:A}),i.forEach(A,function(e){O.push(e.ein)}),A=[]},3e3))}}}},q=function(e){var n="";return i.isUndefined(e)||""===e||(e=e.trim(),n=e.split(" "),n=n[0]),n},Y=function(e){var n="";return i.isUndefined(e)||""===e||(e=e.trim(),n=e.split(" "),void 0!=n[1]&&""!=n[1]&&(n=n[1])),n};return{formattedDate:a,convertMonthsToDays:o,calculateDiff:c,minDate:f,roundNumber:g,getValueP:_,getValueD:p,replaceString:m,replaceDate:h,calculateDays:v,dayDiff:u,calculateAge:D,calculateAgeDiff:U,checkValue:N,isSSNValid:x,isITINValid:F,calculateDateDiff:D,chkMonthDay1001:M,dateValidation:y,getValueDT:w,checkEIN:I,getEINData:C,getPrepData:R,getLocation:B,getBank:k,ssnPositionEncodingForBank:S,setDB:P,updateEINDB:j,getFullYear:r,getMonth:d,getDate:s,monthDiff:l,getFirstName:q,getMiddleName:Y,getEpsBank:T,luhnCheckSum:V,getRefundAdvantageBank:E,getTpgBank:b,getRedBirdBank:L}}(this);var calculation=calculation||{};calculation.calculator=function(e){var n,i=e,t=e.calculation,a=e._,r=function(){n=!1},d=function(){try{for(i.postMessage({msgType:"started"}),n=!0;!a.isUndefined(t.changedFieldsList.getchangedField());){var e=t.changedFieldsList.getchangedField(),r=e.fieldName;t.logger.log(r);for(var d=t.calcCtrl.getMethodMaps(r),l=0;l<d.length;l++){var o=t.calcCtrl.getDocNameFromScript(d[l]);if(t.calcSvc.isDocIncluded(o)){var c=t.calcCtrl.getMethodName(d[l]);t.currentDocTracker.setCurrentDoc(e.docName,e.docIndex);var u="c"+o.slice(1);s(u,c)}}e.isDone=!0}}catch(f){t.logger.log("error in calculation "+f)}finally{var g=t.changedFieldsList.getChangedFieldList();g.length>0&&i.postMessage({msgType:"changedField",fields:g});var _=calculation.changedFieldsList.getAddFormList();_.length>0&&i.postMessage({msgType:"addForm",forms:_}),t.changedFieldsList.clear(),n=!1,i.postMessage({msgType:"done"})}},s=function(e,n){try{a.isUndefined(e)||a.isUndefined(t[e])||a.isUndefined(n)||a.isUndefined(t[e][n])||t[e][n]()}catch(i){t.logger.log("error while executing method: "+n+i)}},l=function(e,n){t.currentDocTracker.setCurrentDoc(e,n);for(var a=t.calcCtrl.getMethodNamesByDoc(e),r="c"+e.slice(1),l=0;l<a.length;l++)s(r,a[l]);d(),i.postMessage({msgType:"reloadIfCurentform",docIndex:n})};return{init:r,start:d,calculateDocFields:l}}(self);