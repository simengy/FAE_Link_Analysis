define([],function(){return function(b){var a={resolver:["$q","$rootScope",function(e,c){var d=e.defer();
require(b,function(){c.$apply(function(){d.resolve()
})
});
return d.promise
}]};
return a
}
});