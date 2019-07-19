import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { add, subtract } from "../actions/index";

import styles from "../styles";

class Home extends Component {

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Welcome to my app {this.props.number}</Text>
        <Button title={"Plus Button"} onPress={() => this.props.add()} />
        <Button title={"Minus Button"} onPress={() => this.props.subtract()} />
        
      </View>
    );
  }
}



const mapDispatchToProps = dispatch => {
 return bindActionCreators({ add, subtract }, dispatch)
};

const mapStateToProps = state => {
  return {
    number: state.math
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
