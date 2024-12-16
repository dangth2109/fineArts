const formatDate = (date) => {
    return new Date(date).toISOString();
  };
  
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const paginateResults = (page, limit) => {
    const skip = (page - 1) * limit;
    return {
      skip,
      limit: parseInt(limit)
    };
  };
  
  module.exports = {
    formatDate,
    validateEmail,
    paginateResults
  };