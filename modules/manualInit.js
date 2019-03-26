//Type your code here
function manaulInit(){
  KNYMobileFabric = new kony.sdk();
                KNYMobileFabric.init("770b713967e4953acc16105a02c49c5b", 
                                     "ef348accd5c40bcb421ec1d01aa82a88", 
                                     "https://100006023.auth.konycloud.com/appconfig",sdkSuccessCallback,sdkErrorCallback);
}

function sdkSuccessCallback(resultset)

{

kony.print(JSON.stringify(resultset));

}

function sdkErrorCallback(error)

{

kony.print(JSON.stringify(error));

}