const config = {
  suffix: '.html',
  appendToDirs: 'index.html',
  removeTrailingSlash: false,
};

const username = 'a8user'; // Replace with your username
const password = 'a8user@42!'; // Replace with your password
const validAuth = 'Basic ' + btoa(username + ':' + password);

async function handler(event) {
  const request = event.request;
  const headers = request.headers;
  const uri = request.uri;

  // // Basic Authentication Check
  // if (!headers.authorization || headers.authorization.value !== validAuth) {
  //   return {
  //     statusCode: 401,
  //     statusDescription: 'Unauthorized',
  //     headers: {
  //       'www-authenticate': { value: 'Basic' }
  //     }
  //   };
  // }

  // URL Rewrite Logic
  if (uri.endsWith('/')) {
    request.uri += config.appendToDirs;
  } else if (!uri.includes('.')) {
    request.uri += '/' + config.appendToDirs;
  }

  return request;
}
