'use strict';

/**
 * Should update the record within __menuItems to isCurrent: true and all others to false
 *
 * @param {string} baseAppUrl
 */
module.exports = function autoUpdateMenuItemBasedOnPath(baseAppUrl) {
  return function(req, res, next) {
    let menuItems = req.app.locals.__menuItems
      , path = `${baseAppUrl || ''}${req.path}`
      , setCurrent = (menuItem) => {
        menuItem.isCurrent = (menuItem.href === path);

        if (menuItem.children && menuItem.children.length > 0) {
          menuItem.children = menuItem.children.map(setCurrent);
        }

        return menuItem;
      }
      ;

    if (menuItems && menuItems.length === 0) {
      console.log('__menuItems was empty');
      return next();
    }

    menuItems = menuItems.map(setCurrent);

    req.app.locals.__menuItems = menuItems;

    next();
  };
};
