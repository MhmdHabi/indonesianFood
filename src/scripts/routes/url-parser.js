const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this._urlSplitter(url);
    return this._urlCombiner(splittedUrl);
  },

  _urlSplitter(url) {
    const urls = url.split('/');
    return {
      resource: urls[1] || null,
      id: urls[2] || null,
      verb: urls[3] || null,
    };
  },

  _urlCombiner(splittedUrl) {
    return (splittedUrl.resource ? `/${splittedUrl.resource}` : '/') + (splittedUrl.id ? '/:id' : '') + (splittedUrl.verb ? `/${splittedUrl.verb}` : '');
  },
};

export default UrlParser;
