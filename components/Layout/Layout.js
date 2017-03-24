/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Header from './Header';
import Footer from '../Footer';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <div>
            <Header />
            <main>
              <div {...this.props} />
              <Footer />
            </main>
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

export default Layout;
