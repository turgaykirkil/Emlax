/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ufeHesapla from './src/yiUfe.json';

const year = ['2016', '2017', '2018', '2019', '2020', '2021', '2022'];
const month = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [faiz, setFaiz] = useState();
  const [alimFiyat, setAlimFiyat] = useState();
  const [satisFiyat, setSatisFiyat] = useState();
  const [alimYil, setAlimYil] = useState();
  const [alimAy, setAlimAy] = useState();
  const [satimYil, setSatimYil] = useState();
  const [satimAy, setSatimAy] = useState();

  const hesapla = () => {
    if (
      !alimAy ||
      !alimYil ||
      !satimYil ||
      !satimAy ||
      !alimFiyat ||
      !satisFiyat
    ) {
      return Alert.alert(
        'Hata',
        'Lütfen ilgili alanlara bilgilerinizi giriniz',
      );
    }

    const ufe1 = ufeHesapla[alimYil][alimAy];
    const ufe2 = ufeHesapla[satimYil][satimAy];
    const hesap =
      satisFiyat - alimFiyat * (ufe2 / ufe1) - 19000 - satisFiyat * (2 / 100);
    console.log(hesap);

    if (hesap < 32000 && hesap > 0) {
      console.log(hesap * (15 / 100));
    } else if (hesap > 32000 && hesap < 70000) {
      console.log(31999 * (15 / 100) + (hesap - 32000) * (20 / 100));
    } else if (hesap < 170000 && hesap > 70000) {
      console.log(
        31999 * (15 / 100) + 69999 * (20 / 100) + (hesap - 70000) * (27 / 100),
      );
    } else if (hesap < 880000 && hesap > 170000) {
      console.log(
        31999 * (15 / 100) +
          69999 * (20 / 100) +
          169999 * (27 / 100) +
          (hesap - 880000) * (35 / 100),
      );
    } else if (hesap > 880000) {
      console.log(
        31999 * (15 / 100) +
          69999 * (20 / 100) +
          169999 * (27 / 100) +
          879999 * (35 / 100) +
          (hesap - 880000) * (35 / 100),
      );
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Ödenecek Vergi Tutarı</Text>
                <Text style={styles.modalText}> {satisFiyat} </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Kapat</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.alimTarih}>
          <Text>Evin Alındığı Tarih</Text>
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <SelectDropdown
              data={year}
              buttonStyle={styles.dropdown}
              defaultButtonText={'Lütfen yıl seçiniz.'}
              onSelect={(selectedItem, index) => {
                setAlimYil(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <SelectDropdown
              data={month}
              buttonStyle={styles.dropdown}
              defaultButtonText={'Lütfen ay seçiniz.'}
              onSelect={(selectedItem, index) => {
                setAlimAy(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <View>
          <Text>Evin Satıldığı Tarih</Text>
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <SelectDropdown
              data={year}
              buttonStyle={styles.dropdown}
              defaultButtonText={'Lütfen yıl seçiniz.'}
              onSelect={(selectedItem, index) => {
                setSatimYil(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <SelectDropdown
              data={month}
              buttonStyle={styles.dropdown}
              defaultButtonText={'Lütfen ay seçiniz.'}
              onSelect={(selectedItem, index) => {
                setSatimAy(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <View>
          <Text>Ev İçin Ödenen Faiz</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="decimal-pad"
            onChangeText={setFaiz}
            value={faiz}
          />
        </View>
        <View>
          <Text>Evin Alış Fiyatı</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="decimal-pad"
            onChangeText={setAlimFiyat}
            value={alimFiyat}
          />
        </View>
        <View>
          <Text>Evin Satış Fiyatı</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="decimal-pad"
            onChangeText={setSatisFiyat}
            value={satisFiyat}
          />
        </View>
        <Pressable style={[styles.button, styles.buttonOpen]} onPress={hesapla}>
          <Text style={styles.textStyle}>Hesapla</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alimTarih: {
    marginRight: 5,
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
  },
  textInput: {
    margin: 5,
    padding: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#00008b',
  },
  buttonClose: {
    backgroundColor: '#082567',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
