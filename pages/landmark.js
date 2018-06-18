import React from 'react';

import { createClient } from '../lib/contentful';

class Landmark extends React.Component {
  static async getInitialProps({ query }) {
    const client = createClient();
    return client
      .getEntries({
        content_type: 'landmark',
        order: '-sys.createdAt',
      })
      .then(response => {
        const landmark = response.items.find(l => l.fields.slug === query.slug);
        return {
          landmark,
        };
      });
  }

  render() {
    return (
      <div>
        <h4 style={{ color: this.props.landmark.fields.category.fields.color }}>
          {this.props.landmark.fields.category.fields.name}
        </h4>
        <h1>{this.props.landmark.fields.title}</h1>
        <img src={this.props.landmark.fields.image.fields.file.url} />
        <p>{this.props.landmark.fields.caption}</p>
      </div>
    );
  }
}

export default Landmark;
