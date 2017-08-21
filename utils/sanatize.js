const sanatize = {
  /**
   * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
   * @function pageNumber
   * @param {Number} page Page number to be sanatized
   * @return {Number} Returns a sanatized page number
   * @description Get an unknown formated page and sanatize it
   */
  pageNumber: function pageNumber(page = 1) {
    return (!/^[1-9][0-9]*$/.test(page)) ? 1 : page;
  },
};

module.exports = sanatize;
