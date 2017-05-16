import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Icon, Input, Layout, Modal } from 'antd';
import Helmet from 'react-helmet';
import draftToHtml from 'draftjs-to-html';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import css from '!!style-loader!css-loader!react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PageLayout from '../../components/Layout/Layout';
import history from '../../src/history';
import env from '../env.json';
import store from '../store';

const Content = Layout.Content;
const Header = Layout.Header;
const Footer = Layout.Footer;
const ButtonGroup = Button.Group;

class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '', contentState: '', title: '' };
  }

  componentDidMount() {

  }

  onTitleBlur = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      ...this.state,
      editorState,
    });
  };

  onContentStateChange = (contentState) => {
    const markup = draftToHtml(contentState);
    this.setState({
      ...this.state,
      contentState,
      content: markup,
    });
  };

  handlePublish = (e) => {
    e.preventDefault();

    const values = {
      title: this.state.title,
      content: this.state.content,
      contentAuthorId: store.getState().login.userId,
    };

    if (!this.state.title) {
      Modal.error({
        title: 'Title',
        content: 'Please fill the title field. ',
      });
      return;
    }

    if (!this.state.content) {
      Modal.error({
        title: 'Content',
        content: 'Please add some content. ',
      });
      return;
    }

    Modal.confirm({
      title: 'Publish',
      content: 'Are you sure you want to publish your article?',
      onOk() {
        fetch(`${env.baseUrl}/Articles?access_token=${store.getState().login.accessToken}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
          })
          .then((response) => {
            if (response.ok) {
              Modal.success({
                title: 'Published!',
                content: 'Your article has successfully been published. ',
              });
              history.push('/');
            } else {
              Modal.error({
                title: 'Error!',
                content: 'Cannot publish it right now. Please try again later. ',
              });
            }
          });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handleCancel = (e) => {
    e.preventDefault();

    Modal.confirm({
      title: 'Cancel',
      content: 'Are you sure you want to discard changes?',
      onOk() {
        history.push('/');
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    return (
      <PageLayout>

        <Header>
          <Input type="text" size="large" placeholder="Title" onBlur={this.onTitleBlur} />
          <Helmet>
            <title>Editor</title>
          </Helmet>
        </Header>

        <Content style={{ height: 400 }}>
          <Editor
            style={css}
            editorState={this.state.editorState}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
            uploadCallback={this.uploadImageCallBack}
          />
        </Content>

        <Footer style={{ background: 'white' }}>
          <ButtonGroup>
            <Button type="primary" onClick={this.handlePublish}>
              <Icon type="upload" />Publish
            </Button>
            <Button type="danger" onClick={this.handleCancel}>
              <Icon type="close" />Cancel
            </Button>
          </ButtonGroup>
        </Footer>

      </PageLayout>
    );
  }
}

export default EditorPage;
