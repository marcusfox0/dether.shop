import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import tr from '../../translate';
import tokens from '../../styles/tokens';

// component
import Layout from '../../components/Layout';

import LoaderScreen from '../../components/Screens/LoaderScreen';
import Header from '../../components/Header';
import ButtonLink from '../../components/ButtonLink';
import { Padding } from '../../components/Spaces';
import AddShopRouter from '../AddShopRouter';

const FooterText = styled.footer`
  font-size: ${tokens.fontSizes.s};
`;

const LeftWrapper = styled.div`
  max-width: 42rem;
  margin: auto;
  padding: ${tokens.spaces.m};
`;

class LeftPanelPage extends PureComponent {
  static propTypes = {
    isAppInitialized: PropTypes.bool.isRequired,
    hasShop: PropTypes.bool.isRequired,
    hasTransactionPending: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    balance: PropTypes.shape({
      eth: PropTypes.number.isRequired,
      dth: PropTypes.number.isRequired
    }).isRequired,
    refreshBalance: PropTypes.func.isRequired
  };
  getView = () => {
    const { isAppInitialized, hasShop, hasTransactionPending } = this.props;

    if (!isAppInitialized) {
      return (
        <LoaderScreen
          title={tr('loaderInitializer.title')}
          message={tr('loaderInitializer.message')}
        />
      );
    } else if (isAppInitialized && (!hasShop || hasTransactionPending)) {
      return <AddShopRouter />;
    }
    return <div>Add shop</div>;
  };

  render() {
    const { toggleModal, balance, refreshBalance } = this.props;
    const eth = balance.eth.toFixed(4);
    const dth = balance.dth.toFixed(4);

    return (
      <Layout isFullScreen>
        <Layout.Header>
          <Padding all="m">
            <Header onRefresh={refreshBalance} EthBalance={eth} DthBalance={dth} />
          </Padding>
        </Layout.Header>
        <Layout.ScrollableBody>
          <LeftWrapper>{this.getView()}</LeftWrapper>
        </Layout.ScrollableBody>
        <Layout.Footer>
          <Padding all="m">
            <FooterText>
              <div>
                <b>Dether</b> {tr('footer.all_right_reserved')} -{' '}
                <ButtonLink isSmall onClick={toggleModal}>
                  {tr('footer.terms_and_conditions')}
                </ButtonLink>
              </div>
            </FooterText>
          </Padding>
        </Layout.Footer>
      </Layout>
    );
  }
}

export default withRouter(LeftPanelPage);