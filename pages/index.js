import React from 'react';
import fortune from 'fortune-css';

import style from './style.css';

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

  truncate(str) {
    if (str.length < 250) {
      return str;
    }

    return str.slice(0, 250) + '...';
  }

  render() {
    return (
      <div className="cols m-0 w-100">
        {this.props.landmarks.map((landmark, index) => (
          <div
            className="col-4 pt-1"
            style={{ backgroundColor: landmark.fields.category.fields.color }}
            key={landmark.fields.slug}
          >
            <img src={landmark.fields.image.fields.file.url} />
            <a href={`/${landmark.fields.slug}`}>
              <h1>
                {this.props.landmarks.length - index}. {landmark.fields.title}
              </h1>
              <p>{this.truncate(landmark.fields.caption)}</p>
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default Index;
