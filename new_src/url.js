export default class URL {
  constructor(url, imgParams, token, isRj) {
    this.url = url;
	  this.imgParams = imgParams;
	  this.token = token;
	  this.isRj = isRj;	
	}

	toURL() {
    return this.url;
	}
}
