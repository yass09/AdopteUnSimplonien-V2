app.controller('adminCtrl', ['$scope','$rootScope','AuthService', '$state','$window',
 function($scope, $rootScope, AuthService, $state, $window) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  $scope.showEditProfilUserAdmin = false;

  $scope.logout = () => {
    $rootScope.showLogout = false;
    AuthService.clearLocalStorage();
    AuthService.logout();
    $state.go('home');
    $scope.isHome = true;
  };


  $scope.signup = () => {
    AuthService.register($scope.user).then(function(response) {
      $state.go('admin.profils');
      const alertPopup = $window.alert('Enregistré!!');
    }).catch(function(errMsg) {
      const alertPopup = $window.alert('Fail!!');
    });
  };


 }]);