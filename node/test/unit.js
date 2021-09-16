import chai from 'chai';
import * as methods from '../services/methods'

const expect = chai.expect;

describe('loginUser()', function () {
  it('Test login', async function () {

    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI").to.be.equal(
      await methods.loginUser("admin", "secret")
    );
  });

  it('Test login wrong credentials', async function () {

    expect(
      await methods.loginUser("admin", "nocorrectpassword")
    ).to.be.equal(null);
  });
});

describe('checkUserPermissions()', function () {
  it('Test protected', function () {

    expect(true).to.be.equal(
      methods.checkUserPermissions("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI")
    );
  });
  
  it('Test protected Endpoint with no valid jwt token', function () {

    expect(false).to.be.equal(
      methods.checkUserPermissions("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI_dataextra")
    );
  });
});

describe('convertBetweenCidMask()', function () {
  it('Convert CidrToMask', function () {
 
    let responseConvertBetweenCidMask = methods.convertBetweenCidMask(24);

     expect("255.255.255.0").to.be.equal(
      responseConvertBetweenCidMask.output
     );
  });
  it('Convert CidrToMask notNumber', function () {
 
     expect("Not a Number!").to.be.equal(
      methods.convertBetweenCidMask("veinticuatro")
     );
  });
  it('Convert MaskToCidr', function () {
 
    let responseConvertBetweenCidMask = methods.convertBetweenCidMask("255.255.255.0",false);
    
         expect(24).to.be.equal(
          responseConvertBetweenCidMask.output
         );
      });
  it('Convert MaskToCidr notIPV4', function () {
 
    let responseConvertBetweenCidMask = methods.convertBetweenCidMask("255.255.255.0",false);
    
         expect(24).to.be.equal(
          responseConvertBetweenCidMask.output
         );
      });
  it('Validate if is IPV4', function () {
 
         expect(true).to.be.equal(
          methods.ipv4ValidationFunction("255.255.255.0")
         );
      });
  it('Validate if is Not a IPV4', function () {
 
         expect(false).to.be.equal(
          methods.ipv4ValidationFunction("255.255255.0")
         );
      });
  
  
});
