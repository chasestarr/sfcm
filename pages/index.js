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

  render() {
    return (
      <div>
        Hello world
        {this.props.landmarks.map(landmark => (
          <div key={landmark.fields.slug}>
            <a href={`/${landmark.fields.slug}`}>
              <h2>{landmark.fields.title}</h2>
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default Index;
