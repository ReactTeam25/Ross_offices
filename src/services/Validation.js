import moment from 'moment';
import { setselectlanguage } from '../redux/index';
import { useTranslation } from 'react-i18next';


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatenumber = (number) => {
    return number.match(
        /^\d{10}$/
    );
};
const DateChange = (date) => {
    return moment(date).format('LL');
};

const useFormValidation = () => {
    const { t } = useTranslation();
    const Validateformone = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.image) {
            errors.image = t("Please upload image");
        }if (!obj.mode) {
            errors.mode = t("Please select mode");
        }
        // if (!validateEmail(obj.email)) {
        //     errors.emailk = "Please enter phone.";
        // }
        if (!obj.services) {
            errors.services = t("Please enter services");
        }
        if (!obj.date) {
            errors.date = t("Please enter date");
        }
        if (!obj.signimage) {
            errors.signimage = t("Please enter sign image");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformtwo = (obj) => {
        const errors = {};
        if (!obj.surname) {
            errors.surname = t("Please enter surname");
        }
        if (!obj.firstname) {
            errors.firstname = t("Please enter first name");
        }
        if (!obj.fathername) {
            errors.fathername = t("Please enter father name");
        }
        if (!obj.mothername) {
            errors.mothername = t("Please enter mother name");
        }
        if (!obj.height) {
            errors.height = t("Please enter height");
        }
        if (!obj.civilstatus) {
            errors.civilstatus = t("Please enter civil status");
        }
        if (!obj.sexname) {
            errors.sexname = t("Please enter your gender");
        } if (!obj.eyecolorname) {
            errors.eyecolorname = t("Please enter eye color");
        } if (obj.skin.length < 1) {
            errors.skin = t("Please enter skin color");
        } if (obj.hair.length < 1) {
            errors.hair = t("Please enter hair color");
        } if (obj.immegration.length < 1) {
            errors.immegration = t("Please enter immegration classification when leaving cuba");
        } if (!obj.departuredate) {
            errors.departuredate = t("Please enter departure date");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformthree = (obj) => {
        const errors = {};
        if (!obj.country) {
            errors.country = t("Please enter country");
        }
        // if (!validateEmail(obj.email)) {
        //     errors.emailk = "Please enter phone.";
        // }
        if (!obj.province) {
            errors.province = t("Please enter province");
        }
        if (!obj.city) {
            errors.city = t("Please enter Municipality/City");
        }
        if (!obj.dob) {
            errors.dob = t("Please enter date of birth");
        }


        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformfour = (obj) => {
        const errors = {};
        if (!obj.address) {
            errors.address = t("Please enter address");
        }
        if (!obj.postalcode) {
            errors.postalcode = t("Please enter Postal code");
        }
        if (!obj.province) {
            errors.province = t("Please enter province");
        }
        if (!obj.country) {
            errors.country = t("Please enter country");
        }
        if (!validatenumber(obj.phone)) {
            errors.phone = t("Please enter phone");
        }
        if (!obj.fax) {
            errors.fax = t("Please enter fax");
        }
        if (!validateEmail(obj.email)) {
            errors.email = t("Please enter email");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformfive = (obj) => {
        const errors = {};
        if (!obj.workname) {
            errors.workname = t("Please enter work name");
        }
        if (!obj.profession) {
            errors.profession = t("Please enter profession");
        }
        if (!obj.occupation) {
            errors.occupation = t("Please enter Occupation");
        }
        if (!obj.address) {
            errors.address = t("Please enter address");
        }
        if (!obj.postalcode) {
            errors.postalcode = t("Please enter Postal code");
        }
        if (!obj.province) {
            errors.province = t("Please enter province");
        }
        if (!obj.country) {
            errors.country = t("Please enter country");
        }
        if (!validatenumber(obj.phone)) {
            errors.phone = t("Please enter phone");
        }
        if (!obj.fax) {
            errors.fax = t("Please enter fax");
        }
        if (!validateEmail(obj.email)) {
            errors.email = t("Please enter email");
        }
        if (!obj.educationlevel) {
            errors.educationlevel = "Please enter education level";
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformsix = (obj) => {
        const errors = {};
        if (!obj.name_num) {
            errors.name_num = t("Please enter this field");
        }
        if (!obj.name_add) {
            errors.name_add = t("Please enter this field");
        }
        if (!obj.add_one) {
            errors.add_one = t("Please enter address 1");
        }
        if (!obj.from_one) {
            errors.from_one = t("Please enter from");
        }
        if (!obj.until_one) {
            errors.until_one = t("Please enter Until");
        }
        if (!obj.add_two) {
            errors.add_two = t("Please enter address 2");
        }
        if (!obj.from_two) {
            errors.from_two = t("Please enter from");
        }
        if (!obj.until_two) {
            errors.until_two = t("Please enter Until");
        }
        if (!obj.maidensurname) {
            errors.maidensurname = t("Please enter maiden surname");
        }
        if (!obj.othername) {
            errors.othername = t("Please enter other name");
        }
        if (!obj.residencenum) {
            errors.residencenum = t("Please enter residence number");
        }
        if (!obj.foreignnum) {
            errors.foreignnum = t("Please enter foreign passport");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateformseven = (obj) => {
        const errors = {};
        if (!obj.pass_num) {
            errors.pass_num = t("Please enter number");
        }
        if (!obj.ex_date) {
            errors.ex_date = t("Please enter expedition date");
        }
        if (!obj.place) {
            errors.place = t("Please enter place");
        }
        if (!obj.birth_took) {
            errors.birth_took = t("Please enter this field");
        }
        if (!obj.birth_invoice) {
            errors.birth_invoice = t("Please enter this field");
        }
        if (!obj.birth_civil) {
            errors.birth_civil = t("Please enter this field");
        }
        if (!obj.consular_num) {
            errors.consular_num = t("Please enter this field");
        }
        if (!obj.consular_date) {
            errors.consular_date = t("Please enter this field");
        }
        if (!obj.consular_tariff) {
            errors.consular_tariff = t("Please enter this field");
        }
        if (!obj.consular_assessment) {
            errors.consular_assessment = t("Please enter this field");
        }
        if (!obj.consular_sign) {
            errors.consular_sign = t("Please upload image");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };

    }
    const Validateaddvaccineform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.vaccinename) {
            errors.vaccinename = t("Please enter vaccine name");
        }
        if (!obj.date) {
            errors.date = t("Please enter date of birth");
        }
        if (!obj.Expirationdate) {
            errors.Expirationdate = t("Please enter expiration date");
        } if (!obj.Notes) {
            errors.Notes = t("Please enter note");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const ValidateaddTravelform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.City) {
            errors.City = t("Please enter city");
        }
        if (!obj.date) {
            errors.date = t("Please enter date");
        }
        if (!obj.Country) {
            errors.Country = t("Please enter country");
        } if (!obj.Purpose) {
            errors.Purpose = t("Please enter purpose");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const Validateaddinsuranceform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.Provider) {
            errors.Provider = t("Please enter provider");
        }
        if (!obj.PolicyNumber) {
            errors.PolicyNumber = t("Please enter policy number");
        }
        if (!obj.Coverage) {
            errors.Coverage = t("Please enter coverage");
        } if (!obj.EmergencyContactNumber) {
            errors.EmergencyContactNumber = t("Please enter emergency contact number");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const Validateimmigrationform = (obj) => {
        const errors = {};
        if (!obj.mode) {
            errors.mode = t("Please select mode");
        }
        if (!obj.firstName) {
            errors.firstName = t("Please enter First name");
        }
        if (!obj.lastname) {
            errors.lastname = t("Please enter last name");
        }
        if (!obj.dateOfBirth) {
            errors.dateOfBirth = t("Please select date of birth");
        }
        if (!obj.birthcity) {
            errors.birthcity = t("Please enter place of birth");
        }
        if (!obj.country) {
            errors.country = t("Please enter country");
        } if (!obj.nationality) {
            errors.nationality = t("Please enter nationality");
        }
        if (!obj.gender) {
            errors.gender = t("Please select gender");
        } if (!obj.maritalStatus) {
            errors.maritalStatus = t("Please select merital status");
        }
        if (!obj.mailingAddress) {
            errors.mailingAddress = t("Please enter mailing address");
        }
        if (!obj.streetandNumber) {
            errors.streetandNumber = t("Please enter street and number");
        }
        if (!obj.apartmentorUnit) {
            errors.apartmentorUnit = t("Please enter Apartment or Unit");
        } if (!obj.city) {
            errors.city = t("Please enter city");
        }
        if (!obj.state) {
            errors.state = t("Please enter state");
        }
        if (!obj.zipCode) {
            errors.zipCode = t("Please enter Zip Code");
        }
        if (!obj.addreesslect) {
            errors.addreesslect = t("Please select address");
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const Validatetaxform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.mode) {
            errors.mode = t("Please select mode");
        }
        if (!obj.fullName) {
            errors.fullName = t("Please enter full name");
        }
        if (!validateEmail(obj.emailAddress)) {
            errors.emailAddress = t("Please enter email address");
        } if (!validatenumber(obj.phonenumber)) {
            errors.phonenumber = t("Please enter phone number");
        }
        if (!obj.preferredAppointmentDate) {
            errors.preferredAppointmentDate = t("Please select Preferred Appointment Date");
        }
        if (!obj.preferredAppointmentTime) {
            errors.preferredAppointmentTime = t("Please select Preferred Appointment Time");
        }
        if (!obj.typeofTaxDeclaration) {
            errors.typeofTaxDeclaration = t("Please select type of tax declaration");
        } if (!obj.additionalNotesorDocuments) {
            errors.additionalNotesorDocuments = t("Please enter Additional Notes or Documents");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const Validateloanform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.mode) {
            errors.mode = t("Please select mode");
        }
        if (!obj.fullName) {
            errors.fullName = t("Please enter full name");
        }
        if (!validateEmail(obj.emailAddress)) {
            errors.emailAddress = t("Please enter email address");
        } if (!validatenumber(obj.phonenumber)) {
            errors.phonenumber = t("Please enter phone number");
        }
        if (!obj.preferredAppointmentDate) {
            errors.preferredAppointmentDate = t("Please select Preferred Appointment Date");
        }
        if (!obj.preferredAppointmentTime) {
            errors.preferredAppointmentTime = t("Please select Preferred Appointment Time");
        }
        if (!obj.loanAmount) {
            errors.loanAmount = t("Please enter loan amount");
        } if (!obj.loanPurpose) {
            errors.loanPurpose = t("Please enter loan purpose");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    const Validatetripsform = (obj) => {
        const errors = {};
        console.log('obj----------', obj.services);
        if (!obj.mode) {
            errors.mode = t("Please select mode");
        }
        if (!obj.firstName) {
            errors.firstName = t("Please enter first name");
        }
        if (!obj.lastName) {
            errors.lastName = t("Please enter last name");
        }
        if (!validateEmail(obj.email)) {
            errors.email = t("Please enter email address");
        } if (!validatenumber(obj.phonenumber)) {
            errors.phonenumber = t("Please enter phone number");
        }
        if (!obj.totalNumberofAdults) {
            errors.totalNumberofAdults = t("Please enter total number of adults");
        }
        if (!obj.totalNumberofChildren) {
            errors.totalNumberofChildren = t("Please enter total number of children");
        }
        if (!obj.startLocation) {
            errors.startLocation = t("Please enter start location");
        } if (!obj.destination) {
            errors.destination = t("Please enter destination");
        }
        if (!obj.traveldate) {
            errors.traveldate = t("Please select travel date");
        }
        if (!obj.desiredTripAmount) {
            errors.desiredTripAmount = t("Please enter desired trip amount");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    return{
        Validateformone,
        Validateformtwo,
        Validateformthree,
        Validateformfour,
        Validateformfive,
        Validateformsix,
        Validateformseven,
        Validateaddvaccineform,
        ValidateaddTravelform,
        Validateaddinsuranceform,
        Validateimmigrationform,
        Validatetaxform,
        Validateloanform,
        Validatetripsform
    }

}
export default useFormValidation;



