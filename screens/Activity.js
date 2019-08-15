import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";

import styles from "../styles";

class Activity extends Component {
  state = {
    activities: []
  };

  getActivity = async () => {
    const activities = [];
    const db = firebase.firestore();

    const query = await db
      .collection("activity")
      .where("uid", "==", this.props.user.userId)
      .get();
    query.forEach(res => {
      activities.push(res.data());
    });
    this.setState({ activities: activities });
    this.getActivity();
  };

  componentDidMount = () => {
    this.getActivity();
  };

  render() {
    console.log("Activity", this.state.activities)
    if (this.state.activities <= 0) return <ActivityIndicator style={styles.container}/>
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.activities}
          renderItem={({ item }) => (
            <View style={[styles.container, styles.center, styles.row]}>
              <Image
                source={{ uri: item.likerPhoto }}
                style={styles.roundImage}
              />
              <View>
                <Text>{item.likerName}</Text>
                <Text>Liked your photo</Text>
                <Text>{item.date}</Text>
              </View>

              <Image
                source={{ uri: item.postPhoto }}
                style={styles.roundImage}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(Activity);
