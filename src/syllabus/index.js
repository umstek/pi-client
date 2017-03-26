/**
 * Created by wickramaranga on 3/24/17.
 */

import React, { PropTypes, Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PageLayout from '../../components/Layout';
import Subject from '../../components/Syllabus/Subject';

const { Header, Footer, Sider, Content } = Layout;
const AMenu = Menu;
const MenuItem = Menu.Item;

class SyllabusPage extends Component {
  static propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      difficulty: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      syllabusId: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  render() {
    return (
      <PageLayout>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <AMenu theme="light" mode="vertical">
              {
                this.props.subjects.map(subject =>
                  <MenuItem key={subject.id}>
                    <Icon type="book" />
                    <span className="nav-text">{subject.name}</span>
                  </MenuItem>,
                )
              }
            </AMenu>
          </Sider>
          <Subject />
        </Layout>
      </PageLayout>
    );
  }
}

export default SyllabusPage;
