import React from 'react';

import { createClient, getConfig, uploadFile } from '../lib/contentful';

class Landmark extends React.Component {
  static async getInitialProps({ query }) {
    const client = createClient();
    return client
      .getEntries({
        content_type: 'category',
        order: 'sys.createdAt',
      })
      .then(response => {
        return {
          categories: response.items,
          config: getConfig(),
        };
      });
  }

  state = {
    title: '',
    caption: '',
    category: this.props.categories[0],
    name: '',
    email: '',
  };

  handleChange = (field, value) => this.setState({ [field]: value });

  handleFile = event => {
    // const fileReader = new FileReader();
    // fileReader.onload = () => this.setState({ image: fileReader.result });
    // fileReader.readAsText(event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    uploadFile(this.props.config.s, this.props.config.t, this.state.image).then(res =>
      console.log(res)
    );
  };

  render() {
    console.log(this.state);
    return (
      <form className="cols py-3" onSubmit={this.handleSubmit}>
        <div className="col-12">
          <h1>Add to the Community Map</h1>
        </div>

        <div className="col-6">
          <div className="mt-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={event => this.handleChange('title', event.target.value)}
            />
          </div>

          <div className="mt-2">
            <label>Image</label>
            <input type="file" name="image" onChange={this.handleFile} />
          </div>

          <div className="mt-2">
            <label>Caption</label>
            <textarea
              name="caption"
              onChange={event => this.handleChange('caption', event.target.value)}
            />
          </div>

          <div className="mt-2">
            <label>Category</label>
            <select onChange={event => this.handleChange('category', event.target.value)}>
              {this.props.categories.map(c => (
                <option key={c.fields.name} label={c.fields.name} value={c.fields.name} />
              ))}
            </select>
          </div>
        </div>

        <div className="col-6">
          <div className="mt-2">
            <label>Author Name</label>
            <input
              type="text"
              name="name"
              onChange={event => this.handleChange('name', event.target.value)}
            />
          </div>

          <div className="mt-2">
            <label>Author Email</label>
            <input
              type="text"
              name="email"
              onChange={event => this.handleChange('email', event.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <button className="mt-1">Add</button>
        </div>
      </form>
    );
  }
}

export default Landmark;
