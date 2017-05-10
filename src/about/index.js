import Helmet from 'react-helmet';
import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { html, title } from './index.md';

class AboutPage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <Helmet>
          <title>
            {title}
          </title>
        </Helmet>
        <h1>{title}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Layout>
    );
  }

}

export default AboutPage;
