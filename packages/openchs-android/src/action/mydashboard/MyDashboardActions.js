import EntityService from "../../service/EntityService";
import {AddressLevel, Program, Individual} from "openchs-models";
import _ from 'lodash';
import IndividualService from "../../service/IndividualService";
import EncounterType from "../../../../openchs-models/src/EncounterType";

class MyDashboardActions {
    static getInitialState() {
        return {visits: {}, individuals: {data: []}};
    }


    static clone(state) {
        return {};
    }

    static onLoad(state, action, context) {
        const entityService = context.get(EntityService);
        const individualService = context.get(IndividualService);
        const allAddressLevels = entityService.getAll(AddressLevel.schema.name);
        const nameAndID = ({name, uuid}) => ({name, uuid});
        const results = {};
        const individualsWithScheduledVisits = _.groupBy(individualService.allScheduledVisitsIn(), 'addressUUID');
        const individualsWithOverdueVisits = _.groupBy(individualService.allOverdueVisitsIn(), 'addressUUID');
        const individualsWithCompletedVisits = _.groupBy(individualService.allCompletedVisitsIn(), 'addressUUID');
        const highRiskPatients = _.groupBy(individualService.allHighRiskPatients(), 'addressUUID');
        allAddressLevels.map((addressLevel) => {
            const address = nameAndID(addressLevel);
            let existingResultForAddress = {
                address: address,
                visits: {
                    scheduled: {count: 0, abnormal: false},
                    overdue: {count: 0, abnormal: false},
                    completedVisits: {count: 0, abnormal: false},
                    highRisk: {count: 0, abnormal: true}
                },
                ...results[addressLevel.uuid],
            };
            existingResultForAddress.visits.scheduled.count = _.get(individualsWithScheduledVisits, addressLevel.uuid, []).length;
            existingResultForAddress.visits.overdue.count = _.get(individualsWithOverdueVisits, addressLevel.uuid, []).length;
            existingResultForAddress.visits.completedVisits.count = _.get(individualsWithCompletedVisits, addressLevel.uuid, []).length;
            existingResultForAddress.visits.highRisk.count = _.get(highRiskPatients, addressLevel.uuid, []).length;
            results[addressLevel.uuid] = existingResultForAddress;
        });
        return {...state, visits: results};
    }

    static onListLoad(state, action, context) {
        const individualService = context.get(IndividualService);
        const methodMap = new Map([
            ["scheduled", individualService.allScheduledVisitsIn],
            ["overdue", individualService.allOverdueVisitsIn],
            ["completedVisits", individualService.allCompletedVisitsIn],
            ["highRisk", individualService.allHighRiskPatients]
        ]);
        const allIndividuals = methodMap.get(action.listType)(action.address)
            .map(({uuid}) => individualService.findByUUID(uuid));
        const individuals = [...state.individuals.data,
            ...allIndividuals];
        return {
            ...state,
            individuals: {
                data: individuals,
            }
        };
    }

    static resetList(state, action, context) {
        return {
            ...state,
            individuals: {
                data: [],
            }
        }
    }
}

const MyDashboardPrefix = "MyD";

const MyDashboardActionNames = {
    ON_LOAD: `${MyDashboardPrefix}.ON_LOAD`,
    ON_LIST_LOAD: `${MyDashboardPrefix}.ON_LIST_LOAD`,
    RESET_LIST: `${MyDashboardPrefix}.RESET_LIST`
};

const MyDashboardActionsMap = new Map([
    [MyDashboardActionNames.ON_LOAD, MyDashboardActions.onLoad],
    [MyDashboardActionNames.ON_LIST_LOAD, MyDashboardActions.onListLoad],
    [MyDashboardActionNames.RESET_LIST, MyDashboardActions.resetList],
]);

export {
    MyDashboardActions,
    MyDashboardActionsMap,
    MyDashboardActionNames,
    MyDashboardPrefix
};