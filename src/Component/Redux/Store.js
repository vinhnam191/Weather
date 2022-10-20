import { createContext } from 'react';
import { useReducer } from 'react';

function onClickFunc(state, { type, payload }) {
  switch (type) {
    case 'putLatLonName':
      return payload;
    case 'putOnClickData':
      return payload;
    case 'resetLatLon':
      return payload;
    default:
      return state;
  }
}
//biến đại diện global state
export const StoreContext = createContext(null);

const Store = ({ children }) => {
  const [cityLatLon, getLatLonName] = useReducer(onClickFunc, []);
  const [onClickAPI, getOnClickAPI] = useReducer(onClickFunc, []);

  const globalState = {
    LatLonName: cityLatLon,
    LatLonNameAction: getLatLonName,
    onClickAPI: onClickAPI,
    getOnClickAPI: getOnClickAPI,
  };
  return (
    <StoreContext.Provider value={globalState}>
      {children}
    </StoreContext.Provider>
  );
};
export default Store;


