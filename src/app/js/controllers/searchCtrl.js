app.controller('searchCtrl', ['$scope', '$http', 'serviceFilter', 'serviceStudent', function($scope, $http, serviceFilter, serviceStudent){
    $scope.schools = serviceFilter.schools;
    $scope.contrats = serviceFilter.contrats;
    $scope.langages = serviceFilter.langages;
    $scope.themes = serviceFilter.themes;
    $scope.searchResult = serviceFilter.searchResult;
    $scope.$emit('LOAD');
    $scope.$emit('UNLOAD');
    $scope.loading = true;
    const putActiveParameter = (item) => {
      return item.active = false;
    };


    //////////////////////HANDLE FILTER/////////////////////

    const filterLangage = (firstFilter, langages) => {
        const nameSpecialite = ['SpecialiteUn', 'SpecialiteDeux', 'SpecialiteTrois'];
        const nbLangage = langages.length;
        let langage3 = [];
        let langage2 = [];
        let langage1 = [];

        angular.forEach(firstFilter, (value) => {
            if (nbLangage > 0) {
                let maitrise = 0;
                angular.forEach(nameSpecialite, (val) => {
                    console.log(value.SpecialiteUn);
                    if (value[val] === langages[0] || value[val] === langages[1] || value[val] === langages[2]) {
                        ++maitrise;
                    }
                });

                switch (maitrise) {
                    case 3:
                        langage3.push(value);
                        break;
                    case 2:
                        langage2.push(value);
                        break;
                    case 1:
                        langage1.push(value);
                        break;
                    default:
                        break;
                }
            } else {
                langage1.push(value);
            }
        });

        return [...langage3, ...langage2, ...langage1];
    }

    const searchFilter = () => {
        $scope.data = [];

        const {Langage, Ville, Contrat} = $scope.searchResult;
        let firstFilter = [];

        angular.forEach($scope.cardFull, (value, key) => {
          if (Ville === '' || Ville === value.ville) {
            if (Contrat.length > 0) {
              angular.forEach(Contrat, (val) => {
                if (val === value.Contrat) {
                  firstFilter.push(value);
                  return
                }
              })
            } else {
              firstFilter.push(value);
            }
          }
        });
        $scope.data = filterLangage(firstFilter, Langage);
    };

    searchFilter();


    serviceStudent.getAllStudent().then((res) => {
      $scope.loading = false;
      $scope.data = res.data;
      $scope.cardFull = res.data;
      searchFilter();
    })

    $scope.changeState = (item) => {
        if (window.innerWidth > 640) {
            $scope.themes.forEach(function(theme) {
                theme.active = false;
            });
            item.active = true;
        }
        if (window.innerWidth < 640 && item.active === true) {
            item.active = false;
        } else if (window.innerWidth < 640 && item.active === false) {
            $scope.themes.forEach(function(theme) {
                theme.active = false;
            });
            item.active = true;
        }
    };

    $scope.changeFilterSchool = function(){
        if (this.school.active === true) {
            this.school.active = false;
            $scope.searchResult.Ville = "";
        } else {
            if ($scope.searchResult.Ville.length === 0) {
                this.school.active = true;
                $scope.searchResult.Ville = this.school.name;
            } else if ($scope.searchResult.Ville.length > 0) {
                for (let i = 0; i < $scope.schools.length; i++) {
                    $scope.schools[i].active = false;
                    this.school.active = true;
                    $scope.searchResult.Ville = this.school.name;
                }
            }
        }
        searchFilter();
    }

    $scope.changeFilter = function(array, limit, item){
        if (item.active) {
            item.active = false;
            const index = array.indexOf(item.name);
            if (index > -1) {
                array.splice(index, 1);
            }
        } else if (!item.active && array.length < limit) {
            item.active = true;
            array.push(item.name);
        }
        searchFilter();
    }


    //////////////////////HANDLE TAGS/////////////////////

    $scope.deleteSchoolTag = function(){
        for (let i = 0; i < $scope.schools.length; i++) {
            if ($scope.schools[i].name === $scope.searchResult.Ville) {
                $scope.schools[i].active = false;
            }
        }
        $scope.searchResult.Ville = "";
        searchFilter();
    };

    $scope.deleteTag = function(array, item, list){
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === item) {
                list[i].active = false;
                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
        }
        searchFilter();
    };


    //////////////////////GET FILTER/////////////////////

    $scope.getAllSchool = () => {
        serviceFilter.getAllSchool().then(function(response) {
            $scope.schools = response.data;
            $scope.schools.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get schools failed!');
        });
    }
    $scope.getAllSchool();

    $scope.getAllSkill = () => {
        serviceFilter.getAllSkill().then(function(response) {
            $scope.skills = response.data;
            $scope.skills.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get skills failed!');
        });
    }
    $scope.getAllSkill();

    $scope.getAllContract = () => {
        serviceFilter.getAllContract().then(function(response) {
            $scope.contracts = response.data;
            $scope.contracts.map(putActiveParameter);
        }).catch(function(errMsg) {
            console.log('get contracts failed!');
        });
    }
    $scope.getAllContract();




    $(function() {
        const nav = $('.filterMain');
        if (nav.length) {
            const stickyNavTop = nav.offset().top + 4;
            $(window).scroll(function() {
                if ($(window).scrollTop() > stickyNavTop && screen.width > 640) {
                    $('.filterMain').addClass('sticktotop');
                    $('.cardPage').addClass('marginToFix');
                } else {
                    $('.filterMain').removeClass('sticktotop');
                    $('.cardPage').removeClass('marginToFix');
                }
            });
        }
    });

}]);
