import { connect } from 'react-redux';

import Component from './Navigator';

const mapStateToProps = state => {
  return { userType: state.user.type };
};
const mapDispatchToProps = dispatch => {
  return { dispatch };
};

const Navigator = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Navigator;
