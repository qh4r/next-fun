import React, {Component} from 'react';
import {MuiThemeProvider} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from 'next/head';
import * as colors from './theme';

try {
  injectTapEventPlugin();
} catch (e) {

}

const withMaterialUi = WrappedComponent => {
  return class WithMaterialUi extends Component {

    static async getInitialProps(context) {
      const {req} = context;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const subProps = await WrappedComponent.getInitialProps(context);

      return {
        ...subProps,
        userAgent
      }
    }

    render() {
      const {userAgent} = this.props;
      const Helvetica = 'Helvetica Neue, Helvetica, Arial, sans-serif';
      const muiTheme = getMuiTheme({
        fontFamily: Helvetica,
        palette: {
          ...colors
        },
        appBar: {
          height: 60,
        }
      }, {
        userAgent
      });
      return (
        <div>
          <Head>
            <title>Page title</title>
            <meta charset="UTF-8"/>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          </Head>
          <MuiThemeProvider muiTheme={muiTheme}>
            <WrappedComponent {...this.props} />
          </MuiThemeProvider>
        </div>
      );
    }
  }
};

export default withMaterialUi;