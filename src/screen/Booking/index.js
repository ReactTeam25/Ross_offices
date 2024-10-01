import React, { useState, useEffect } from 'react';
import {
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
	FlatList,RefreshControl
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import OtherService from './OtherService';
import Passport from './Passport';
import Homeimmienable from '../../assest/svg/Homeimmienable.svg';
import Hometaxenable from '../../assest/svg/Hometaxenable.svg';
import HomeLoanenable from '../../assest/svg/HomeLoanenable.svg';
import Hometripenable from '../../assest/svg/Hometripenable.svg';
import Homepassenable from '../../assest/svg/Homepassenable.svg'
import Homeimmiactive from '../../assest/svg/Homeimmiactive.svg';
import Hometaxactive from '../../assest/svg/Hometaxactive.svg';
import HomeLoanactive from '../../assest/svg/HomeLoanactive.svg';
import Honetripsactive from '../../assest/svg/Honetripsactive.svg';
import HomepassActive from '../../assest/svg/HomepassActive.svg'
import Immigration from './Immigration';
import Tax from './Tax';
import Loan from './Loan';
import Trips from './Trips';
import Otherinactive from '../../assest/svg/Otherinactive.svg'
import Otheractive from '../../assest/svg/Otheractive.svg'
import Other from './Other';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData,setselectlanguage } from '../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const category = [
	{
		id: 1,
		name: "Immigration",
		namees:"Inmigración"
	},
	{
		id: 2,
		name: "Tax",
		namees:"Impuesto"
	},
	{
		id: 3,
		name: "Loan",
		namees:"Préstamo"

	},
	{
		id: 4,
		name: 'Trips',
		namees:"Viajes"

	},
	{
		id: 5,
		name: "Passport",
		namees:"Pasaporte"

	},
	{
		id: 6,
		name: 'Other',
		namees:"Otro"

	}
]

const Home = ({ navigation }) => {
    const insets = useSafeArea();

    const dispatch = useDispatch();
    const BookingReducer = useSelector(state => state.BookingReducer.data);
	console.log('BookingReducer_________',BookingReducer);
	

    const [passportlist, setpassportlist] = useState([])

    const { t, i18n } = useTranslation();

    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[SelectlanguageReducer])
	
	const [showskeleton, setshowskeleton] = useState(1)
	const [activetab, setactivetab] = useState(1);
	const [catid, setcatid] = useState('Immigration')
	console.log('catid---------',catid);
	useEffect(() => {
        dispatch(setBookingData(catid,SelectlanguageReducer));
		
    }, [catid]);

	useEffect(() => {
		setTimeout(() => {
			setshowskeleton(2)
		}, 2000)
	}, []);

	const selectcategoryfunc = (name) => {
		setcatid(name)
	}
	const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        try {
			dispatch(setBookingData(catid,SelectlanguageReducer));
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
        setRefreshing(false);
    };
	return (
		<View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
			<View style={{ ...StylesGloble.container, backgroundColor: '#FFFFFF' }}>
			{
				showskeleton == 1 ? (
					<View style={{ width: "100%", height: '80%', position: "relative", }}>
						<SkeletonPlaceholder borderRadius={4} >
							<SkeletonPlaceholder.Item style={{ width: '90%', height: 200, flexDirection: "row", marginTop: 20 }}>
								<SkeletonPlaceholder.Item marginLeft={'5%'} width={'65%'} height={40} alignSelf='flex-end' borderRadius={8} />
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
								<SkeletonPlaceholder.Item marginLeft={'5%'} width={'90%'} height={300} borderRadius={12} alignSelf='flex-end' />
							</SkeletonPlaceholder.Item>
							<SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
								<SkeletonPlaceholder.Item marginLeft={'5%'} width={'90%'} height={300} borderRadius={12} alignSelf='flex-end' />
							</SkeletonPlaceholder.Item>
						</SkeletonPlaceholder>
					</View>
				) : (
					<FlatList
						style={{ marginBottom: 30 }}
						data={[{ name: 'adgf' }]}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
							/>
						}
						renderItem={({ item }) => (
							<>
								<View style={StylesGloble.marginscreen}>
									<View style={{ marginTop: 20 }}>
										<Text style={{ ...StylesGloble.font20700000000, textAlign: "center" }}>{t('My Bookings')}</Text>
									</View>
									<FlatList
										data={category}
										horizontal={true}
										keyExtractor={(item, index) => index}
										showsHorizontalScrollIndicator={false}
										renderItem={({ item }) => (
											<TouchableOpacity style={{ marginHorizontal: 5, marginTop: 15 }} onPress={() => selectcategoryfunc(item.name)}>
												<View>
													{
														item.name == 'Immigration' ? (
															<>
																{
																	item.name == catid ? (
																		<Homeimmiactive />
																	) : (
																		<Homeimmienable />
																	)
																}
															</>

														) : item.name == 'Tax' ? (
															<>
																{
																	item.name == catid ? (
																		<Hometaxactive />
																	) : (
																		<Hometaxenable />
																	)
																}
															</>
														) : item.name == 'Loan' ? (
															<>
																{
																	item.name == catid ? (
																		<HomeLoanactive />
																	) : (
																		<HomeLoanenable />
																	)
																}
															</>
														) : item.name == 'Trips' ? (
															<>
																{
																	item.name == catid ? (
																		<Honetripsactive />
																	) : (
																		<Hometripenable />
																	)
																}
															</>
														) : item.name == 'Passport' ? (
															<>
																{
																	item.name == catid ? (
																		<HomepassActive />
																	) : (
																		<Homepassenable />
																	)
																}
															</>
														) :item.name == 'Other' ? (
															<>
																{
																	item.name == catid ? (
																		<Otheractive />
																	) : (
																		<Otherinactive />
																	)
																}
															</>
														) : null
													}

												</View>
												<View style={{ marginTop: 5 }}>
													<Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", color: item.name == catid ? "#9846D7" : "#000000" }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
												</View>

											</TouchableOpacity>
										)}
									/>
									{
										catid == 'Immigration' ? (
											<Immigration navigation={navigation} BookingReducer={BookingReducer}/>
										) : catid == 'Tax' ? (
											<Tax navigation={navigation} BookingReducer={BookingReducer}/>
										) : catid == 'Loan' ? (
											<Loan navigation={navigation} BookingReducer={BookingReducer}/>
										) : catid == 'Trips' ? (
											<Trips navigation={navigation} BookingReducer={BookingReducer}/>
										) : catid == 'Passport' ? (
											<Passport navigation={navigation} BookingReducer={BookingReducer}/>
										) :catid == 'Other' ? (
											<Other navigation={navigation} BookingReducer={BookingReducer}/>
										) : null
									}
								</View>
							</>
						)}
					/>
				)
			}

		</View>
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

export default Home;
