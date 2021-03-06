app.controller('registerCtrl', ['$scope', 'AuthService', 'serviceFilter','$state', '$window', '$timeout', '$location', function($scope, AuthService, serviceFilter,$state, $window, $timeout,$location, $stateProvider,$urlRouterProvider) {

  $scope.borderClass = true;
  $scope.passwordCheckedSimplonien='';
  $scope.passwordCheckedRecruteur='';
  $scope.validForm=true;
  $scope.emailR=true;
  $scope.emailS=true;

  $scope.user= {
    role: 'Recruteur'
  };
  $scope.userRecruteur = {
    technology:'',
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Recruteur'
  };
  $scope.userSimplonien = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Simplonien'
  };

  $scope.registerRecruteur = () => {
    if ($scope.userRecruteur.company != ''&& $scope.userRecruteur.firstName != '' && $scope.userRecruteur.lastName!= '' && $scope.userRecruteur.email!='' && $scope.userRecruteur.technology!=null && $scope.userRecruteur.password!='' && $scope.passwordCheckedRecruteur!='' ) {
      if ($scope.userRecruteur.password.trim().length >= 8) {
        if ($scope.userRecruteur.password === $scope.passwordCheckedRecruteur) {
          AuthService.register($scope.userRecruteur).then(function(response) {
            if (response.data.msg === "Email already used") {
              $scope.emailR=false;
            }else {
              $scope.emailR=true;
              $scope.validForm=false;
              $timeout(function () {
                $scope.validForm = true;
              }, 6000);
            }
          }).catch(function(errMsg) {
            const alertPopup = $window.alert('Fail!!');
          });
        }
      }
    }
  };

  $scope.registerSimplonien = () => {
    $scope.validForm=true;
    if ($scope.userSimplonien.firstName != '' && $scope.userSimplonien.lastName!= '' && $scope.userSimplonien.email!='' && $scope.userSimplonien.password!='' && $scope.passwordCheckedSimplonien!='' ) {
      if ($scope.userSimplonien.password.trim().length >= 8) {
        if ($scope.user.password === $scope.passwordChecked) {
          AuthService.register($scope.userSimplonien).then(function(response) {
            if (response.data.msg === "Email already used") {
              $scope.emailS=false;
            }else {
              $scope.emailS=true;
              $scope.validForm=false;
              $timeout(function () {
                $scope.validForm = true;
              }, 6000);
            }
          }).catch(function(errMsg) {
          });
        }
      }
    }
  };

  $scope.SetStyle = function(role) {
    $scope.validForm=true;
    $scope.user.role = role;
    if ($scope.user.role == "Recruteur") {
      $scope.changeStatus = 'Recruteur';
      $scope.borderClass = true;
    } else if ($scope.user.role == "Simplonien") {
      $scope.changeStatus = 'Simplonien';
      $scope.borderClass = false;
    }
  }

  $scope.getAllSkill = () => {
    serviceFilter.getAllSkill().then(function(response) {
      $scope.skills = response.data;
    }).catch(function(errMsg) {
    });
  }
  $scope.getAllSkill();

}
]);
