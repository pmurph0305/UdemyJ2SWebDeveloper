import React from "react";

class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emoji: ""
    };
  }

  componentDidMount() {
    this.generateEomji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEomji(this.props.entries);
  }

  generateEomji = entries => {
    fetch(
      `https://a7vsyjj388.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log);
  };

  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className="white f3">
          {`${name}, your current entry count is...`}
        </div>
        <div className="white f1">{entries}</div>
        <div className="white f3">{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
