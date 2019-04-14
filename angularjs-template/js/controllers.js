angular.module('contentControllers', [])

.controller('home', function($rootScope) {
    $rootScope.title = '';
})
.controller('generic', function($scope, $rootScope) {
    $rootScope.title = $scope.genericContent.title;
})
.controller('gallery', function($scope, $rootScope) {
    $scope.$parent.isClose = false;
    $rootScope.title = $scope.galleryContent.title;
})
.controller('slides', function($scope) {
    $scope.$parent.isClose = true;
})
.controller('tasks', function($scope, $rootScope) {
    $rootScope.title = $scope.taskContent.title;

    $scope.mindate = new Date();
    $scope.addsuccess = false;

	$scope.addTask = function(isValid) {

        $scope.submitted = true;

        if (isValid) {
            const dt = new Date($scope.task.date);
            const date = dt.getUTCDate();
            const month = dt.getUTCMonth() + 1;
            const year = dt.getUTCFullYear();
            const taskcontainer = angular.element(document.querySelector('#taskOutput tbody tr'));
		    taskcontainer.after(`<tr><td>${$scope.task.name} <small class="task-new">new</small></td><td>${month}-${date}-${year}</td><td>${$scope.task.assign}</td></tr>`);
            $scope.addsuccess = true;
            $scope.task = {};
            $scope.submitted = false;
            $scope.taskAdder.$setUntouched();
            $scope.taskAdder.$setPristine();
            if ($scope.addsuccess === true) {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.addsuccess = false;
                    });
                }, 3000);
            }
        }
	};
})
.controller('contact', function($scope, $http, $state, $rootScope) {
    $scope.$parent.isHome = false;
    $rootScope.title = $scope.contactContent.title;

    $scope.user = {};

    $scope.submitForm = function(isValid) {

        $scope.submitted = true;

        if (isValid) {
            $http({
              method  : 'POST',
              url     : 'contactForm.php',
              data    : $scope.contact,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
             })
              .success(function(data) {
                  $scope.message = data.message;
                  $state.go('contact.success');
              });
        };
    }
});
