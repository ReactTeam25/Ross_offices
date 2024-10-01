import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../helper/Header';
import { StylesGloble } from '../../helper/GlobleCss';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const HelpandSupport = () => {
	const dispatch = useDispatch();
const insets = useSafeArea();

	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [SelectlanguageReducer])
	return (
		<View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
<View>
			<Header name={t('Help & Support')} />

			<ScrollView style={{ ...StylesGloble.marginscreen, marginBottom: 100 }} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={{ fontSize: 14, fontWeight: "500", color: "#666666" }}>
						{t("Welcome to Ross Offices Help & Support")}
					</Text>
				</View>
				<View style={{ marginTop: 7 }}>
					<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
						{t("At Ross Offices, we are committed to providing you with the best possible experience. If you have any questions, concerns, or need assistance, you can reach out to us through the following channels:")}
					</Text>
				</View>
				<View style={{ marginTop: 15 }}>
					<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
						{t("1. Frequently Asked Questions (FAQs)")}
					</Text>
				</View>
				<View style={{ marginTop: 5 }}>
					<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
						{t("Before reaching out to us, you may find the answer to your question in our FAQs. Here are some common topics:")}
					</Text>
				</View>
				<View style={{ marginTop: 8 }}>
					<View style={{ marginLeft: 10, flexDirection: "row" }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("Account Creation: How do I create an account?")}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("Password Reset: What should I do if I forget my password?")}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("App Features: How do I use specific features of the app?")}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("Technical Issues: What should I do if I encounter a bug or error?")}
						</Text>
					</View>

				</View>
				<View style={{ marginTop: 15 }}>
					<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
					{t("2. Contact Us")}
					</Text>
				</View>
				<View style={{ marginTop: 5 }}>
					<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
					{t("If you need further assistance, feel free to contact our support team:")}
					</Text>
				</View>
				<View style={{ marginTop: 8 }}>
					<View style={{ marginLeft: 10, flexDirection: "row" }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("Email Support: Send us an email at support@rossoffices.com and we will get back to you as soon as possible.")}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flexDirection: "row", marginTop: 5 }}>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
							-
						</Text>
						<Text style={{ fontSize: 12, fontWeight: "400", color: "#000000", marginLeft: 5 }}>
						{t("Phone Support: Call us at 806-934-2018. Our support team is available Monday to Friday, 9 AM to 5 PM EST.")}
						</Text>
					</View>
				</View>
				<View style={{ marginTop: 15 }}>
					<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
					{t("3. Live Chat")}
					</Text>
				</View>
				<View style={{ marginTop: 5 }}>
					<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
					{t("For immediate assistance, you can use our live chat feature within the app. Click on the chat icon in the bottom right corner to connect with a support representative.")}
					</Text>
				</View>
				
				<View style={{ marginTop: 15 }}>
					<Text style={{ fontSize: 15, fontWeight: "600", color: "#000000" }}>
					{t("4. Feedback")}
					</Text>
				</View>
				<View style={{ marginTop: 5 }}>
					<Text style={{ fontSize: 13, fontWeight: "400", color: "#000000" }}>
					{t("We value your feedback! If you have suggestions or comments about how we can improve our app or support services, please let us know. Your input helps us enhance your experience.")}
					</Text>
				</View>
				
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontSize: 13, fontWeight: "500", color: "#000000" }}>
					{t("Thank you for choosing Ross Offices! We are here to help you.")}
					</Text>
				</View>
			</ScrollView>
		</View>
		</View>
		
	);
};

export default HelpandSupport;
