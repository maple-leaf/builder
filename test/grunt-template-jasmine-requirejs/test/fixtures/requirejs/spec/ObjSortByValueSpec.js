
describe('ObjSortByValue', function(){
    var _ = require('underscore');
    function randomObj(size){
        var o = {};
        for(var i = 1; i<size; i++){
            o['id'+i] = parseInt(Math.random()*10000);
        }
        return o;
    }
    var objToBeTest = randomObj(10000);
    describe('using underscore', function(){
        it('one thousand item test ',function(){
            var starttime = new Date().getTime();
            var toArr = _.map(objToBeTest, function(v,k){
                return [k,v];
            });
            var sortedArr = _.sortBy(toArr, function(v){
                return v[1];
            });
            var sortedObj = {};
            _.each(sortedArr, function(v){;
                sortedObj[v[0]] = v[1];
            });
            console.info('spend time: ' );console.info(new Date().getTime()-starttime);
            console.info(_.keys(sortedObj).length);
        });
    });

    describe('using key-value switch', function(){
        function exchangeKeyValue(obj, override) {
            var rObj = {};
            if(override === undefined)
                override = true;
            for(var key in obj){
                var val = obj[key];
                //var typeofVal = $.type(val);
                //if(typeofVal !== "number" && typeofVal !== "string")
                    //return false;
                val = val.toString().trim();
                if(override){
                    rObj[val] = key;
                }else{
                    if(rObj.hasOwnProperty(val)){
                        rObj[val + " "] = key;
                    }else{
                        rObj[val] = key;
                    }
                }
            }
            return rObj;
        }
        function objSortByKey(obj) {
            var keys = [];
            var sortedObj = {};
            for(var key in obj){
                keys.push(key);
            }
            keys.sort().forEach(function(key){
                sortedObj[key] = obj[key];
            })
            return sortedObj;
        }
        it('one thousand item test ',function(){
            var starttime = new Date().getTime();
            var robj = exchangeKeyValue(objToBeTest, false);
            var sortedObj = objSortByKey(robj);
            var sortedObj2 = exchangeKeyValue(sortedObj,false);
            console.info('spend time: ' );console.info(new Date().getTime()-starttime);
            console.info(_.keys(sortedObj2).length);
        });
    });

});
