import * as routes from './routes';
import * as methods from '../services/methods';
 
let userHavePermission = false;

  export const init = (app) => {
    app.post('/login', routes.login);
    app.get('/', routes.health);
    app.get('/_health', routes.health);
    app.post('/mask/:cidr', routes.cidrToMask);
    app.post('/cidr/:mask', routes.maskToCidr);
  };

  export const health = (req, res, next) => {
    res.send('OK');
    next();
}      
  
  export const login = async (req, res, next) => {
    let username = req.body.username;   
    let password = req.body.password;   
   
    let response = {    
      "data": await methods.loginUser(username, password)   
    };
    
    res.send(response);   
    next();    
  }     

export const cidrToMask = (req, res, next) => {
  userHavePermission = methods.userIsAutenticated(req.headers.authorization);
  //console.log(`The user have permission? ${userHavePermission}, the TokenAuthorization is: ${tokenAutorization}`);
  let cidrToConvert = req.params.cidr ? req.params.cidr : false;
  
  if(userHavePermission && cidrToConvert){

        let reponseCidrToMask = methods.convertBetweenCidMask(cidrToConvert)
    
        
        res.send(reponseCidrToMask);
        next();
  }
  else {
        res.status(401).send({"data": "You are not allowed access"})
  }
  

}

export const maskToCidr = (req, res, next) => {
  userHavePermission = methods.userIsAutenticated(req.headers.authorization);
  let maskToConvert = req.params.mask ? req.params.mask : false;

  if(userHavePermission && maskToConvert){

    let reponseMaskToCidr = methods.convertBetweenCidMask(maskToConvert,false);
    res.send(reponseMaskToCidr);
    next();
  }
  else {
      res.status(401).send({"data": "You are not allowed access"})
  }

}
  
