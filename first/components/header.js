import {AppBar} from 'material-ui';
import {Component} from 'react';

class Header extends Component {
  static defaultProps = {
    title: 'Sample next app!',
  };

  render() {
    return (
      <AppBar
        title={this.props.title}
        showMenuIconButton={false}
      />
    );
  }
}

export default Header;