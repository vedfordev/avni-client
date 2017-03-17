import {View, StyleSheet} from "react-native";
import React, {Component} from "react";
import AbstractComponent from "../../framework/view/AbstractComponent";
import Path from "../../framework/routing/Path";
import ProgramFormComponent from './ProgramFormComponent';
import {Actions} from "../../action/prorgam/ProgramEnrolmentActions";
import ProgramEnrolment from "../../models/ProgramEnrolment";
import ProgramEnrolmentState from '../../action/prorgam/ProgramEnrolmentState';
import ObservationsHolder from "../../models/ObservationsHolder";

@Path('/ProgramEnrolmentView')
class ProgramEnrolmentView extends AbstractComponent {
    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    viewName() {
        return "ProgramEnrolmentView";
    }

    render() {
        console.log('ProgramEnrolmentView.render');
        const context = {
            usage: ProgramEnrolmentState.UsageKeys.Enrol,
            dateAction: Actions.ENROLMENT_DATE_TIME_CHANGED,
            dateKey: 'enrolmentDate',
            dateField: 'enrolmentDateTime',
            dateValidationKey: ProgramEnrolment.validationKeys.ENROLMENT_DATE
        };
        return <ProgramFormComponent enrolment={this.props.params.enrolment} context={context} observationHolder={new ObservationsHolder(this.props.params.enrolment.observations)}/>;
    }
}

export default ProgramEnrolmentView;