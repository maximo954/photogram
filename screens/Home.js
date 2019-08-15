import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { getPost, unlikePost, likePost } from "../actions/post";
import styles from "../styles";

class Home extends Component {
  componentWillMount() {
    this.props.getPost();
  }

  navigateMap = item => {
    this.props.navigation.navigate("Map", { location: item.postLocation });
  };

  likePost = post => {
    const { userId } = this.props.user;

    if (post.likes.includes(userId)) {
      this.props.unlikePost(post);
    } else {
      this.props.likePost(post);
    }
  };

  render() {
    if (this.props.posts === null) return null;
    console.log("Feeds", this.props.posts.feeds);
    return (
      <View>
        <FlatList
          data={this.props.posts.feeds}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <Image
                    source={{ uri: this.props.user.photo }}
                    style={styles.roundImage}
                  />
                  <Text>{this.props.user.username}</Text>
                  <TouchableOpacity onPress={() => this.navigateMap(item)}>
                    <Text>
                      {item.postLocation ? item.postLocation.name : null}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Ionicons style={{ margin: 5 }} name="ios-flag" size={25} />
              </View>
              <TouchableOpacity onPress={() => this.likePost(item)}>
                <Image
                  source={{ uri: item.postPhoto }}
                  style={styles.postPhoto}
                />
              </TouchableOpacity>
              <View style={[styles.row]}>
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <Ionicons
                    style={{ margin: 5 }}
                    color={
                      item.likes.includes(this.props.user.userId)
                        ? "#DD2C00"
                        : null
                    }
                    name={
                      item.likes.includes(this.props.user.userId)
                        ? "ios-heart"
                        : "ios-heart-empty"
                    }
                    size={25}
                  />
                </TouchableOpacity>
                <Ionicons
                  style={{ margin: 5 }}
                  name="ios-chatbubbles"
                  size={25}
                />
                <Ionicons style={{ margin: 5 }} name="ios-send" size={25} />
              </View>
              <Text>{item.postDescription}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPost, likePost, unlikePost }, dispatch);
};

const mapStateToProps = state => {
  console.log("Feeds", state.user);
  return {
    posts: state.post,
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
