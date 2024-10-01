import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  PermissionsAndroid
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import DescripionBox from '../../assest/svg/DescripionBox.svg';
import Imagepath from '../../constant/Imagepath';
import Featuredicon from '../../assest/svg/Featuredicon.svg';
import PaperUpload from '../../assest/svg/PaperUpload.svg';
import LinearGradient from 'react-native-linear-gradient';
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import BlankScreen from '../../helper/BlankScreen';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';

const AdminUpdate = (props) => {
  const [filterdata, setfilterdata] = useState([])
  console.log('props?.bookingdetail---------------', props?.bookingdetail);
	const [imagelistsh , setimagelistsh]=useState([]);

  useEffect(() => {
    const data = props?.bookingdetail?.bookingDocuments?.filter(item => item.uploaded_by == 'ADMIN')
    setfilterdata(data)
  }, [props])

  const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: t('Storage Permission Required'),
          message: t('This app needs access to your storage to download files.'),
          buttonNeutral: t('Ask Me Later'),
          buttonNegative: t('Cancel'),
          buttonPositive: t('OK'),
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const downloadReceipt = async (doc, name) => {
    console.log('doc______________',doc);

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.log('Storage permission denied');
      return;
    }

    try {
      const receiptUrl = doc;

      const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${name}`;
      
      
      const options = {
        fromUrl: receiptUrl,
        toFile: destinationPath,
      };
      console.log('options______________',options);
      const response = await RNFS.downloadFile(options).promise;
      if (response.statusCode === 200) {
        calltoastmessage(t('Document downloaded successfully'));
      } else {
        console.log('Failed to download receipt:', response.statusCode, response);
      }
    } catch (error) {
      console.log('Error while downloading receipt:', error);
    }
  };
  const calltoastmessage = data => {
    Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
  };
  return (
    <View style={StylesGloble.container}>
      <View style={StylesGloble.marginscreen}>
        <FlatList
          style={{ marginBottom: '10%' }}
          data={[{ name: 'gana' }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              {
                props.bookingdetail?.admin_description != null || filterdata?.length > 0 ? (
                  <>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#D1D1D1',
                        borderRadius: 10,
                        backgroundColor: '#FFFFFF',
                        marginTop: 25, padding: 15
                      }}>
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Text
                              style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700',
                              }}>
                              {t('Description')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#D1D1D1',
                            marginTop: 15, marginBottom: 15
                          }}
                        />
                        <Text
                          style={{
                            ...StylesGloble.font14500g6D6D6D,
                          }}>
                          {props.bookingdetail?.admin_description}
                        </Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Text style={StylesGloble.font20700000000}>
                        {t('Uploaded')} {filterdata?.length} {t('files')}
                      </Text>
                    </View>

                    <FlatList
                      style={{ marginTop: 0 }}
                      data={filterdata}
                      keyExtractor={(item, index) => index}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 20,
                            }}>
                            <View style={{ flexDirection: "row" }}>
                              <Docment />
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '600',
                                  color: '#000000', marginLeft: 20, alignSelf: "center", width: "60%"
                                }}>
                                {item.file_name}
                              </Text>


                            </View>
                            <TouchableOpacity onPress={() => downloadReceipt(item.document, item.file_name)}>
                              <Image
                                style={{ height: 30, width: 30 }}
                                source={Imagepath.DownloadArrow}
                              />
                            </TouchableOpacity>

                          </View>
                        </>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <View style={{ justifyContent: "center", marginTop: "30%", alignSelf: "center" }}>
                      <BlankScreen />
                    </View>
                  </>
                )
              }

            </>
          )}
        />
      </View>

      
    </View>
  );
};

export default AdminUpdate;
