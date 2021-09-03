import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { Gap, HomeProfile, NewsItem, WebItem } from "../../components";
import { Fire } from "../../config";
import { colors, fonts, showError, getData, storeData } from "../../utils";
import { ILNullPhoto } from "../../assets";
import { useSelector } from "react-redux";
import CurrencyFormatter from "react-native-currency-formatter";

const Mitra = ({ navigation }) => {
  const [userSaldo, setUserSaldo] = useState(null);
  const [news, setNews] = useState([]);
  const [web, setWeb] = useState([]);
  const { token } = useSelector((state) => state.fcm);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: "",
    profession: "",
  });

  useEffect(() => {
    Fire.auth().onAuthStateChanged((data) => {
      console.log("verif -> data", data);
      if (data) {
        getUserSaldo(data.uid);
      }
    });
  }, []);

  useEffect(() => {
    getNews();
    getWeb();
    navigation.addListener("focus", () => {
      getUserData();
    });
  }, [navigation]);

  const getNews = () => {
    Fire.database()
      .ref("news/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          setNews(res.val());
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getWeb = () => {
    Fire.database()
      .ref("webs/")
      .once("value")
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setWeb(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  useEffect(() => {
    const setTokenToFirebase = async () => {
      let userdata = await getData("user");
      if (userdata) {
        const data = {
          fullName: userdata.fullName,
          profession: userdata.category,
          category: userdata.category,
          saldo: userdata.saldo,
          rate: 0,
          university: userdata.university,
          str_number: userdata.str_number,
          hospital_address: userdata.hospital_address,
          gender: userdata.gender,
          email: userdata.email,
          uid: userdata.uid,
          token: token,
          photo: userdata.photo,
          photoForDB: userdata.photoForDB,
        };
        Fire.database()
          .ref(`ourstaffs/${userdata.uid}/`)
          .update({ token: token });
        storeData("user", data);
      }
    };
    setTokenToFirebase();
  }, []);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      console.log(data);
      setProfile(res);
    });
  };

  const getUserSaldo = (uid) => {
    Fire.database()
      .ref("ourstaffs/" + uid)
      .on("value", (snapshot) => {
        console.log(
          "🚀 ~ file: index.js ~ line 29 ~ useEffect ~ snapshot",
          snapshot.val()
        );
        if (snapshot.val()) {
          setUserSaldo(snapshot.val());
        }
      });
  };

  const renderNews = () => {
    if (news.length > 0) {
      let listNews = news.map((item) => {
        if (item) {
          return (
            <TouchableOpacity onPress={() => openNews(item.link)} key={item.id}>
              <NewsItem
                key={item.id}
                title={item.title}
                body={item.body}
                date={item.date}
                image={item.image}
              />
            </TouchableOpacity>
          );
        }
      });

      return listNews;
    } else {
      return null;
    }
  };

  const renderWeb = () => {
    if (web.length > 0) {
      let listweb = web.map((item) => {
        if (item) {
          return (
            <TouchableOpacity onPress={() => openWeb(item.link)} key={item.id}>
              <WebItem
                key={item.id}
                title={item.title}
                body={item.body}
                date={item.date}
                image={item.image}
              />
            </TouchableOpacity>
          );
        }
      });

      return listweb;
    } else {
      return null;
    }
  };

  const openNews = (url) => {
    Linking.openURL("vnd.youtube://www.youtube.com/watch?v=" + url);
  };
  const openWeb = (url) => {
    Linking.openURL("https://" + url);
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <View style={styles.row}>
              <HomeProfile
                profile={profile}
                onPress={() => navigation.navigate("UserProfile", profile)}
              />

              <TouchableOpacity
                onPress={() => Linking.openURL("https://wa.me/+62895600394345")}
              >
                <Image
                  source={require("../../assets/dummy/dompet.png")}
                  style={styles.dompet}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.saldo}>
              {CurrencyFormatter(userSaldo !== null ? userSaldo.saldo : 0)}
            </Text>
          </View>

          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Video Info and Trending</Text>
          </View>
          {renderNews()}
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Web</Text>
          </View>
          {renderWeb()}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Mitra;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    dompet: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 88,
    height: 48,
    resizeMode: "contain",
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: { paddingHorizontal: 16 },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: { flexDirection: "row" },
  wrapperScroll: { marginHorizontal: -16 },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  saldo: {
    fontSize: 14,
    color: "#E5B654",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 52,
    marginLeft: 150,
  },
});
