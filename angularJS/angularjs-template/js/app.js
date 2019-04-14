
angular.module('app', ['contentControllers', 'ui.router', 'ngAnimate', 'ngMessages'])

.controller('content', function($scope, $http, $location, $timeout) {
    $http.get('data/content.json').success (function(data) {
        $scope.globalContent = data;
        $scope.homeContent = data.home;
        $scope.menuContent = data.mainmenu;
        $scope.genericContent = data.generic;
        $scope.galleryContent = data.gallery[0];
        $scope.taskContent = data.tasks;
        $scope.contactContent = data.contact;
        $scope.footerContent = data.footer;
    });

    $http.get('data/tasks.json').success (function(data) {
		$scope.taskData = data;
    })

    $scope.mainNav = {url:'partials/nav.html'};
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.openMenu = function() {
        $scope.menuOpen = !$scope.menuOpen;
    };
    $scope.closeMenu = function(index) {
        $scope.selected = {};
        if (window.innerWidth <= 767) {
            $scope.menuOpen = false;
        }
    };

    $scope.clickMenu = function() {
        if (window.innerWidth <= 767) {
            $scope.menuOpen = false;
        }
    };

    $scope.date = new Date();

})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            views: {
                "mainView": {
                    templateUrl: 'partials/home.html',
                    controller: 'home'
                }
            }
        })
        .state('generic-page', {
            url: '/generic-page',
            views: {
                "mainView": {
                    templateUrl: 'partials/generic-page.html',
                    controller: 'generic'
                }
            }
        })
        .state('task-adder', {
            url: '/task-adder',
            views: {
                "mainView": {
                    templateUrl: 'partials/task-adder.html',
                    controller: 'tasks'
                }
            }
        })
        .state('gallery', {
            url: '/gallery',
            views: {
                "mainView": {
                    templateUrl: 'partials/gallery.html',
                    controller: 'gallery'
                },
                "slidesView@gallery": {
                    templateUrl: 'partials/gallery-thumbs.html',
                    controller: 'gallery'
                }
            }
        })
        .state('gallery.slide1', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide1.html',
                    controller: 'slides'
                }
            }
        })
        .state('gallery.slide2', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide2.html',
                    controller: 'slides'
                }
            }
        })
        .state('gallery.slide3', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide3.html',
                    controller: 'slides'
                }
            }
        })
        .state('gallery.slide4', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide4.html',
                    controller: 'slides'
                }
            }
        })
        .state('gallery.slide5', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide5.html',
                    controller: 'slides'
                }
            }
        })
        .state('gallery.slide6', {
            views: {
                "slidesView": {
                    templateUrl: 'partials/slide6.html',
                    controller: 'slides'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                "mainView": {
                    templateUrl: 'partials/contact.html',
                    controller: 'contact'
                },
                "contactForm@contact": {
                    templateUrl: 'partials/contact-form.html',
                    controller: 'contact'
                }
            }
        })
        .state('contact.success', {
            views: {
                "contactForm": {
                    templateUrl: 'partials/contact-success.html',
                    controller: 'contact'
                }
            }
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})
// if Application/Website uses Google Analytics
.run(function($rootScope, $location, $window) {
    $window.ga('create', 'UA-********-1', 'auto');

    $rootScope.$on('$stateChangeSuccess', function (event) {
        $window.ga('send', 'pageview', $location.path());
    });
});
