export const storeStateMiddleWare = ({ getState }) => ((next) => (action) => {
  console.log('Middleware reached');
  const returnValue = next(action);
  window.top.state = getState();
  return returnValue;
});
