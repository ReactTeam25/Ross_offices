import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
} from 'react-native';
import { StylesGloble } from '../helper/GlobleCss';
import Imagepath from '../constant/Imagepath';

const Servicescard = ({ navigation, data, type,getpassportcheckremains }) => {

    return (
        <View>
            {
                type == 1 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Immigrationform', { service_id: data.id })} style={{marginBottom:20}}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D1D1',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 15,
                                marginTop: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
                                    source={Imagepath.UserPermit}

                                />
                                <View style={{ marginLeft: 10,alignSelf:"center" }}>
                                    <Text style={StylesGloble.font16600black}>
                                        {data.service_name}
                                    </Text>
                                  
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 12,
                                }}
                            />
                            {
                                data.service_docs ? (
                                    <FlatList
                                        keyExtractor={(item, index) => index}
                                        style={{
                                            width: "100%", marginBottom: 0,
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={data.service_docs}
                                        renderItem={({ item }) => <>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#6D6D6D',
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </>} />
                                ) : null
                            }
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 10,
                                }}
                            />
                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                {data.service_description}
                            </Text>

                            {/* <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '700',
                                        color: '#5D5D5D',
                                    }}>
                                    Price -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '700',
                                        color: '#9846D7',
                                    }}> ${data.price}
                                </Text>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                ) : type == 2 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TaxForm', { service_id: data.id })}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D1D1',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 15,
                                marginTop: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
                                    source={Imagepath.UserPermit}

                                />
                                <View style={{ marginLeft: 10,alignSelf:"center" }}>
                                    <Text style={StylesGloble.font16600black}>
                                        {data.service_name}
                                    </Text>
                                  
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 12,
                                }}
                            />
                            {
                                data.service_docs ? (
                                    <FlatList
                                        keyExtractor={(item, index) => index}
                                        style={{
                                            width: "100%", marginBottom: 0,
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={data.service_docs}
                                        renderItem={({ item }) => <>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#6D6D6D',
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </>} />
                                ) : null
                            }
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 10,
                                }}
                            />
                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                {data.service_description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : type == 3 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoanFrom', { service_id: data.id })}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D1D1',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 15,
                                marginTop: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
                                    source={Imagepath.UserPermit}

                                />
                               <View style={{ marginLeft: 10,alignSelf:"center" }}>
                                    <Text style={StylesGloble.font16600black}>
                                        {data.service_name}
                                    </Text>
                                  
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 12,
                                }}
                            />
                            {
                                data.service_docs ? (
                                    <FlatList
                                        keyExtractor={(item, index) => index}
                                        style={{
                                            width: "100%", marginBottom: 0,
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={data.service_docs}
                                        renderItem={({ item }) => <>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#6D6D6D',
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </>} />
                                ) : null
                            }
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 10,
                                }}
                            />
                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                {data.service_description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : type == 4 ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TravelBooking', { service_id: data.id })}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D1D1',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 15,
                                marginTop: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
                                    source={Imagepath.UserPermit}

                                />
                               <View style={{ marginLeft: 10,alignSelf:"center" }}>
                                    <Text style={StylesGloble.font16600black}>
                                        {data.service_name}
                                    </Text>
                                  
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 12,
                                }}
                            />
                            {
                                data.service_docs ? (
                                    <FlatList
                                        keyExtractor={(item, index) => index}
                                        style={{
                                            width: "100%", marginBottom: 0,
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={data.service_docs}
                                        renderItem={({ item }) => <>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#6D6D6D',
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </>} />
                                ) : null
                            }
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 10,
                                }}
                            />
                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                {data.service_description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => getpassportcheckremains(data.id)}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D1D1',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 15,
                                marginTop: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
                                    source={Imagepath.UserPermit}

                                />
                                <View style={{ marginLeft: 10,alignSelf:"center" }}>
                                    <Text style={StylesGloble.font16600black}>
                                        {data.service_name}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 12,
                                }}
                            />
                            {
                                data.service_docs ? (
                                    <FlatList
                                        keyExtractor={(item, index) => index}
                                        style={{
                                            width: "100%", marginBottom: 0,
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={data.service_docs}
                                        renderItem={({ item }) => <>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#6D6D6D',
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </>} />
                                ) : null
                            }
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#D1D1D1',
                                    marginTop: 10,
                                }}
                            />
                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                {data.service_description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    textper: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
    },
    namestyl: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
    },
    textheadig: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
        lineHeight: 19,
    },
});

export default Servicescard;
