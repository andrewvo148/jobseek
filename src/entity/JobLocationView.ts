import { ViewEntity, Connection, ViewColumn } from "typeorm";
import { Job } from "./Job";
import { Company } from "./Company";
import { District } from "./District";
import { JobLocation } from "./JobLocation";
import { Province } from "./Province";


@ViewEntity({
    expression: 
    (connection: Connection) => connection.createQueryBuilder()
        .select("jobLocation.id", "id")
        .addSelect("province.name", "provinceName")
        .addSelect("district.name", "districtName")
        .from(JobLocation, "jobLocation")
        .leftJoin(Province, "province", `"province"."id" = "jobLocation"."provinceId"`)
        .leftJoin(District, "district", `"district"."id" = "jobLocation"."districtId"`)
})
export class JobLocationView {
    
    @ViewColumn()
    id: number;

    @ViewColumn()
    provinceName: string;

    @ViewColumn()
    districtName: string;
}