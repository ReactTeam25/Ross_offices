import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Modal,Platform } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import DescripionBox from '../../assest/svg/DescripionBox.svg';
import Imagepath from '../../constant/Imagepath';
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


const methodofpayment = [
	{
		id: 1,
		name: "Online"
	},
	{
		id: 2,
		name: "Offline"
	}
]
const Yourdetail = (props) => {
	console.log('props-------', props);

	const androidVersion = DeviceInfo.getSystemVersion()

	const [paymentmodal, setpaymentmodal] = useState(false)
	const [methodid, setmethodid] = useState('')

	const selectmethodfunc = (id) => {
		setmethodid(id)
	}

	const uploadingdoc = async () => {
		try {
			let granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				{
					title: 'File manager permission',
					message: 'Ross Offices needs file manager permission',
				},
			);

			if (androidVersion > 12) {
				granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
					{
						title: 'File manager permission',
						message: 'Ross Offices needs File manager permission',
					},
				);
			}
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				const Doc = await DocumentPicker.pick({
					type: [DocumentPicker.types.allFiles],
				});
				console.log('audio-----1111---', Doc);
				if (Doc && Doc.length > 0) {
					const document = {
						name: Doc[0].name, type: Doc[0].type, uri: Doc[0].uri
					}
					props.uploaddoc([document])
				} else {
				}
			} else {
				console.log('Gallery permission denied');
			}
		} catch (error) {
			console.log('Error picking video from gallery:', error);
		}
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
								props.type == 1 ? (
									<>
										<View
											style={{
												borderWidth: 1,
												borderColor: '#D1D1D1',
												borderRadius: 10,
												backgroundColor: '#FFFFFF',
												marginTop: 25,
												padding: 15
											}}>
											<View style={{}}>
												<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
													<Text
														style={{
															...StylesGloble.font16600black,
															fontWeight: '700', alignSelf: "center"
														}}>
														Details
													</Text>
													{
														props.bookingdetail.booking_status == 'In-Progress' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == "Pending" ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == 'Completed' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#039B00", fontWeight: "500", backgroundColor: "#039B0030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == 'Rejected' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "500", backgroundColor: "#FF000030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : null
													}
												</View>

												<View
													style={{
														borderBottomWidth: 1,
														borderBottomColor: '#D1D1D1',
														marginTop: 15, marginBottom: 15
													}}
												/>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Mode</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.mode}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>First name</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.first_name}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Middle name</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.middle_name}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Last name</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.last_name}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Date of birth</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{moment(props.bookingdetail?.bookingDetails?.date_of_birth).format('ll')}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Place of birth</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.birth_city}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Country</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.country}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Nationality</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.nationality}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Alien Registration Number</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.alien_registration}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Social Security Number (SSN)</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.ssn}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Social Security Number (SSN)</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.ssn}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Gender</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.sex}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Marital Status</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.marital_status}
													</Text>
												</View>
											</View>
										</View>
										<View
											style={{
												borderWidth: 1,
												borderColor: '#D1D1D1',
												borderRadius: 10,
												backgroundColor: '#FFFFFF',
												marginTop: 25,
												padding: 15
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
															Permanent Address
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
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Mailing Address</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_mailing_address}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Street and Number</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_street_number}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Apartment or Unit</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_apartment}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>City</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_city}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>State</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_state}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Zip Code</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.permanent_zip_code}
													</Text>
												</View>
											</View>
										</View>
										<View
											style={{
												borderWidth: 1,
												borderColor: '#D1D1D1',
												borderRadius: 10,
												backgroundColor: '#FFFFFF',
												marginTop: 25,
												padding: 15
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
															Current Address
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
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Mailing Address</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_mailing_address}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Street and Number</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_street_number}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Apartment or Unit</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_apartment}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>City</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_city}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>State</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_state}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between', marginTop: 10
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Zip Code</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.current_zip_code}
													</Text>
												</View>
											</View>
										</View>
									</>
								) : props.type == 2 ? (
									<>
										<View
											style={{
												borderWidth: 1,
												borderColor: '#D1D1D1',
												borderRadius: 10,
												backgroundColor: '#FFFFFF',
												marginTop: 25,
												padding: 15
											}}>
											<View style={{}}>
												<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
													<Text
														style={{
															...StylesGloble.font16600black,
															fontWeight: '700', alignSelf: "center"
														}}>
														Details
													</Text>
													{
														props.bookingdetail.booking_status == 'In-Progress' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == "Pending" ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == 'Completed' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#039B00", fontWeight: "500", backgroundColor: "#039B0030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : props.bookingdetail.booking_status == 'Rejected' ? (
															<View style={{ alignSelf: "center" }}>
																<Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "500", backgroundColor: "#FF000030", padding: 5, borderRadius: 25 }}>
																	{props.bookingdetail.booking_status}
																</Text>
															</View>
														) : null
													}
												</View>

												<View
													style={{
														borderBottomWidth: 1,
														borderBottomColor: '#D1D1D1',
														marginTop: 15, marginBottom: 15
													}}
												/>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Mode</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.mode}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Full name</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.full_name}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Email Address</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.email}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Phone Number</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.phone}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Preferred Appointment Date</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{moment(props.bookingdetail?.bookingDetails?.preferred_appointment_date).format('ll')}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Preferred Appointment Time</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.preferred_appointment_time}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Type of Tax Declaration</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.type_of_tax_declaration}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Additional Notes or Documents</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.additional_notes}
													</Text>
												</View>
											</View>
										</View>
										<>
											<View style={{ marginTop: 20 }}>
												<Text style={StylesGloble.font20700000000}>
													Uploaded {props?.bookingdetail?.bookingDocuments?.length} files
												</Text>
											</View>

											<FlatList
												style={{ marginTop: 0 }}
												data={props?.bookingdetail?.bookingDocuments}
												keyExtractor={(item, index) => index}
												showsVerticalScrollIndicator={false}
												renderItem={({ item }) => (
													<>
														{
															item.uploaded_by == 'USER' ? (
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
																	<TouchableOpacity onPress={() => props.submitfunc(item.id)}>
																		<Deletedoc />
																	</TouchableOpacity>

																</View>
															) : null
														}

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
													Add Document
												</Text>
											</TouchableOpacity>
										</>
									</>
								) : null
							}
							{
								props.bookingdetail.booking_status == 'Completed' ? (
									<View style={{ marginTop: 20 }}>
										<Button label={'Pay 100$'} onPress={() => setpaymentmodal(true)} />
									</View>
								) : null
							}

						</>
					)}
				/>
			</View>
			<Modal animationType="slide" transparent={true} visible={paymentmodal} style={{
				justifyContent: "center",
				alignSelf: "center"
			}}>
				<View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
					<TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => setpaymentmodal(false)}>
					</TouchableOpacity>
					<View style={{ position: 'absolute', left: 0, width: '85%', borderRadius: 16, height: '22%', backgroundColor: 'white', alignSelf: "center", marginTop: '67%', left: 30, right: 30 }}>
						<View style={{ width: '100%', height: '100%', position: "absolute", padding: 25 }}>
							<Text style={{ fontSize: 20, color: "#000000", fontWeight: "600", textAlign: "center" }}>Payment Mode</Text>
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
														{item.name}
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
									<Text style={{ ...StylesGloble.font14500black, color: "#888888", textAlign: "center" }}>Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => { setpaymentmodal(false); props.navigation.navigate('Successfull', { type: 1 }) }}>
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
											Next
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
