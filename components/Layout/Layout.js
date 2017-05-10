import enUS from 'antd/lib/locale-provider/en_US';
import React from 'react';
import { Layout, LocaleProvider } from 'antd';
import Navigation from './Navigation';

const Content = Layout.Content;
const Footer = Layout.Footer;
const Header = Layout.Header;

class PageLayout extends React.Component {
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
          <Footer style={{ position: 'absolute', bottom: 0, overflow: 'hidden' }}>
            Copyright UMSTeK
          </Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}

export default PageLayout;
