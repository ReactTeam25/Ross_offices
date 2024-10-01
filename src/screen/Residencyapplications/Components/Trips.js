import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Modal, Dimensions, Platform } from 'react-native';
import { StylesGloble } from '../../../helper/GlobleCss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setselectlanguage } from '../../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../../language/i18';

const Trips = (props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    return (
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
													<Text style={StylesGloble.font14500g6D6D6D}>Last Name</Text>
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
													<Text style={StylesGloble.font14500g6D6D6D}>Total Number of Adults</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.no_of_adult}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Total Number of Children</Text>
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
													<Text style={StylesGloble.font14500g6D6D6D}>Start Location</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.start_location}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Destination</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.destination}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Travel Date</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{moment(props.bookingdetail?.bookingDetails?.travel_date).format('ll')}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between',
														marginTop: 10,
													}}>
													<Text style={StylesGloble.font14500g6D6D6D}>Desired Trip Amount</Text>
													<Text
														style={{
															...StylesGloble.fon14700b000000,
															fontWeight: '600',
														}}>
														{props.bookingdetail?.bookingDetails?.desired_trip_amount}
													</Text>
												</View>
											</View>
										</View>
    );
};
export default Trips;