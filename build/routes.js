"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("./controller/UserController");
var CompanyController_1 = require("./controller/CompanyController");
var AccountController_1 = require("./controller/AccountController");
var AuthController_1 = require("./controller/AuthController");
var ProvinceController_1 = require("./controller/ProvinceController");
var DistrictController_1 = require("./controller/DistrictController");
var JobController_1 = require("./controller/JobController");
var CandidateAppliedController_1 = require("./controller/CandidateAppliedController");
var ProfileController_1 = require("./controller/ProfileController");
var WardController_1 = require("./controller/WardController");
exports.Routes = [{
        method: "get",
        route: "/protected//users",
        controller: UserController_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/protected//users/:id",
        controller: UserController_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/protected/users",
        controller: UserController_1.UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/protected/users/:id",
        controller: UserController_1.UserController,
        action: "remove"
    },
    // company
    {
        method: "get",
        route: "/companies",
        controller: CompanyController_1.CompanyController,
        action: "all"
    },
    {
        method: "post",
        route: "/protected/companies",
        controller: CompanyController_1.CompanyController,
        action: "save"
    },
    /**
     * API Account
     *
     *  */
    {
        method: "post",
        route: "/account/register",
        controller: AccountController_1.AccountController,
        action: "register"
    },
    {
        method: "get",
        route: "/account/active",
        controller: AccountController_1.AccountController,
        action: "active"
    },
    {
        method: "post",
        route: "/account/signin",
        controller: AccountController_1.AccountController,
        action: "signin"
    },
    {
        method: "post",
        route: "/auth/google",
        controller: AuthController_1.AuthController,
        action: "auth"
    },
    /**
     * API Province
     *
     *  */
    {
        method: "get",
        route: "/provinces",
        controller: ProvinceController_1.ProvinceController,
        action: "all"
    },
    {
        method: "post",
        route: "/protected/provinces",
        controller: ProvinceController_1.ProvinceController,
        action: "save"
    },
    /**
     * API District
     *
     *  */ ,
    {
        method: "post",
        route: "/protected/districts",
        controller: DistrictController_1.DistrictController,
        action: "save"
    }
    /**
     * API Ward
     *
     *  */ ,
    {
        method: "post",
        route: "/protected/wards",
        controller: WardController_1.WardController,
        action: "save"
    }
    /**
     * API Job
     *
     *  */ ,
    {
        method: "get",
        route: "/jobs",
        controller: JobController_1.JobController,
        action: "all"
    },
    {
        method: "post",
        route: "/protected/jobs",
        controller: JobController_1.JobController,
        action: "save"
    },
    /**
     * API Candidate Applied.
     *
     *  */
    {
        method: "get",
        route: "/candidate-applied",
        controller: CandidateAppliedController_1.CandidateAppliedController,
        action: "get"
    },
    {
        method: "get",
        route: "/protected/candidate-applied",
        controller: CandidateAppliedController_1.CandidateAppliedController,
        action: "get"
    },
    {
        method: "get",
        route: "/protected/job-applied",
        controller: CandidateAppliedController_1.CandidateAppliedController,
        action: "jobApplied"
    },
    {
        method: "post",
        route: "/candidate-applied",
        controller: CandidateAppliedController_1.CandidateAppliedController,
        action: "save"
    },
    {
        method: "post",
        route: "/protected/candidate-applied",
        controller: CandidateAppliedController_1.CandidateAppliedController,
        action: "save"
    },
    /**
     * API Profile
     */
    {
        method: "get",
        route: "/protected/profiles",
        controller: ProfileController_1.ProfileController,
        action: "get"
    },
    {
        method: "post",
        route: "/protected/profiles",
        controller: ProfileController_1.ProfileController,
        action: "save"
    }
];
//# sourceMappingURL=routes.js.map