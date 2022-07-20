export function handleNavigation(nav) {
  switch (nav.type) {
    case 'push':
      nav.navigation.navigate(nav.page, nav.passProps);
      break;
    case 'setRoot':
      nav.navigation.reset({ index: 0, routes: [{ name: nav.page }] })
      break;
    case 'pop':
      nav.navigation.goBack();
      break;
    case 'popTo':
      nav.navigation.navigate(nav.page);
      break;
    case 'popToTop':
      nav.navigation.popToTop();
      break;
  }
}

