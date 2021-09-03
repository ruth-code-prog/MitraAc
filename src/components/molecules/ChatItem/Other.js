import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { colors, fonts } from "../../../utils";
import { DummyDoctor9 } from "../../../assets";
import ImageViewer from "react-native-image-zoom-viewer";

const Other = ({ text, date, photo, type }) => {
  const [modalZoom, setModalZoom] = useState(false);
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          {type === "photo" ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalZoom(true)}
            >
              <Image
                source={{ uri: text }}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: 240,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>{text}</Text>
          )}
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      {type === "photo" ? (
        <Modal visible={modalZoom} transparent={true}>
          <ImageViewer
            enableSwipeDown
            onSwipeDown={() => setModalZoom(false)}
            imageUrls={[{ url: text }]}
          />
        </Modal>
      ) : null}
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-end",
    paddingLeft: 16,
    flexDirection: "row",
  },
  avatar: { width: 30, height: 30, borderRadius: 30 / 2, marginRight: 12 },
  chatContent: {
    padding: 12,
    paddingRight: 40,
    backgroundColor: colors.primary,
    maxWidth: "100%",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
