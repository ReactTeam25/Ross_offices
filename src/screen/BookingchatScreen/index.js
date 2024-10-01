import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import Iconlyarrow from '../../assest/svg/Iconlyarrow.svg';
import GirlIcon from '../../assest/svg/GirlIcon.svg';
import Smallcircle from '../../assest/svg/Smallcircle.svg';
import Link from '../../assest/svg/Link.svg';
import BlueGone from '../../assest/svg/BlueGone.svg';
import firestore from '@react-native-firebase/firestore';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import Uploadimage from '../../helper/Uploadimage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Chatpin from '../../assest/svg/Chatpin.svg';
import Sent from '../../assest/svg/Sent.svg'
import { setselectlanguage } from '../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useDispatch, useSelector } from 'react-redux';
import ApiDataService from '../../services/Apiservice.service'
import { useSafeArea } from 'react-native-safe-area-context';


const getchatroom = (userid, strangerid, bookingId) => {
	var chtrm = '1Chats' + userid + 'booking' + bookingId
	return chtrm;
}
const BookingchatScreen = ({ navigation, route }) => {
	const insets = useSafeArea();

	const admin_id = route?.params?.admin_id
	const user_id = route?.params?.user_id
	const full_name = route?.params?.full_name
	const bookingId = route?.params?.bookingId
	const [inputText, setInputText] = useState('');
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

	const [imageuploadmodal, setimageuploadmodal] = useState(false)
	const [messageslist, setMessageslist] = useState([]);
	const getfuncchat = () => {
		firestore()
			.collection('AllChat')
			.doc(getchatroom(user_id, admin_id, bookingId))
			.collection('message')
			.orderBy('createdAt', 'desc')
			.onSnapshot((querySnapshot) => {
				const allMessages = querySnapshot?.docs.map((item) => {
					return {
						...item._data,
						createdAt: Date.parse(new Date()),
					}
				});
				if (allMessages) {
					if (allMessages.length > messageslist.length) {
						setMessageslist(allMessages);
					}
				}
			})
	}

	const closeimagepopup = (type, image) => {
		if (type == 1) {
			setimageuploadmodal(false);
		}
		else if (type == 2) {
			sendimage(image.path);
			setimageuploadmodal(false);
		}
	}
	useEffect(() => {
		const subscriber = getfuncchat()
		return () => subscriber();
	}, []);
	const sendimage = (image) => {
		const myMessage = {
			text: '',
			message: '',
			createdAt: new Date(),
			user: { "_id": user_id },
			senderId: user_id,
			reciverId: admin_id,
			message_type: 2,
			image: image,
			createddate: Date.parse(new Date()),
			seen: false

		};
		setMessageslist((previousMessages) => GiftedChat.append(previousMessages, myMessage));
		firestore()
			.collection('AllChat')
			.doc(getchatroom(user_id, admin_id, bookingId))
			.collection('message')
			.add(myMessage);
	}
	const onSend = useCallback(
		(messages = []) => {
			const msg = messages ? messages[0] : '';
			const myMessage = {
				_id: msg?._id,
				createdAt: new Date(),
				text: msg?.text,
				user: { _id: user_id },
				senderId: user_id,
				reciverId: admin_id,
				createddate: Date.parse(msg?.createdAt),
				seen: false
			};
			setMessageslist((previousMessages) => GiftedChat.append(previousMessages, myMessage));
			firestore()
				.collection('AllChat')
				.doc(getchatroom(user_id, admin_id, bookingId))
				.collection('message')
				.add(myMessage);
			addsomechatindb(1, msg?.text)
		},
		[]
	);

	const addsomechatindb = async (type, message) => {

		let chtm = getchatroom(user_id, admin_id)
		let formdata = {
			"receiver": admin_id,
			"message": message,
			"chatRoomId": chtm,
			"bookingId": bookingId,
		}

		let url = 'chat/message'
		ApiDataService.PostTokenapi(url, formdata).then(response => {
		}).catch(e => {
			console.log('e---------', e);

		})
	}
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				flex: 1
			}}
		>
			<View style={StylesGloble.container}>
				<ImageBackground style={{ height: 80, width: '100%' }} source={Imagepath.Banganiblock}>
					<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop:20 }}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Iconlyarrow />
						</TouchableOpacity>
						<View style={{ marginLeft: 15 }}>
							<Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
								{t('Service Provider')}
							</Text>
						</View>
					</View>
				</ImageBackground>
				<GiftedChat
					messages={messageslist}
					onSend={messages => onSend(messages)}
					user={{
						_id: user_id,
					}}
					textInputStyle={{ borderRadius: 10, padding: 10, color: '#121212', borderWidth: 1, borderColor: "#D1D1D1", color: "#000000" }}
					alwaysShowSend
					placeholder={t('Write your message here')}
					onInputTextChanged={(text) => setInputText(text)}
					renderSend={props => {
						return (
							<View
								style={{ flexDirection: 'row', alignItems: 'center', height: 50, }}>
								<TouchableOpacity style={{ marginLeft: -30 }} onPress={() => setimageuploadmodal(true)}>
									<Chatpin />
								</TouchableOpacity>

								<Send {...props} containerStyle={{ justifyContent: 'center', marginRight: 10, marginLeft: 20 }}>
									<Sent />
								</Send>
							</View>

						);
					}}
					renderBubble={props => {
						return (
							<Bubble
								{...props}
								wrapperStyle={{
									left: {
										borderTopRightRadius: 20,
										borderTopLeftRadius: 20,
										borderBottomLeftRadius: 0, borderBottomRightRadius: 20,
										marginBottom: 10,
										marginLeft: -40,
										backgroundColor: "#9846D7",
									},
									right: {
										backgroundColor: '#F4EAFD',
										borderTopRightRadius: 20,
										borderTopLeftRadius: 20,
										borderBottomLeftRadius: 20, borderBottomRightRadius: 0,
										marginBottom: 10,
									},
								}}
								textStyle={{
									left: { color: '#ffffff', fontSize: 14, fontWeight: "400" },
									right: { color: '#3D115A', fontSize: 14, fontWeight: "400" }
								}}
								timeTextStyle={{
									left: { color: '#130324', fontSize: 10, fontWeight: "400", },
									right: { color: '#B0B0B0', fontSize: 10, fontWeight: "400" }
								}}
							/>
						);
					}}

					renderInputToolbar={props => (
						<InputToolbar
							{...props}
							containerStyle={{
								marginLeft: 10, marginRight: 10,
								marginTop: 10, marginBottom: 30,
								width: "95%", marginTop: 10, backgroundColor: 'transparent', borderColor: "transparent"
							}}
						/>
					)}
				/>


				{
					imageuploadmodal && (
						<Uploadimage closeimagepopup={closeimagepopup} width={wp('100%')} height={400} cropperCircleOverlay={false} />
					)
				}
			</View>
		</View>

	);
};

export default BookingchatScreen;
