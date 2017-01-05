app.controller('boCtrl', [
    '$scope',
    'AuthService',
    '$http',
    'serviceApi',
    '$state',
    '$timeout',
    function($scope, AuthService, $http, serviceApi, $state, $timeout) {

        $scope.show = 0;
        $scope.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        // GET USERS
        $scope.getAllUser = () => {
            AuthService.getAllUser($scope.user).then(function(response) {
                $scope.allUser = response.data.user;
                console.log($scope.allUser);
            }).catch(function(errMsg) {
                const alertPopup = $window.alert('show profils members failed!');
            });
        };
        $scope.getAllUser();

        //ADD USERS
        $scope.addUser = () => {
            AuthService.register($scope.user).then(function(response) {
                $scope.getAllUser();
                $scope.show = 2;
            }).catch(function(errMsg) {
                const alertPopup = $window.alert('Register failed!');
            });
        };

        // DELETE USER
        $scope.removeUser = (id) => {
            const response = confirm("Voulez vous vraiment supprimer cet utilisateur?");
            if (response === true) {
                AuthService.removeFromAdmin(id).then(function(response) {
                    $scope.getAllUser();
                    $state.go('admin.profils');
                    const alertPopup = $window.alert('Remove success!');
                }).catch(function(errMsg) {
                    const alertPopup = $window.alert('Remove failed!');
                });
            }
        };

        // CREATE STUDENT
        $scope.createSimplonien = () => {
            const dataStudent = {
                nom: $scope.boCreateLastName,
                prenom: $scope.boCreateName,
                age: $scope.boCreateOld,
                ville: $scope.boCreatePromo,
                photo: $scope.boCreatePhoto,
                tags: $scope.boCreateTags,
                description: $scope.boCreateAbout,
                Sexe: $scope.boCreateSexe,
                SpecialiteUn: $scope.boCreateSpeOne,
                SpecialiteDeux: $scope.boCreateSpeTwo,
                SpecialiteTrois: $scope.boCreateSpeThree,
                Github: $scope.boCreateGithub,
                Linkedin: $scope.boCreateLinkedin,
                Portfolio: $scope.boCreatePortfolio,
                CV: $scope.boCreateCV,
                Twitter: $scope.boCreateTwitter,
                StackOverFlow: $scope.boCreateStackOverFlow,
                Mail: $scope.boCreateMail,
                Contrat: $scope.boCreateContrat,
                DatePromo: $scope.boCreateDatePromo,
                Domaine: $scope.boCreateDomaine
            };

            $http.post('/api/backOffice/addStudent', dataStudent).then((response) => {
                alert('Simplonien créé!');
                $scope.refreshInfoStudents();
                $state.reload();
                $scope.show = 3;
            }, (err) => {
                console.log("Error");
            });
        }

        // GET STUDENT INFOS
        $scope.refreshInfoStudents = () => {
            $http.get('/api/infoStudent').then(function(response) {
                $scope.simploniens = response.data;
            }, function(err) {
                console.log("Error");
            });
        }

        $scope.refreshInfoStudents();

        // DELETE STUDENT
        $scope.deleteStudent = (id) => {
            const response = confirm("Voulez vous vraiment supprimer cet apprenant?");
            if (response === true) {
                $http.delete('/api/backOffice/removeStudent/' + id).then(function(response) {
                    $scope.refreshInfoStudents();
                });
            }
        };

        // UPDATE STUDENT INFOS
        $scope.updateStudent = (id) => {
            const response = confirm("Voulez vous vraiment modifier les infos de cet apprenant?");
            if (response === true) {
                const newInfos = {
                    nom: document.getElementById("boCreateLastNameSimploniens").value,
                    prenom: document.getElementById("boCreateNameSimploniens").value,
                    age: document.getElementById("boCreateOldSimploniens").value,
                    ville: document.getElementById("boCreatePromoSimploniens").value,
                    photo: document.getElementById("boCreatePhotoSimploniens").value,
                    tags: document.getElementById("boCreateTagsSimploniens").value,
                    description: document.getElementById("boCreateAboutSimploniens").value,
                    Sexe: document.getElementById("boCreateSexeSimploniens").value,
                    SpecialiteUn: document.getElementById("boCreateSpeOneSimploniens").value,
                    SpecialiteDeux: document.getElementById("boCreateSpeTwoSimploniens").value,
                    SpecialiteTrois: document.getElementById("boCreateSpeThreeSimploniens").value,
                    Github: document.getElementById("boCreateGithubSimploniens").value,
                    Linkedin: document.getElementById("boCreateLinkedinSimploniens").value,
                    Portfolio: document.getElementById("boCreatePortfolioSimploniens").value,
                    CV: document.getElementById("boCreateCVSimploniens").value,
                    Twitter: document.getElementById("boCreateTwitterSimploniens").value,
                    StackOverFlow: document.getElementById("boCreateStackOverFlowSimploniens").value,
                    Mail: document.getElementById("boCreateMailSimploniens").value,
                    Contrat: document.getElementById("boCreateContratSimploniens").value,
                    DatePromo: document.getElementById("boCreateDatePromoSimploniens").value,
                    Domaine: document.getElementById("boCreateDomaineSimploniens").value

                };

                $http.put('/api/backOffice/update/' + id, newInfos).then((response) => {})
                alert("Apprenant modifié!")
            };
            $state.reload();
            $scope.show = 4;
        };

        // SEND INFOS STUDENT MODIFICATION

        $scope.modify = (index) => {
            $scope.refreshInfoStudents();
            $scope.show = 5;
            $http.get('/api/backOffice/infoStudent/' + index).then((response) => {
                $scope.student = response.data;
            }, (err) => {
                console.log("Error");
            });

        }

        // JQUERY
        $(document).ready(() => {
            $(() => {
                const nav = $('.container-nav-bo');
                if (nav.length) {
                    const stickyNavTop = nav.offset().top + 4;
                    $(window).scroll(() => {
                        if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                            $('.container-nav-bo').addClass('sticktotop');
                            $('.container-interface').addClass('marginToFix2');
                        } else {
                            $('.container-nav-bo').removeClass('sticktotop');
                            $('.container-interface').removeClass('marginToFix2');
                        }
                    });
                }
            });
        });

    }
]);