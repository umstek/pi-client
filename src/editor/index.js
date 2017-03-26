import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import css from '!!style-loader!css-loader!react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PageLayout from '../../components/Layout/Layout';

class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <PageLayout>
        <Editor
          style={css}
          editorState={this.state.editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          uploadCallback={this.uploadImageCallBack}
        />
      </PageLayout>
    );
  }
}

export default EditorPage;
