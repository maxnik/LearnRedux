import React from 'react';


export default class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="app col-sm-12 col-md-6 col-lg-5">
            <h1 className="page-title">Header</h1>

          </div>
        </div>
      </div>
    );
  }
}