import React from 'react';

import { createClient } from '../lib/contentful';

class Index extends React.Component {
  static async getInitialProps() {
    const client = createClient();
    return client
      .getEntries({
        content_type: 'landmark',
        order: '-sys.createdAt',
      })
      .then(response => ({
        landmarks: response.items,
      }));
  }

  render() {
    console.log(this.props.landmarks);
    return <div>hello</div>;
  }
}

export default Index;
