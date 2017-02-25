app.service('AuthService', function($q, $http, API_ENDPOINT) {
  let LOCAL_TOKEN_KEY = 'AdopteAppTokenKey';
  let isAuthenticated = false;
  let authToken;
  let role = '';


  let serializedCurrentAnnonce;

  const clearLocalStorage = () => {
   localStorage.clear(serializedCurrentAnnonce);
  }

  function loadUserCredentials() {
    const token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  let constantUser = {};
  let constantUserRole = {};
  let testLocalStorage;

  const getConstantUser = () => {
   constantUser = JSON.parse(localStorage.getItem('user'));
   return constantUser;
  }

  const setConstantUser = (user) => {
   constantUser = user;
  }

  const getConstantUserRole = () => {
   constantUserRole = localStorage.getItem('userRole');
   return constantUserRole;
  }

  const login = (user) => {
     return $http.post(API_ENDPOINT.url + '/authenticate', user).then(
      function(response){
        if (response.data.msg === 'Authentication failed. Inactive account.') {

        } else if (response.data.success === true) {
          storeUserCredentials(response.data.token);
          constantUser = localStorage.setItem('user', angular.toJson(response.data.user));
          testLocalStorage = localStorage.setItem('userRole', response.data.user.role);
        }
       return response;
      }, function(error){
       return error;
      }
     );
  };

  const updateUser = (id, newInfos) => {
      return $http.put(API_ENDPOINT.url + '/update/user/' + id, newInfos).then(
       function(response){
         constantUser = localStorage.setItem('user', angular.toJson(response.data));
        return response;
       }, function(error){
        return error;
       }
      );
  };

  const createToken = (mail) => {
      return $http.post(API_ENDPOINT.url + '/forget/pass/' + mail).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  };

  const updateUserPassFromProfil = (id, newInfos) => {
      return $http.put(API_ENDPOINT.url + '/update/pass/profil/' + id, newInfos).then(function(response) {
          return response;
      }, function(error) {
          return error;
      });
  };

  const resetUserPass = (token, pass) => {
      return $http.put(API_ENDPOINT.url + '/update/pass/reset', {token, pass}).then(function(response) {
          return response;
      }, function(error) {
          return error;
      });
  };

  const register = (user) => {
      return $http.post(API_ENDPOINT.url + '/signup', user).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  };

  const confirmMail = (token) => {
      let data = {token: token};
      return $http.post(API_ENDPOINT.url + '/valid/mail', data).then(
       function(response){
        return response;
       }, function(error){
        return error;
       }
      );
  }

  const getInfo = (user) => {
   return $http.get(API_ENDPOINT.url + '/memberinfo').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  const getAllUser = () => {
   return $http.get(API_ENDPOINT.url + '/users').then(
    function(response) {
    return response;
    }, function(error){
     return error;
    }
   );
  }

  const removeFromAdmin = (id) => {
    return $http.delete(API_ENDPOINT.url + '/memberinfo/delete/'+ id).then(
      function(response){
       return response;
      }, function(error){
       return error;
      });
  };

  const getCsvRecruiter = () => {
    return $http.get(API_ENDPOINT.url + '/csv/recruiter').then(
      function(response){
       return response;
      }, function(error){
       return error;
      });
  };

  const getCsvStudent = () => {
    return $http.get(API_ENDPOINT.url + '/csv/student').then(
      function(response){
       return response;
      }, function(error){
       return error;
      });
  };

  const getCsvStudentProfil = () => {
    return $http.get(API_ENDPOINT.url + '/csv/studentProfil').then(
      function(response){
       return response;
      }, function(error){
       return error;
      });
  };

  const logout = () => {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    getCsvStudentProfil : getCsvStudentProfil,
    getCsvRecruiter : getCsvRecruiter,
    getCsvStudent : getCsvStudent,
    updateUserPassFromProfil : updateUserPassFromProfil,
    resetUserPass : resetUserPass,
    createToken: createToken,
    updateUser : updateUser,
    user: getConstantUser,
    setUser: setConstantUser,
    userRole: getConstantUserRole,
    loadUserCredentials: loadUserCredentials,
    login: login,
    confirmMail: confirmMail,
    register: register,
    getInfo: getInfo,
    getAllUser: getAllUser,
    logout: logout,
    clearLocalStorage: clearLocalStorage,
    removeFromAdmin: removeFromAdmin,
    isAuthenticated: function() {return isAuthenticated;},
  };
})
