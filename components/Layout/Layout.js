import enUS from 'antd/lib/locale-provider/en_US';
import React, { PropTypes } from 'react';
import { LocaleProvider, Layout } from 'antd';
import Navigation from './Navigation';

const Content = Layout.Content;
const Footer = Layout.Footer;
const Header = Layout.Header;

class PageLayout extends React.Component {

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
        <Layout>
          <Header>
            <Navigation />
          </Header>
          <Content>
            <div {...this.props} />
          </Content>
          <Footer>
            <label>C</label>
          </Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default PageLayout;
