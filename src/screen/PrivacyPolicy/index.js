import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../helper/Header';
import { StylesGloble } from '../../helper/GlobleCss';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setselectlanguage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const insets = useSafeArea();

	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				flex: 1
			}}
		>
			<View>
				<Header name={t('Privacy Policy')} />
				<ScrollView style={{ ...StylesGloble.marginscreen, marginBottom: 100 }} showsVerticalScrollIndicator={false}>
					<View>
						<Text style={{ fontSize: 14, fontWeight: "500", color: "#666666" }}>
							{t("Last updated: September 3, 2024")}
						</Text>
					</View>
					<View style={{ marginTop: 7 }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							{t('At Ross Offices ("we", "our"), we value your privacy and are committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and protect your information when you use our application.')}
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("1. Information We Collect")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("We may collect the following information:")}
						</Text>
					</View>
					<View style={{ marginTop: 8 }}>
						<View style={{ marginLeft: 10, flexDirection: "row" }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t('Personal Information: Name, email address, phone number, and any other information you choose to provide.')}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Usage Data: Information about how you use our application, including browsing and usage data (e.g., time spent, features used).")}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Technical Information: IP address, device type, operating system, and other technical data related to your device.")}
							</Text>
						</View>

					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("2. How We Use Your Information")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("We use the information we collect to:")}
						</Text>
					</View>
					<View style={{ marginTop: 8 }}>
						<View style={{ marginLeft: 10, flexDirection: "row" }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t('Provide and maintain our application.')}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t('Improve, personalize, and expand our services.')}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Communicate with you about changes, updates, and new features of our application.")}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t('Process your requests and respond to your inquiries.')}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Monitor the usage of the application and detect technical issues.")}
							</Text>
						</View>

					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t('3. Disclosure of Your Information')}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("We may share your information in the following circumstances:")}
						</Text>
					</View>
					<View style={{ marginTop: 8 }}>
						<View style={{ marginLeft: 10, flexDirection: "row" }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Service Providers: We may engage third parties to assist with the operation of our application, who may have access to your information to perform specific tasks on our behalf.")}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
								{t("Legal Compliance: We may disclose your information if required by law or in response to legal requests from public authorities.")}
							</Text>
						</View>

					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("4. Security of Your Information")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("We take reasonable measures to protect your personal information. However, please be aware that no data transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee the absolute security of your information.")}
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("5. Your Rights")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your information. If you wish to exercise these rights, please contact us using the information below.")}
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("6. Changes to This Privacy Policy")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. It is recommended to review this Privacy Policy periodically to stay informed about how we are protecting your information.")}
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
							{t("7. Contact")}
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
							{t("If you have any questions or concerns about this Privacy Policy, please contact us at:")}
						</Text>
					</View>

					<View style={{ marginTop: 8 }}>
						<View style={{ marginLeft: 10, flexDirection: "row" }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 13, fontWeight: "500", color: "#000000", marginLeft: 5 }}>
								{t("Company Name: Ross Offices")}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 13, fontWeight: "500", color: "#000000", marginLeft: 5 }}>
								{t("Email: contact@rossoffices.com")}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
							<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
								-
							</Text>
							<Text style={{ fontSize: 13, fontWeight: "500", color: "#000000", marginLeft: 5 }}>
								{t("Phone: 806-934-2018")}
							</Text>
						</View>

					</View>



				</ScrollView>
			</View>
		</View>

	);
};

export default PrivacyPolicy;
