angular.module('todoApp', [])
    .run(function($q) {
        var deferedObject = $q.defer();

        deferedObject.reject('some problem');
        deferedObject.resolve('result');

        var promise = deferedObject.promise;

        var promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('the result');
                //reject('error');
            }, 1000);
        });



        var promise3 = promise2.then(function(val) {
            console.log(val);
            throw 'my error';
        });

        promise3.then(function(val) {
            console.log('2nd', val);
        }, function(err) {
            console.log(err);
        });
    });
