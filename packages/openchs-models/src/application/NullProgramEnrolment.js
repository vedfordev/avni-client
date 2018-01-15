class NullProgramEnrolment {
    constructor(individual) {
        this.individual = individual;
        this.program = {uuid: null};
    }

    get isActive() {
        return true;
    }

    get observations() {
        return [];
    }

    get encounters() {
        return [];
    }

    get uuid() {
        return null;
    }
}

export default NullProgramEnrolment;