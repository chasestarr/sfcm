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
    return (
      <div className="cols py-3">
        <div className="col-3 p-0 hide sidebar">
          {this.props.landmarks.map((landmark, index) => (
            <div style={{ backgroundColor: landmark.fields.category.fields.color }} key={index}>
              <a href={`/${landmark.fields.slug}`}>
                <h2 className="m-0 h-8 mh-100 overflow-scroll">
                  {landmark.index}. {landmark.fields.title}
                  {this.props.index === index ? '*' : null}
                </h2>
              </a>
            </div>
          ))}
        </div>

        <div className="col-6">
          <div
            class="badge bold px-1"
            style={{ backgroundColor: this.props.landmark.fields.category.fields.color }}
          >
            {this.props.landmark.fields.category.fields.name}
          </div>
          <div className="flex flex-ycenter flex-between">
            <h1>{this.props.landmark.fields.title}</h1>
            <h1>#{this.props.landmark.index}</h1>
          </div>
          <img src={this.props.landmark.fields.image.fields.file.url} />
          <p class="pt-3">{this.props.landmark.fields.caption}</p>
          <h2>Submitted by: {this.props.landmark.fields.authorName}</h2>
        </div>
      </div>
    );
  }
}

export default Landmark;
