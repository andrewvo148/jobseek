import {UserController} from "./controller/UserController";
import { CompanyController } from "./controller/CompanyController";
import { AccountController } from "./controller/AccountController";
import { AuthController } from "./controller/AuthController";
import { ProvinceController } from "./controller/ProvinceController";
import { DistrictController } from "./controller/DistrictController";
import { JobController } from "./controller/JobController";
import { CandidateAppliedController } from "./controller/CandidateAppliedController";
import { WardController } from "./controller/WardController";

export const Routes = [{
    method: "get",
    route: "/protected//users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/protected//users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/protected/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/protected/users/:id",
    controller: UserController,
    action: "remove"
},
// company
{
    method: "get",
    route: "/api/companies/:slug",
    controller: CompanyController,
    action: "getBySlug"
},
{
    method: "get",
    route: "/companies",
    controller: CompanyController,
    action: "all"
},
{
    method: "post",
    route: "/protected/companies",
    controller: CompanyController,
    action: "save"
},

/**
 * API Account
 * 
 *  */
{
    method: "post",
    route: "/account/register",
    controller: AccountController,
    action: "register"
},
{
    method: "get",
    route: "/account/active",
    controller: AccountController,
    action: "active"
},
{
    method: "post",
    route: "/account/signin",
    controller: AccountController,
    action: "signin"
},
{
    method: "post",
    route: "/auth/google",
    controller: AuthController,
    action: "auth"
},
{
    method: "post",
    route: "/api/auth/login",
    controller: AuthController,
    action: "login"
},
{
    method: "post",
    route: "/api/auth/register",
    controller: AuthController,
    action: "register"
},

/**
 * API Province
 * 
 *  */
 {
     method: "get",
     route: "/provinces",
     controller: ProvinceController,
     action: "all"
 },
 {
    method: "post",
    route: "/protected/provinces",
    controller: ProvinceController,
    action: "save"
},
/**
 * API District
 * 
 *  */,
{
    method: "post",
    route: "/protected/districts",
    controller: DistrictController,
    action: "save"
}

/**
 * API Ward
 * 
 *  */,
 {
    method: "post",
    route: "/protected/wards",
    controller: WardController,
    action: "save"
}


/**
 * API Job
 * 
 *  */,
 {
    method: "get",
    route: "/api/jobs",
    controller: JobController,
    action: "search"
},
    {
        method: "get",
        route: "/jobs",
        controller: JobController,
        action: "all"
    },

 {
    method: "post",
    route: "/api/protected/jobs",
    controller: JobController,
    action: "save"
},

/**
 * API Candidate Applied.
 * 
 *  */
{
    method: "get",
    route: "/candidate-applied",
    controller: CandidateAppliedController,
    action: "get"
},
{
    method: "get",
    route: "/protected/candidate-applied",
    controller: CandidateAppliedController,
    action: "get"
},

{
    method: "get",
    route: "/protected/job-applied",
    controller: CandidateAppliedController,
    action: "jobApplied"
},
 {
    method: "post",
    route: "/api/candidate-applied",
    controller: CandidateAppliedController,
    action: "save"
},
{
    method: "post",
    route: "/protected/candidate-applied",
    controller: CandidateAppliedController,
    action: "save"
},

/**
 * API Profile
 */
    // {
    //     method: "get",
    //     route: "/protected/profiles",
    //     controller: ProfileController,
    //     action: "get"
    // },
    // {
    //     method: "post",
    //     route: "/protected/profiles",
    //     controller: ProfileController,
    //     action: "save"
    // }
];
