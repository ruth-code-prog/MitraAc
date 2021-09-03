import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, Input} from '../../components';
import {Fire} from '../../config';
import {colors, showError, storeData, useForm} from '../../utils';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.fcm);
  const [form, setForm] = useForm({
    fullName: '',
    category: 'Admin',
    university: '',
    str_number: '',
    hospital_address: '',
    gender: 'pria',
    email: '',
    password: '',
  });
  const [itemCategory] = useState([
    {
      id: 1,
      label: 'Admin',
      value: 'Admin',
    },
    {
      id: 2,
      label: 'Perawat',
      value: 'Perawat',
    },
    {
      id: 3,
      label: 'Service Elektronik',
      value: 'Service Elektronik',
    },
    {
      id: 4,
      label: 'Body Massage',
      value: 'Body Massage',
    },
    {
      id: 5,
      label: 'Baby Massage',
      value: 'Baby Massage',
    },
    {
      id: 6,
      label: 'Barber',
      value: 'Barber',
    },
    {
      id: 7,
      label: 'Renovasi Rumah',
      value: 'Renovasi Rumah',
    },
  ]);

  const [itemGender] = useState([
    {
      id: 1,
      label: 'Pria',
      value: 'pria',
    },
    {
      id: 2,
      label: 'Wanita',
      value: 'wanita',
    },
  ]);

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.category,
          category: form.category,
          rate: 0,
          university: form.university,
          str_number: form.str_number,
          hospital_address: form.hospital_address,
          gender: form.gender,
          email: form.email,
          uid: success.user.uid,
          token:token
        };

        Fire.database()
          .ref(`ourstaffs/${success.user.uid}/`)
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Nama Lengkap"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Kategori"
            value={form.category}
            onValueChange={value => setForm('category', value)}
            select
            selectItem={itemCategory}
          />
          <Gap height={24} />
          <Input
            label="Universitas"
            value={form.university}
            onChangeText={value => setForm('university', value)}
          />
          <Gap height={24} />
          <Input
            label="Nomor STR"
            value={form.str_number}
            onChangeText={value => setForm('str_number', value)}
          />
          <Gap height={24} />
          <Input
            label="Alamat Praktik"
            value={form.hospital_address}
            onChangeText={value => setForm('hospital_address', value)}
          />
          <Gap height={24} />
          <Input
            label="Jenis Kelamin"
            value={form.gender}
            onValueChange={value => setForm('gender', value)}
            select
            selectItem={itemGender}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Selanjutnya" onPress={onContinue} />
          <Gap height={40} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {paddingHorizontal: 40, flex: 1},
});
