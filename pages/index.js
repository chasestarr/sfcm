import React from 'react';
import moment from 'moment';
import fortune from 'fortune-css';

import style from './style.css';

import { createClient } from '../lib/contentful';
import { isMoment } from 'moment';

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
      <div className="cols w-100 py-2">
        {this.props.landmarks.map((landmark, index) => (
          <div className="col-4 mb-1" key={landmark.fields.slug}>
            <a href={`/${landmark.fields.slug}`}>
              <div
                className="p-1 h-9 b-1 radius-3"
                style={{ borderColor: landmark.fields.category.fields.color }}
              >
                <p className="small">{moment(landmark.sys.createdAt).format('MMM DD, YYYY')}</p>
                <div className="flex flex-ycenter h-8">
                  <h3>
                    {this.props.landmarks.length - index}. {landmark.fields.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default Index;
