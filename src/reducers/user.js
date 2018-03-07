import config from '../constants/config';

const initialState = {
  balance: {
    eth: 0,
    dth: 0
  },
  isCertified: false,
  ethAddress: null
};

/**
 * userReducer
 */
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_BALANCE':
      return { ...state, balance: payload.balance };
    case 'SET_USER_CERTIFIED':
      return { ...state, isCertified: payload };
    case 'SET_ETH_ADDRESS':
      return { ...state, ethAddress: payload.ethAddress };
    default:
      return state;
  }
};

/**
 * hasBalance
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasBalance = ({ balance }) => balance && (balance.eth !== 0 || balance.dth !== 0);

/**
 * hasEnougthMoneyToAddShop
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasEnougthMoneyToAddShop = ({ balance }) =>
  hasBalance({ balance }) &&
  balance.eth >= config.gasPrice.simpleTransac &&
  balance.dth >= config.licensePrice;

/**
 * hasEnougthMoneyToRemoveShop
 * @param  {[type]}  balance [description]
 * @return {Boolean}         [description]
 */
export const hasEnougthMoneyToRemoveShop = ({ balance }) =>
  hasBalance({ balance }) && balance.eth >= config.gasPrice.simpleTransac;

export default userReducer;