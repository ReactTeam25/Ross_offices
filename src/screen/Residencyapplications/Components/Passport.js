import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Modal, Dimensions, Platform } from 'react-native';
import { StylesGloble } from '../../../helper/GlobleCss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setselectlanguage } from '../../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../../language/i18';

const Passport = (props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    return (
        <View >
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
                            {t('Details')}
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
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Consular Service Request')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.consular_service_request}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Application date')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.application_date}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('General data')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Surname')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.surname}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Second surname')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.second_surname}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('First name')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.first_name}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Second name')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.second_name}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Son of: Father')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.son_of_father}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Mother')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.mother}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Height(cm)')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.height}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Civil status')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.civil_status}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Sex')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.sex}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Eye Color')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.eye_color}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Skin color')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.skin_color}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Hair color')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.hair_color}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Immigration Classification when leaving Cuba')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.immigration_classification}
                        </Text>
                    </View><View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Departure date')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.departure_date}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Place of birth')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Country')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.country}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Province')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.province}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Municipality/City')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.municipality_city}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Date of Birth')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.date_of_birth}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Current Place of Residence')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={{ ...StylesGloble.font14500g6D6D6D, width: "50%" }}>{t('Address (Street, Ave, Nr., Apartment, streets)')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600', width: "40%", textAlign: "right"
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_address}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t("Postal Code")}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_postal_code}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Province – State – Region')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_province_state_region}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Country')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_country}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Phone')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_phone}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Fax')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_fax}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('E-mail')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cp_email}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Current Work or Study Data')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Name of Work/Study Center')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.name_of_work_or_study_center}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Profession')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.profession}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Occupation')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.occupation}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={{ ...StylesGloble.font14500g6D6D6D, width: "50%" }}>{t('Address (street, ave, nr., apartment, streets)')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600', width: "45%", textAlign: "right"
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_address}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Postal Code')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_postal_code}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Province – State – Region')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_province_state_region}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Country')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_country}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Phone')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_phone}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Fax')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_fax}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('E-mail')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.cw_email}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Education level')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.education_level}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Name and surname of the reference in Cuba')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Number')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.name_surname_in_cuba}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Reference Address')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.reference_address}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Place of Residence in Cuba (last two addresses)')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Address 1')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.address_one}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('From')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.from_one}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Until')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.until_one}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Address 2')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.address_two}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('From')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.from_two}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Until')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.until_two}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Maiden surnames')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.maiden_surnames}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Other names')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.other_names}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Residence number')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.residence_number}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Foreign passport')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.foreign_passport}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Expired passport')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Number')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.expired_passport_number}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Expedition date')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.expedition_date}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Place')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.place}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Birth Certificate')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Took')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.took}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Invoice')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.invoice}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Civil registration')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.civil_registration}
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                ...StylesGloble.font16600black,
                                fontWeight: '700', alignSelf: "center"
                            }}>
                            {t('Consular Registration')}
                        </Text>
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
                            marginTop: 0,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Number')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.consular_reg_number}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Of date')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.of_date}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Tariff')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.tariff}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t("Consular Assessment")}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.passportDetails?.consular_assessment}
                        </Text>
                    </View>


                </View>
            </View>
        </View>
    );
};
export default Passport;