import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms'
@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidCreditCard': 'invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidDateFormat': 'Invalid date format',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Value must not be less than ${validatorValue.requiredLength}`,
            'invalidPreferredDate': `Preferred Inspection Date should not be later than Preferred Completion Date`,
            'pastPreferredDate': 'Preferred Inspection Date should not be later than the Current Date',
            'invalidRequestFrom': 'Request Date From should not be later than Request Date to',
            'invalidContactNumber': 'Contact Number must only contain numeric characters',
            'invalidAppraisedValue': 'Appraised Value From should not be greater than Appraised Value To',
            'invalidSubmissionFrom': 'Submission From should not be later than Submission To',
            'invalidEconomicLife': 'Economic Life must be greater than 0.',
            'invalidWeight': 'Weight (%) must be lesser than or equal to 100.00.',
            'invalidPercentage': '% of Completion must be lesser than or equal to 100.00.'

        };

        return config[validatorName];
    }

    public requiredValidator(control){
       
       if (control.value)
       return null;
       else
       return { 'required': true };
    }


    public dateFormatValidator(control){
        if(control.value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)){
            return null;
        }
        else{
            return { 'invalidDateFormat': true };
        }
    }
    public creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    public emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    public passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    checkPreferredDate(group: FormGroup) {

        let preferredInspectionDate = new Date(group.controls['prefInsDate'].value);
        let preferredCompletionDate = new Date(group.controls['prefCompDate'].value);
        if (preferredInspectionDate >= preferredCompletionDate) {
            if(!group.controls['prefInsDate'].hasError('invalidDateFormat') || group.controls['prefCompDate'].hasError('invalidDateFormat') )
            return { 'invalidPreferredDate': true };
        }
        else {
            return null;
        }
    }

    checkRequestDate(group: FormGroup) {
        let requestDateFrom = new Date(group.controls['requestFrom'].value);
        let requestDateTo = new Date(group.controls['requestTo'].value);
        if (requestDateFrom >= requestDateTo) {
            return { 'invalidRequestFrom': true };
        }
        else {
            return null;
        }
    }

    checkPastPreferredDate(group: FormGroup) {
        let preferredInspectionDate = new Date(group.controls['prefInsDate'].value);
        let currentDate = new Date()
        if (preferredInspectionDate > currentDate) {
            return { 'pastPreferredDate': true }
        } else {
            return null;
        }
    }

    checkSubmissionDate(group: FormGroup) {
        let submissionFrom = new Date(group.controls['submissionFrom'].value);
        let submissionTo = new Date(group.controls['submissionTo'].value);
        if (submissionFrom >= submissionTo) {
            group.controls['submissionFrom'].setErrors({ 'invalidSubmissionFrom': true })
            return { 'invalidSubmissionFrom': true }
        } else {
            group.controls['submissionFrom'].setErrors(null);
            return null;
        }
    }

    checkContactField(control) {
        if (control.value.match(('^[\+0-9()]+$')) || control.value === '') {
            return null;
        } else {
            return { 'invalidContactNumber': true }
        }
    }


    checkAppraisedValue(group: FormGroup) {
        let appraisedValueFrom = parseInt(group.controls['appraisedValueFrom'].value);
        let appraisedValueTo = parseInt(group.controls['appraisedValueTo'].value);

        if (appraisedValueFrom > appraisedValueTo) {
            group.controls['appraisedValueFrom'].setErrors({ 'invalidAppraisedValue': true });
            return { 'invalidAppraisedValue': true }
        } else {
            group.controls['appraisedValueFrom'].setErrors(null);
            return null;
        }
    }

    checkEconomicLife(control) {
        if (parseInt(control.value) <= 0) {
            return { 'invalidEconomicLife': true }
        }
        else {
            return null;
        }

    }

    checkWeight(control) {
        if (parseInt(control.value) > 100) {
            return { 'invalidWeight': true }
        } else {
            return null;
        }
    }

    checkPercentage(control) {
        if (parseInt(control.value) > 100) {
            return { 'invalidPercentage': true }
        } else {
            return null;
        }
    }
    
    



}
