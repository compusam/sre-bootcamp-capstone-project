const jwt = require('jsonwebtoken');
import db from '../connections/mysqldb';
const crypto = require("crypto");
const netmask = require("netmask");
const secretJWT = process.env.JWT_KEY;


/* This database data is here just for you to test, please, remember to define your own DB
# You can test with username = admin, password = secret  
# This DB has already a best practice: a salt value to store the passwords*/
export const loginUser = async (username, userpassword) => {   

    try {
        const dataUserResult = await db.query(
          "SELECT username, salt, role,password FROM users WHERE username = ?",
          [ username ]
        );
        const userObject = dataUserResult[0];
        const hashedPassword = crypto.createHash('sha512').update(userpassword + userObject.salt).digest('hex');
        if(!hashedPassword.localeCompare(userObject.password)){
          const tokenJWT = jwt.sign(
                    {
                      role: userObject.role,
                    },
                    secretJWT,
                    {
                      noTimestamp: true,
                    });                   
                    return tokenJWT;
        }
        return null
      } catch (err) {
        console.error(err)
      }    
}
export const extractAutorizationToken = (reqHeaderAutorization) =>{
      if(reqHeaderAutorization.startsWith("Bearer ")){
        return reqHeaderAutorization.substring(7, reqHeaderAutorization.length);
      }
      else {
        return null;
      }
}
export const checkUserPermissions = (authorization) => {

     try {
       const user = jwt.verify(authorization, secretJWT);    
       if (user) {
         return true;
       }
       return false;
     } catch (err) {
       console.error("Invalid JWT Token!");
       return false;
     }
}

export const userIsAutenticated = (authorizationHeader) => {
  let tokenAutorization = extractAutorizationToken(authorizationHeader);
  const userHavePermission = checkUserPermissions(tokenAutorization);
  if (userHavePermission) {
    return true;
  }
  return false;
}

export const convertBetweenCidMask = (cidmaskdatainput, cidtomask = true) => {
 
  if(cidtomask){
    return cidrToMaskFunction(cidmaskdatainput);
  }
  else{
    return maskToCidrFunction(cidmaskdatainput);
  }
}
//cidrtomask
export const cidrToMaskFunction = (cidmaskdatainput) => {    

    let bitcount = parseInt(cidmaskdatainput);
    if (isNaN(bitcount)) {
      return 'Not a Number!';
    }
    var mask = [], i, n;
    for(i=0; i<4; i++) {
      n = Math.min(bitcount, 8);
      mask.push(256 - Math.pow(2, 8-n));
      bitcount -= n;
    }
    mask = mask.join('.');
  
    //console.log(mask);
    return {
      "function": "cidrToMask",
      "input" : cidmaskdatainput,
      "output": mask
    }
}
//masktocidr
export const maskToCidrFunction = (cidmaskdatainput) => {
    //console.log(value);  
    var maskNodes = cidmaskdatainput.match(/(\d+)/g);
    var cidr = 0;
    for(var i in maskNodes)
    {
      cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
    }
    return {
      "function": "maskToCidr",
      "input" : cidmaskdatainput,
      "output": cidr
    }
}
//ipv4validation
export const ipv4ValidationFunction = (ipToValidate) => {
    //console.log(value);
    let regularExpressionForValidateIP =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      if (ipToValidate.match(regularExpressionForValidateIP))
        {
          return true;
        }

    return false;
}

