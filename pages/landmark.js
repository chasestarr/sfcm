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
        response.items = response.items.map((item, index) => {
          item.index = response.total - index;
          return item;
        });

        const compareSlug = l => l.fields.slug === query.slug;
        const landmark = response.items.find(compareSlug);
        return {
          index: response.items.findIndex(compareSlug),
          landmark,
          landmarks: response.items,
        };
      });
  }

  render() {
    if (!this.props.landmark) return null;

    return (
      <div className="cols py-3">
        <div className="col-8 offset-2">
          <div
            style={{ borderColor: this.props.landmark.fields.category.fields.color }}
            className="badge bold px-1 b-1 b-white"
          >
            {this.props.landmark.fields.category.fields.name}
          </div>
          <div className="flex flex-ycenter flex-between">
            <h1>{this.props.landmark.fields.title}</h1>
            <h3>#{this.props.landmark.index}</h3>
          </div>
          <img src={this.props.landmark.fields.image.fields.file.url} />
          <p className="pt-3">{this.props.landmark.fields.caption}</p>
          <h3>Submitted by: {this.props.landmark.fields.authorName}</h3>
        </div>
      </div>
    );
  }
}

export default Landmark;
