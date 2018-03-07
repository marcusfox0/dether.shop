import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

/*
  Components
 */
import ShopRecap from '../../components/ShopRecap';
import Button from '../../components/Button';
import LoaderScreen from '../../components/Screens/LoaderScreen';

/*
  Translate module
 */
import tr from '../../translate';

/*
  Redux
 */
import {
  addDeleteShopTransaction as addDeleteShopTransactionAction,
  removeShop as removeShopAction,
  endTransaction as endTransactionAction
} from '../../actions/shop';

/*
  Helpers
 */
import {
  deleteShop as deleteShopHelper,
  getTransactionStatus
} from '../../helpers';

/**
 * ShowShop container
 * @extends PureComponent
 */
export class ShowShop extends PureComponent {
  static propTypes = {
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cat: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      opening: PropTypes.string.isRequired,
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired
    }).isRequired,
    addDeleteShopTransaction: PropTypes.func.isRequired,
    isTransactionPending: PropTypes.bool.isRequired,
    deleteContractShop: PropTypes.func.isRequired,
    removeShopFromStore: PropTypes.func.isRequired,
    transactionHash: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    endTransaction: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
  }
  componentWillMount() {
    const { isTransactionPending } = this.props;

    if (isTransactionPending) {
      this.interval = this.checkTransaction();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getView = () => {
    const { isTransactionPending } = this.props;

    if (isTransactionPending)
      return <div>{tr('show_shop.transaction_pending')}</div>;
    return <Button onClick={this.deleteShop}>{tr('show_shop.delete_button')}</Button>;
  }

  showLoader = () => this.setState({ isLoading: true });
  HideLoader = () => this.setState({ isLoading: false });

  endCheckTransaction = () => {
    const { endTransaction } = this.props;
    endTransaction();
    clearInterval(this.interval);
  }

  checkTransaction = () => {
    const { transactionHash, removeShopFromStore, history } = this.props;
    this.interval = setInterval(async () => {
      const status = await getTransactionStatus(transactionHash);
      if (status === 'success') {
        removeShopFromStore();
        history.push('/');
        this.endCheckTransaction();
      } else if (status === 'error') {
        console.log('DELETE Transaction Error', transactionHash);
        this.endCheckTransaction();
      }
    }, 3000);
  }

  deleteShop = async () => {
    const { deleteContractShop, addDeleteShopTransaction } = this.props;

    this.showLoader();
    const transaction = await deleteContractShop().catch(e => console.log('Error', e));
    addDeleteShopTransaction(transaction.transactionHash);
    this.checkTransaction();
    this.HideLoader();
  }

  render = () => {
    const { shop } = this.props;
    const { isLoading } = this.state;

    return isLoading ?
      <LoaderScreen
        title={tr('show_shop.loader_title')}
        message={tr('show_shop.loader_delete_message')}
      />
      :
      <Fragment>
        <ShopRecap {...shop} />
        {this.getView()}
      </Fragment>;
  }
}

const mapStateToProps = ({ shop }) => ({
  shop: shop.shop,
  isTransactionPending: !!shop.transactionHash,
  transactionHash: shop.transactionHash || ''
});

const mapDispatchToProps = dispatch => ({
  deleteContractShop: deleteShopHelper,
  removeShopFromStore: bindActionCreators(removeShopAction, dispatch),
  addDeleteShopTransaction: bindActionCreators(addDeleteShopTransactionAction, dispatch),
  endTransaction: bindActionCreators(endTransactionAction, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowShop));