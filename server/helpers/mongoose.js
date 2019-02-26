module.exports = {
  normalizeErrors: function(errors) {
    let normalizeErrors = [];
    for (let property in errors) {
      if (yourobject.hasOwnProperty(property)) {
        normalizeErrors.push({
          title: property,
          detail: errors[property].message
        });
      }
    }

    return normalizeErrors;
  }
};
