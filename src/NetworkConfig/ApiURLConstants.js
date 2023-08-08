const Url = {
  //Base Url:
    // baseUrl: 'https://erp.mcs.ajax.tech/api/method/mcs_erp.api',//live
    
   
    imageurl: 'http://10.0.6.231:8000',
     baseUrl: 'http://10.0.6.231:8000/api/method/mcs_erp.api',//testing
    login: '.login',
    create: '.create_new_doc',
    view: '.get_sample_inward_doc',
    list: '.get_all_doc',
    update: '.update_sample_inward_doc',
    logout : '.logout'
   
  };
  const methods = {
    post: 'post',
    get: 'get',
    patch: 'patch',
    delete: 'delete',
    put: 'put',
  };
  export { Url, methods };
  
  