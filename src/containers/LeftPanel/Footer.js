import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import tr from '../../translate';
import tokens from '../../styles/tokens';
import { Padding } from '../../components/Spaces';
import { SmallLink, ButtonLink } from '../../components';

const FooterText = styled.footer`
  font-size: ${tokens.fontSizes.s};
`;

const Footer = ({ toggleTermsModal }) => (
  <Padding all="m">
    <FooterText>
      <div>
        <b>Dether</b> {tr('footer.all_right_reserved')} -{' '}
        <ButtonLink isSmall onClick={toggleTermsModal}>
          {tr('footer.terms_and_conditions')}
        </ButtonLink>
        &nbsp;-&nbsp;
        <SmallLink link="https://dethersupport.typeform.com/to/oajOgv">
          {tr('footer.report_bug')}
        </SmallLink>
        &nbsp;-&nbsp;
        <SmallLink link="https://dethersupport.typeform.com/to/cNpMUB">
          {tr('footer.report_shop')}
        </SmallLink>
        &nbsp;-&nbsp;
        <SmallLink link="https://medium.com/@DETHER/tutorial-dether-for-shops-c6db11c0ded1">
          {tr('footer.tutorial')}
        </SmallLink>
      </div>
    </FooterText>
  </Padding>
);

Footer.propTypes = {
  toggleTermsModal: PropTypes.func.isRequired,
};

export default Footer;
