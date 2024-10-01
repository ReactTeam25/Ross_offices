import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Modal, Dimensions,Platform } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Addblue from '../../assest/svg/Addblue.svg';
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import Button from '../../helper/Button';
import Radiotruebtn from '../../assest/svg/Radiotruebtn.svg';
import Radiobutton from '../../assest/svg/Radiobutton.svg'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setGetdoc, setProfileData, setselectlanguage } from '../../redux/index';
import ApiDataService from '../../services/Apiservice.service'
import Toast from 'react-native-simple-toast';
import Message from '../../assest/svg/Message.svg';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import Immigration from './Components/Immigration';
import Tax from './Components/Tax';
import Loan from './Components/Loan';
import Trips from './Components/Trips';
import Passport from './Components/Passport';
import Other from './Components/Other';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const methodofpayment = [
	{
		id: 1,
		name: "Online",
		namees: "En línea"
	},
	{
		id: 2,
		name: "Offline",
		namees: "Desconectado"

	}
]
const Yourdetail = (props) => {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const [imagelistsh , setimagelistsh]=useState([]);
	console.log('imagelistsh-------------',imagelistsh);
	const [filterdata,setfilterdata] = useState([])
	
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
	const GetdocReducer = useSelector(state => state.GetdocReducer.data);
	const ProfileReducer = useSelector(state => state.ProfileReducer.data);
	console.log('GetdocReducer______________',GetdocReducer);

	

	useEffect(() => {
		const data = GetdocReducer?.filter(item => item.uploaded_by == 'USER')
		setfilterdata(data)
	  }, [GetdocReducer])

	const androidVersion = DeviceInfo.getSystemVersion()

	const [paymentmodal, setpaymentmodal] = useState(false)
	const [methodid, setmethodid] = useState('')

	const selectmethodfunc = (id) => {
		setmethodid(id)
	}

	useEffect(()=>{
		console.log('__________1________',GetdocReducer?.document);
		
		if(GetdocReducer && GetdocReducer?.document?.length > 0){
			var newdata = [];
			let filename = GetdocReducer?.file_name?.split(",")
			// let filename = JSON.parse(GetdocReducer?.file_name)

			console.log('filename-----------',filename);
			
			for(let i =0;i < GetdocReducer?.document.length;i++ ){
				console.log('filename_________',filename);
				newdata.push({
					name:filename[i],
					url:GetdocReducer?.document[i]
				})
			}
			setimagelistsh(newdata);
		}
	},[GetdocReducer?.document])

	useEffect(() => {
		dispatch(setGetdoc(props.booking_id))
		dispatch(setProfileData(SelectlanguageReducer))
	}, [props.booking_id]);

	const uploadingdoc = async () => {
        try {
            if (Platform.OS == 'ios') {
                adddocnewfunc()
            } else {
                let granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: t('File manager permission'),
                        message: t('Ross Offices needs file manager permission'),
                    },
                );

                if (androidVersion > 12) {
                    granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        {
                            title: t('File manager permission'),
                            message: t('Ross Offices needs file manager permission'),
                        },
                    );
                }
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    adddocnewfunc()
                } else {
                    console.log('Gallery permission denied');
                }
            }

        } catch (error) {
            console.log('Error picking video from gallery:', error);
        }
    };

    const adddocnewfunc = async () => {
        const Doc = await DocumentPicker.pick({
			type: [DocumentPicker.types.allFiles],
		});
		console.log('audio-----1111---', Doc);
		if (Doc && Doc.length > 0) {
			const document = {
				name: Doc[0].name, type: Doc[0].type, uri: Doc[0].uri
			}
			console.log('document_________________', document);

			uploaddoc(document)
		} else {
		}
    }

	const uploaddoc = (doc) => {
		console.log('doc--11---', doc);
		let formData = new FormData();
		formData.append('bookingId', props.booking_id);
		formData.append('documents', doc);
		console.log('response------formData----->', formData);
		let url = `booking/documents`
		console.log('url-----', url);
		ApiDataService.PostHeaderapi(url, formData)
			.then(response => {
				console.log('response------upload----->', response);
				if (response.status == 200) {
					dispatch(setGetdoc(props.booking_id))
					calltoastmessage(response.data.message);
				}
			})
			.catch(e => {
				console.log('error------>', e);
			});
	}

	const deletedoc = (id) => {
		let url = `booking/document?document_id=${id}`
		console.log('url-----', url);
		ApiDataService.DeleteTokenapi(url)
			.then(response => {
				console.log('response------delte___upload----->', response);
				if (response.status == 200) {
					dispatch(setGetdoc(props.booking_id))
					calltoastmessage(response.data.message);
				}
			})
			.catch(e => {
				console.log('error------>', e);
			});
	}


	const calltoastmessage = data => {
		Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
	};

	const updatestatusfunc = () => {
		let body = {
			payment_mode: methodid == 1 ? 'ONLINE' : 'OFFLINE',
			bookingId: props.booking_id
		}
		console.log('body-----', body);

		let url = `booking/payment`
		console.log('url-----', url);
		ApiDataService.PostHeaderapi(url, body)
			.then(response => {
				console.log('response------booking----->', response);
				if (response.status == 201) {
					navigationfunc()
				}
			})
			.catch(e => {
				console.log('error------>', e);
			});
	}

	const navigationfunc = () => {
		if (methodid == 1) {
			props.navigation.navigate('Paymentscreen', { bookingId: props.booking_id, price: props.bookingdetail.payable_amount })
		} else {
			props.navigation.navigate('Successfull', { type: 1 })
		}
	}

	return (
		<View style={{ ...StylesGloble.container, }}>
			<View style={StylesGloble.marginscreen}>
				<FlatList
					style={{ marginBottom: '10%' }}
					data={[{ name: 'gana' }]}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<>
							{
								props.type == 1 ? (
									<Immigration navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : props.type == 2 ? (
									<Tax navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : props.type == 3 ? (
									<Loan navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : props.type == 4 ? (
									<Trips navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : props.type == 5 ? (
									<Passport navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : props.type == 6 ? (
									<Other navigation={props.navigation} bookingdetail={props.bookingdetail}/>
								) : null
							}

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
												marginTop: 10, paddingRight: 10, width: width - 40
											}}>
											<View style={{ flexDirection: "row" }}>
												<Docment />
												<Text
													style={{
														fontSize: 12,
														fontWeight: '600',
														color: '#000000', marginLeft: 20, alignSelf: "center", width: "65%"
													}}>
													{item?.file_name}
												</Text>


											</View>
											<TouchableOpacity onPress={() => deletedoc(item?.id)} style={{}}>
												<Deletedoc />
											</TouchableOpacity>

										</View>

									</>
								)}
							/>
							<TouchableOpacity
								style={{
									borderColor: '#9846D7',
									borderWidth: 1,
									borderRadius: 5,
									flexDirection: 'row',
									alignItems: 'center',
									width: 129,
									justifyContent: 'space-evenly',
									height: 30,
									marginTop: 30,
								}} onPress={() => uploadingdoc()}>
								<Addblue />
								<Text
									style={{ fontSize: 12, fontWeight: '500', color: '#9846D7' }}>
									{t('Add Document')}
								</Text>
							</TouchableOpacity>
						</>
					)}
				/>

			</View>
			{
				props.bookingdetail.booking_status == 'In-Progress' ? <TouchableOpacity style={{ backgroundColor: "#9846D7", position: "absolute", bottom: 100, alignSelf: "flex-end", borderRadius: 10,right:15}} onPress={() => props.navigation.navigate('BookingchatScreen', { user_id: ProfileReducer.id, admin_id: ProfileReducer?.admin?.id, admin_name: ProfileReducer?.admin?.full_name, bookingId: props.booking_id })}>
					<Message />
				</TouchableOpacity> : null
			}
			{
				props.bookingdetail.payable_amount != null ? (
					<View style={{ margin: 20, position: "absolute", bottom: 10, width: "90%" }}>
						<Button label={t(`Pay $${props.bookingdetail.payable_amount}`)} onPress={() => setpaymentmodal(true)} />
					</View>
				) : null
			}
			<Modal animationType="slide" transparent={true} visible={paymentmodal} style={{
				justifyContent: "center",
				alignSelf: "center"
			}}>
				<View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
					<TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => setpaymentmodal(false)}>
					</TouchableOpacity>
					<View style={{ position: 'absolute', left: 0, width: '85%', borderRadius: 16, height: '22%', backgroundColor: 'white', alignSelf: "center", marginTop: '67%', left: 30, right: 30 }}>
						<View style={{ width: '100%', height: '100%', position: "absolute", padding: 25 }}>
							<Text style={{ fontSize: 20, color: "#000000", fontWeight: "600", textAlign: "center" }}>{t('Payment Mode')}</Text>
							<View style={{ marginTop: 20 }}>
								<FlatList
									data={methodofpayment}
									numColumns={2}
									keyExtractor={(item, index) => index}
									showsVerticalScrollIndicator={false}
									renderItem={({ item }) => (
										<>
											<TouchableOpacity style={{ flexDirection: "row", width: "75%" }} onPress={() => selectmethodfunc(item.id)}>
												<View>
													{
														item.id == methodid ? (
															<Radiotruebtn />
														) : (
															<Radiobutton />
														)
													}

												</View>
												<View style={{ alignSelf: "center", marginLeft: 5 }}>
													<Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
												</View>

											</TouchableOpacity>
										</>


									)}
								/>
							</View>
							<View style={{ flexDirection: "row", justifyContent: 'space-between', paddingBottom: 20, marginTop: 30 }}>
								<TouchableOpacity style={{
									borderWidth: 1, borderColor: '#888888', backgroundColor: '#ffffff', borderRadius: 8,
									height: 39,
									padding: 8,
									width: 130,
								}} >
									<Text style={{ ...StylesGloble.font14500black, color: "#888888", textAlign: "center" }}>{t('Cancel')}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => { setpaymentmodal(false); updatestatusfunc() }}>
									<LinearGradient
										colors={['#9846D7', '#C490F0']}
										style={{
											borderRadius: 8,
											height: 39,
											padding: 8,
											width: 130,
										}}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: '600',
												color: '#FFFFFF',
												textAlign: 'center',
											}}>
											{t('Next')}
										</Text>
									</LinearGradient>
								</TouchableOpacity>


							</View>
						</View>
					</View>

				</View>
			</Modal>
		</View>
	);
};
export default Yourdetail;